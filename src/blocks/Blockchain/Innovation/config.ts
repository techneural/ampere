import { Block } from "payload";

export const Innovation: Block = {
  slug: "innovation",
  labels: {
    singular: "Innovation Section",
    plural: "Innovation Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Innovation without borders",
    },
    {
      name: "locations",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "location",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};