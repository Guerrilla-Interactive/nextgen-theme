import { defineField, defineType } from "sanity";
import { Map } from "lucide-react";

export default defineType({
  name: "cover-map-block",
  type: "object",
  title: "Map Cover",
  description: "A cover section with Mapbox integration",
  icon: Map,
  fields: [
    defineField({
      name: "center",
      title: "Map Center",
      type: "geopoint",
      description: "Center of the map",
      initialValue: { lat: 40, lng: -74.5 },
    }),
    defineField({
      name: "zoom",
      title: "Zoom Level",
      type: "number",
      description: "Initial zoom level of the map",
      initialValue: 7.5,
    }),
    defineField({
      name: "height",
      title: "Height",
      type: "object",
      description: "Height of the map",
      fields: [
        // choice if px spesific or auto
        defineField({
          name: "type",
          title: "Type",
          type: "string",
          initialValue: "auto",
          options: {
            list: ["auto", "px"],
          },
        }),
        defineField({
          name: "height",
          title: "Height",
          type: "number",
          initialValue: 500,
          hidden: ({ parent }) => parent?.type === "auto",
        }),
      ],
    }),
    defineField({
      name: "animateIntro",
      title: "Animate Intro",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enabled",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "initialZoom",
          title: "Initial Zoom",
          type: "number",
          initialValue: 4.5,
        }),
        defineField({
          name: "initialPitch",
          title: "Initial Pitch",
          type: "number",
          initialValue: 120,
        }),
        defineField({
          name: "duration",
          title: "Duration",
          type: "number",
          initialValue: 3000,
        }),
      ],
    }),
    defineField({
      name: "bearingRotation",
      title: "Bearing Rotation",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enabled",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "speed",
          title: "Speed",
          type: "number",
          initialValue: 0.005,
        }),
        defineField({
          name: "introDelay",
          title: "Intro Delay",
          type: "number",
          initialValue: 0,
        }),
      ],
    }),
    defineField({
      name: "radiusAnimation",
      title: "Radius Animation",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enabled",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "duration",
          title: "Duration",
          type: "number",
          initialValue: 20000,
        }),
        defineField({
          name: "spawnInterval",
          title: "Spawn Interval",
          type: "number",
          initialValue: 8000,
        }),
        defineField({
          name: "radius",
          title: "Radius",
          type: "number",
          initialValue: 1,
        }),
        defineField({
          name: "opacity",
          title: "Opacity",
          type: "object",
          fields: [
            defineField({
              name: "startOpacity",
              title: "Start Opacity",
              type: "number",
              initialValue: 0.2,
            }),
            defineField({
              name: "endOpacity",
              title: "End Opacity",
              type: "number",
              initialValue: 0,
            }),
          ],
        }),
        defineField({
          name: "color",
          title: "Color",
          type: "string",
          initialValue: "#FFA500",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      center: 'center',
      zoom: 'zoom',
    },
    prepare({ center, zoom }) {
      return {
        title: "Map Cover",
        subtitle: center ? `Zoom level: ${zoom || 9}` : "No location selected",
        media: Map,
      };
    },
  },
});





// const {
//   center = { lat: 40, lng: -74.5 },
//   zoom = 7.5,
//   animateIntro = {
//     enabled: false,
//     initialZoom: zoom + 4.5,
//     initialPitch: 120,
//     duration: 3000,
//   },
//   bearingRotation = {
//     enabled: true,
//     speed: 0.005,
//     introDelay: animateIntro.enabled ? animateIntro.duration : 0,
//     },
//   radiusAnimation = {
//     enabled: true,
//     duration: 20000,
//     spawnInterval: 8000,
//     radius: 160,
//     opacity: {
//       startOpacity: 0.2,
//       endOpacity: 0,
//     },
//     color: "#FFA500",
//     introDelay: animateIntro.enabled ? animateIntro.duration : 0,
//   },  
// } = props;