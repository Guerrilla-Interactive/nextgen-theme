# Settings: Adding & Removing Modules

This guide focuses specifically on how to add or remove setting modules in the Sanity settings system.

## 📂 Settings System Structure

```
settings/
├── [module]-settings/          // Individual settings module folders
│   ├── [module]-settings.schema.ts   // Data structure
│   └── [module]-settings.query.ts    // Data fetching
│
├── all-settings-document-schemas.ts  // 1️⃣ REGISTER SCHEMA
├── settings.query.ts                 // 2️⃣ REGISTER QUERY
└── settings.structure.ts             // 3️⃣ ADD TO UI
```

## ➕ Adding a New Settings Module

### 1. Create Module Files

```
settings/
└── new-module-settings/
    ├── new-module-settings.schema.ts    // Define structure
    └── new-module-settings.query.ts     // Define query
```

### 2. Connect Module to System (3 files to update)

1️⃣ **Register schema in `all-settings-document-schemas.ts`**
```typescript
// 1. Add import
import { newModuleSettingsSchema } from "./new-module-settings/new-module-settings.schema";

// 2. Add to collection
const settingsSchemas = {
  existingSchema1,
  existingSchema2,
  newModuleSettingsSchema, // 👈 Add here
};
```

2️⃣ **Register query in `settings.query.ts`**
```typescript
// 1. Add import
import { newModuleSettingsFields } from "./new-module-settings/new-module-settings.query";

// 2. Add to combined query
const settingsQuery = groq`{
  "existing1": *[_type == "existing1Settings"][0] { ${existing1SettingsFields} },
  "newModule": *[_type == "newModuleSettings"][0] { ${newModuleSettingsFields} }, // 👈 Add here
}`;
```

3️⃣ **Add to Sanity UI in `settings.structure.ts`**
```typescript
// 1. Add import (if not importing from all-settings-document-schemas.ts)
import { newModuleSettingsSchema } from "./new-module-settings/new-module-settings.schema";

// 2. Add to structure items
S.list()
  .title("Settings")
  .items([
    singletonListItem(S, existingSchema1),
    singletonListItem(S, newModuleSettingsSchema), // 👈 Add here
  ])
```

## ➖ Removing a Settings Module

### 1. Remove Module from System (3 files to update)

1️⃣ **Unregister from `all-settings-document-schemas.ts`**
```typescript
// 1. Remove import
// import { oldModuleSettingsSchema } from "./old-module-settings/old-module-settings.schema";

// 2. Remove from collection
const settingsSchemas = {
  existingSchema1,
  existingSchema2,
  // oldModuleSettingsSchema, 👈 Remove this
};
```

2️⃣ **Remove from `settings.query.ts`**
```typescript
// 1. Remove import
// import { oldModuleSettingsFields } from "./old-module-settings/old-module-settings.query";

// 2. Remove from combined query
const settingsQuery = groq`{
  "existing1": *[_type == "existing1Settings"][0] { ${existing1SettingsFields} },
  // "oldModule": *[_type == "oldModuleSettings"][0] { ${oldModuleSettingsFields} }, 👈 Remove this
}`;

// 3. Remove any standalone fetch functions
// export const fetchOldModule = async () => {...};
```

3️⃣ **Remove from `settings.structure.ts`**
```typescript
// 1. Remove import
// import { oldModuleSettingsSchema } from "./old-module-settings/old-module-settings.schema";

// 2. Remove from structure items
S.list()
  .title("Settings")
  .items([
    singletonListItem(S, existingSchema1),
    // singletonListItem(S, oldModuleSettingsSchema), 👈 Remove this
  ])
```

### 2. Delete Files

```
settings/
└── old-module-settings/ 👈 Delete this entire folder
```

### 3. Check Application Code

Search for any usage of the removed module in your application code:

```typescript
// Search for patterns like:
import { ... } from "@/sanity/desk-organized-sanity-utilities/settings/old-module-settings/...";
```

## 🔍 Reference: Module File Templates

### Schema Template (`[module]-settings.schema.ts`)

```typescript
import { YourIconHere } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const moduleSettingsSchema = defineType({
  name: "moduleSettings",  // Must be unique
  title: "Module Settings",
  type: "document",
  icon: YourIconHere,
  fields: [
    defineField({
      name: "fieldName",
      title: "Field Title",
      type: "string", // or other type
    }),
    // Add more fields as needed
  ],
  preview: {
    prepare() {
      return {
        title: "Module Settings",
      };
    },
  },
});
```

### Query Template (`[module]-settings.query.ts`)

```typescript
import { groq } from "next-sanity";

// Fragment for use in combined queries
export const moduleSettingsFields = groq`
  fieldName,
  otherField
  // Add fields as needed
`;

// Full query for standalone use
export const MODULE_SETTINGS_QUERY = groq`
  *[_type == "moduleSettings"][0] {
    ${moduleSettingsFields}
  }
`;
```