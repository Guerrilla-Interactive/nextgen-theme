// /sanity/schemas/command.ts
import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";
import CommandImporter from "@/sanity/desk-organized-sanity-utilities/components/command-importer.component";

/**
 * Reusable object types
 */

// A single "goal" entry (works even if your array is empty)
export const goal = defineType({
  name: "goal",
  title: "Goal",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "fileHints", title: "File Hints", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "howToTips", title: "How-To Tips", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});

// The inner "logic" object used inside an action
export const actionLogic = defineType({
  name: "actionLogic",
  title: "Action Logic",
  type: "object",
  fields: [
    defineField({
      name: "behaviour",
      title: "Behaviour",
      type: "string",
      options: {
        list: [
          { title: "addMarkerAboveTarget", value: "addMarkerAboveTarget" },
          { title: "addMarkerBelowTarget", value: "addMarkerBelowTarget" },
          { title: "replaceIfMissing", value: "replaceIfMissing" },
          { title: "replace", value: "replace" },
          { title: "append", value: "append" },
          { title: "prepend", value: "prepend" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "content", title: "Content", type: "text" }),
    defineField({ name: "mark", title: "Mark (Label)", type: "string" }),
    defineField({
      name: "occurrence",
      title: "Occurrence",
      type: "string",
      options: { list: ["first", "last", "all"] },
    }),
    defineField({ name: "target", title: "Target (match string / regex)", type: "text" }),
  ],
});

// An "action" item that can live on files or action files
export const commandAction = defineType({
  name: "commandAction",
  title: "Action",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "mark", title: "Mark (Display label)", type: "string" }),
    defineField({ name: "logic", title: "Logic", type: "actionLogic" }),
  ],
  preview: {
    select: { title: "title", mark: "mark", behaviour: "logic.behaviour" },
    prepare({ title, mark, behaviour }) {
      return {
        title: title || behaviour || "Action",
        subtitle: mark ? `Mark: ${mark}` : behaviour || "",
      };
    },
  },
});

// A recursive file/folder node for your tree
export const treeNode = defineType({
  name: "treeNode",
  title: "Tree Node",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string" }),
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "nodeType",
      title: "Node Type",
      type: "string",
      options: {
        list: [
          { title: "Folder", value: "folder" },
          { title: "File", value: "file" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "actionFile", title: "Action File?", type: "boolean", initialValue: false }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 20,
      description: "Optional file contents (leave empty for folders).",
    }),
    defineField({
      name: "actions",
      title: "Actions",
      type: "array",
      of: [{ type: "commandAction" }],
    }),
    // Recursive children
    defineField({
      name: "children",
      title: "Children",
      type: "array",
      of: [{ type: "treeNode" }],
    }),
  ],
  preview: {
    select: { name: "name", nodeType: "nodeType" },
    prepare({ name, nodeType }) {
      const prefix = nodeType === "folder" ? "📁" : "📄";
      return { title: `${prefix} ${name}`, subtitle: nodeType || "" };
    },
  },
});

// A top-level path grouping that holds a tree of nodes
export const filePathGroup = defineType({
  name: "filePathGroup",
  title: "File Path Group",
  type: "object",
  fields: [
    defineField({ name: "id", title: "Group ID", type: "string" }),
    defineField({
      name: "path",
      title: "Base Path",
      type: "string",
      description: "e.g. app/(main) or sanity/desk-organized-sanity-utilities",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nodes",
      title: "Nodes",
      type: "array",
      of: [{ type: "treeNode" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { path: "path" },
    prepare({ path }) {
      return { title: path || "File Path Group" };
    },
  },
});

// A variable definition; we store variables as an ARRAY with an explicit key ("name")
export const variableDefinition = defineType({
  name: "variableDefinition",
  title: "Variable Definition",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Variable Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g. RouteName, RouteNamePluralized",
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "priority", title: "Priority", type: "number" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "examples", title: "Examples", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { name: "name", title: "title" },
    prepare({ name, title }) {
      return { title: name, subtitle: title };
    },
  },
});

export const commandLogic = { goal, actionLogic, commandAction, treeNode, filePathGroup, variableDefinition } 

/**
 * DOCUMENT: command
 * Matches your required shape:
 * {
 *   _type: "command",
 *   title, slug, goals: [], ignoredPatterns: [],
 *   variables: [{ name, title, ... }...],
 *   filePaths: [{ path, nodes:[treeNode...] }...]
 * }
 */
export default defineType({
  name: "command-slug",
  title: "Command",
  type: "document",
  icon: FileText,
  groups: [
    { name: "content", title: "Content" },
    { name: "builder", title: "Builder" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "importer",
      title: "Paste & Import",
      type: "string",
      readOnly: true,
      description:
        "Click the button to paste from your clipboard, or paste JSON in the textarea and import.",
      components: { input: CommandImporter },
      group: "builder",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
    }),

    // Matches: "goals": []
    defineField({
      name: "goals",
      title: "Goals",
      type: "array",
      group: "builder",
      of: [{ type: "goal" }],
    }),

    // Matches: "ignoredPatterns": []
    defineField({
      name: "ignoredPatterns",
      title: "Ignored Patterns",
      type: "array",
      group: "builder",
      of: [{ type: "string" }],
    }),

    // Matches: "variables": { RouteName: {...}, RouteNamePluralized: {...} }
    // Represented in-studio as an ARRAY with explicit "name" for each variable.
    defineField({
      name: "variables",
      title: "Variables",
      type: "array",
      group: "builder",
      of: [{ type: "variableDefinition" }],
      options: { sortable: true },
    }),

    // Matches: "filePaths": [ { path, nodes:[{ name, nodeType, children:[] }...] } ... ]
    defineField({
      name: "filePaths",
      title: "File Paths",
      type: "array",
      group: "builder",
      of: [{ type: "filePathGroup" }],
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return {
        title: title || "Untitled Command",
        subtitle: slug ? `/${slug}` : "No slug",
      };
    },
  },
});
