import BulkPresets from './palette_presets_bulk.json';
import PremiumPresets from './palette_presets_premium.json';

// combine both preset array into one
const combinedPresets = [...PremiumPresets, ...BulkPresets];

// remove duplicates
const uniquePresets = combinedPresets.filter((preset, index, self) =>
  index === self.findIndex((t) => t.id === preset.id)
);

export const palettePresets = uniquePresets;
