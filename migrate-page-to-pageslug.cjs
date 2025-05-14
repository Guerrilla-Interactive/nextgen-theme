const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: "jpem0qru",              // Replace with your project ID if needed.
  dataset: "production",              // Replace with your dataset.
  apiVersion: "2024-10-18",
  token: "skFCZEhAQ6VK5dY1wx3shVliaqn9djTjHEVfRNRfireS9MNH4NhbL1g4Feqyj2y2etZXkQgfX3VLbFEbfPJJ2rADqQ5PhAuAqYkU49LVBpBvbdxJGxbcSwyzS9gqzZLGoLFewVJarVRUsz8k3hrQwhYFvHHxELczXerdILfeNgHfvhYlVJAv",  // Your token
  useCdn: false,                      // Set to false to ensure fresh data
});

async function migratePageDocs() {
  // Query all documents of type "page"
  const query = '*[_type == "page"]';
  let pages;
  try {
    pages = await client.fetch(query);
  } catch (err) {
    console.error("Failed to fetch pages:", err.message);
    process.exit(1);
  }

  console.log(`Found ${pages.length} documents of type "page".`);

  for (const page of pages) {
    // Generate a new _id for the migrated document, e.g., prefix it with "pageSlug."
    const newDocId = `pageSlug.${page._id}`;
    
    // Create a new document object with _type changed to "page-slug" and updated _id.
    const newDoc = { ...page, _id: newDocId, _type: "page-slug" };

    try {
      // Create the new document.
      await client.create(newDoc);
      console.log(`Created new document ${newDocId} with type "page-slug".`);

      // Optionally, delete the old document of type "page".
      // Only run this once you have verified the new document is correct.
      await client.delete(page._id);
      console.log(`Deleted old document ${page._id} with type "page".`);
    } catch (err) {
      console.error(`Error processing document ${page._id}: ${err.message}`);
      // Optionally, continue with the next document even if one fails.
    }
  }
}

async function updatePageSlugDocs() {
  // Query all documents with type "page-slug"
  const query = '*[_type == "page-slug"]';
  let docs;
  try {
    docs = await client.fetch(query);
  } catch (err) {
    console.error("Failed to fetch page-slug documents:", err.message);
    process.exit(1);
  }

  console.log(`Found ${docs.length} documents of type "page-slug".`);

  for (const doc of docs) {
    // Remove _id and _type from the spread and then add them first
    const { _id, _type, ...rest } = doc;
    const newDoc = {
      _id,       // add _id as the first key
      _type,     // add _type right after
      ...rest,   // spread all other fields afterward
    };

    try {
      // Use createOrReplace to update the entire document with the new ordering.
      await client.createOrReplace(newDoc);
      console.log(`Updated document ${_id} with top-level _id and _type.`);
    } catch (err) {
      console.error(`Error updating document ${_id}: ${err.message}`);
    }
  }
}

migratePageDocs()
  .then(() => {
    console.log("Page migration completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });

updatePageSlugDocs()
  .then(() => {
    console.log("page-slug update completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Update failed:", error);
    process.exit(1);
  }); 