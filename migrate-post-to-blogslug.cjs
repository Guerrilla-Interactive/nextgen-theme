const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: "jpem0qru",              // Replace with your project ID if needed.
  dataset: "production",              // Replace with your dataset.
  apiVersion: "2024-10-18",
  token: "skFCZEhAQ6VK5dY1wx3shVliaqn9djTjHEVfRNRfireS9MNH4NhbL1g4Feqyj2y2etZXkQgfX3VLbFEbfPJJ2rADqQ5PhAuAqYkU49LVBpBvbdxJGxbcSwyzS9gqzZLGoLFewVJarVRUsz8k3hrQwhYFvHHxELczXerdILfeNgHfvhYlVJAv",  // Your token
  useCdn: false,                      // Set to false to ensure fresh data
});

async function migratePostDocs() {
  // Query all documents of type "post"
  const query = '*[_type == "post"]';
  let posts;
  try {
    posts = await client.fetch(query);
  } catch (err) {
    console.error("Failed to fetch posts:", err.message);
    process.exit(1);
  }

  console.log(`Found ${posts.length} documents of type "post".`);

  for (const post of posts) {
    // Generate a new _id for the migrated document
    const newDocId = `blogSlug.${post._id}`;
    
    // Create a new document object with _type changed to "blog-slug" and new _id.
    const newDoc = { ...post, _id: newDocId, _type: "blog-slug" };

    try {
      // Create the new document.
      await client.create(newDoc);
      console.log(`Created new document ${newDocId} with type "blog-slug".`);

      // Optionally, delete the old document of type "post".  
      // Only run this once you have verified the new document is correct.
      await client.delete(post._id);
      console.log(`Deleted old document ${post._id} with type "post".`);

    } catch (err) {
      console.error(`Error processing document ${post._id}: ${err.message}`);
      // You may want to continue with the next document even if one fails.
    }
  }
}

migratePostDocs()
  .then(() => {
    console.log("Post migration completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  }); 