// sanity/components/CommandImporter.tsx
import React, {useCallback, useState} from "react";
import {Button, Card, Stack, Text, TextArea, Flex} from "@sanity/ui";
import {useClient, useFormValue} from "sanity";

type CommandJson = {
  title?: string;
  slug?: { _type?: "slug"; current: string };
  excerpt?: string;
  goals?: any[];
  ignoredPatterns?: string[];
  variables?: Record<
    string,
    { title?: string; priority?: number; description?: string; examples?: string[] }
  >;
  filePaths?: any[];
};

function variablesObjectToArray(obj?: CommandJson["variables"]) {
  if (!obj) return [];
  return Object.entries(obj).map(([name, v]) => ({
    _type: "variableDefinition" as const,
    name,
    title: v?.title ?? "",
    priority: typeof v?.priority === "number" ? v?.priority : undefined,
    description: v?.description ?? "",
    examples: Array.isArray(v?.examples) ? v?.examples : [],
  }));
}

export default function CommandImporter() {
  const client = useClient({apiVersion: "2023-10-01"});
  // Entire draft document (including _id), via form value at root path
  const doc = useFormValue([]) as {_id?: string; _type?: string} | null;

  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const doImport = useCallback(
    async (jsonText: string) => {
      setErr(null);
      setMsg(null);
      if (!doc?._id) {
        setErr("No draft document id found.");
        return;
      }
      let data: CommandJson;
      try {
        data = JSON.parse(jsonText);
      } catch (e: any) {
        setErr(`Invalid JSON: ${e?.message ?? String(e)}`);
        return;
      }

      const patch: Record<string, any> = {};

      if (typeof data.title === "string") patch.title = data.title;
      if (typeof data.excerpt === "string") patch.excerpt = data.excerpt;

      if (data.slug?.current) {
        patch.slug = {_type: "slug", current: data.slug.current};
      }

      if (Array.isArray(data.goals)) patch.goals = data.goals;
      if (Array.isArray(data.ignoredPatterns)) patch.ignoredPatterns = data.ignoredPatterns;
      if (data.variables) patch.variables = variablesObjectToArray(data.variables);
      if (Array.isArray(data.filePaths)) patch.filePaths = data.filePaths;

      await client
        .patch(doc._id) // patches the *draft* when in the editor
        .set(patch)
        .commit();

      setMsg("Imported successfully ✔");
    },
    [client, doc]
  );

  const pasteFromClipboard = useCallback(async () => {
    try {
      setBusy(true);
      const clip = await navigator.clipboard.readText();
      setText(clip);
      await doImport(clip);
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  }, [doImport]);

  const importFromTextarea = useCallback(async () => {
    try {
      setBusy(true);
      await doImport(text);
    } finally {
      setBusy(false);
    }
  }, [doImport, text]);

  return (
    <Stack space={3}>
      <Card padding={3} radius={3} shadow={1}>
        <Text size={1}>
          Paste a full <code>command</code> JSON (like the example you shared). This will overwrite the
          document’s matching fields (title, slug, excerpt, goals, ignoredPatterns, variables, filePaths).
        </Text>
      </Card>

      <Flex gap={2}>
        <Button
          text={busy ? "Importing…" : "Paste & Import from Clipboard"}
          onClick={pasteFromClipboard}
          disabled={busy}
        />
        <Button
          mode="ghost"
          text="Import from Textarea"
          onClick={importFromTextarea}
          disabled={busy || !text.trim()}
        />
      </Flex>

      <TextArea
        rows={8}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder='Paste JSON here (optional). Or use "Paste & Import from Clipboard".'
      />

      {msg && (
        <Text >
          {msg}
        </Text>
      )}
      {err && (
        <Text>
          {err}
        </Text>
      )}
    </Stack>
  );
}
