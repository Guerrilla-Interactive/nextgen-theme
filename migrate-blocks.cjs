// migrate-schemas.js
// Ensure you have installed the @sanity/client package:
//   npm install @sanity/client








const { createClient } = require('@sanity/client');

const client = createClient ({
    projectId: "jpem0qru",
    dataset: "production",
    apiVersion: "2024-10-18",
    token: "skFCZEhAQ6VK5dY1wx3shVliaqn9djTjHEVfRNRfireS9MNH4NhbL1g4Feqyj2y2etZXkQgfX3VLbFEbfPJJ2rADqQ5PhAuAqYkU49LVBpBvbdxJGxbcSwyzS9gqzZLGoLFewVJarVRUsz8k3hrQwhYFvHHxELczXerdILfeNgHfvhYlVJAv",
    useCdn: false,
});


const typeMapping = {
  "all-posts": "all-posts-block",
  "carousel-1": "carousel-1-block",
  "carousel-2": "carousel-2-block",
  "cta-1": "cta-1-block",
  "faqs": "faqs-block",
  "form-newsletter": "form-newsletter-block",
  "grid-card": "grid-card-block",
  "grid-post": "grid-post-block",
  "grid-row": "grid-row-block",         // if applicable
  "pricing-card": "pricing-card-block",
  "hero-1": "hero-1-block",
  "hero-2": "hero-2-block",
  "logo-cloud-1": "logo-cloud-1-block",
  "section-header": "section-header-block",
  "split-row": "split-row-block",
  "split-content": "split-content-block",
  "split-cards-list": "split-cards-list-block",
  "split-image": "split-image-block",
  "split-info-list": "split-info-list-block",
  "split-card-block": "split-cards-item-block",
  "split-info-item": "split-info-item-block",
  "timeline-1": "timeline-1-block",
  "timeline-row": "timeline-row-block",
  
};

// Change this query to target your parent documents that hold blocks.
// For example, if your pages are stored as documents of type "page":
const parentQuery = '*[_type in ["page","post"] && defined(blocks)]{ _id, blocks }';

/**
 * Recursively converts an object if it has a _type that matches the typeMapping.
 *
 * If the object is an array, it recursively processes each element.
 */
function recursiveConvert(item) {
  if (Array.isArray(item)) {
    return item.map(recursiveConvert);
  } else if (item && typeof item === "object") {
    // If the object has a _type field, check if conversion is needed.
    let newItem = { ...item };
    if (typeof newItem._type === "string" && typeMapping[newItem._type]) {
      newItem._type = typeMapping[newItem._type];
    }
    // Recursively process all keys of the object.
    Object.keys(newItem).forEach((key) => {
      newItem[key] = recursiveConvert(newItem[key]);
    });
    return newItem;
  }
  // For primitives, just return the value.
  return item;
}

async function migrateBlocks() {
  const docs = await client.fetch(parentQuery);
  console.log(`Found ${docs.length} documents with a "blocks" field.`);
  
  for (const doc of docs) {
    const oldBlocks = doc.blocks || [];
    // Apply the recursive conversion.
    const newBlocks = recursiveConvert(oldBlocks);
    
    // Compare newBlocks to oldBlocks to decide whether to patch the document.
    if (JSON.stringify(oldBlocks) !== JSON.stringify(newBlocks)) {
      try {
        await client.patch(doc._id)
          .set({ blocks: newBlocks })
          .commit({ autoGenerateArrayKeys: true });
        console.log(`Updated document ${doc._id}`);
      } catch (err) {
        console.error(`Failed updating document ${doc._id}: ${err.message}`);
      }
    } else {
      console.log(`No changes needed for document ${doc._id}`);
    }
  }
}

migrateBlocks()
  .then(() => {
    console.log("Nested block migration completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });