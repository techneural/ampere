import { Block } from "payload";

export const WeBuild: Block = {
  slug: "weBuild",
  labels: {
    singular: "We Build Section",
    plural: "We Build Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue:
        "In this time we build trustless, decentralized ecosystems",
    },
    {
      name: "subheading",
      type: "textarea",
      required: true,
      defaultValue:
        "Our partnerships with industry-leading blockchain platforms, metaverse creators, and cutting-edge tools empower us to bring the most innovative Web3.",
    },
    {
      name: "buttonLabel",
      type: "text",
      defaultValue: "Get Powered Now",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    // STATS CARDS
    {
      name: "stats",
      type: "array",
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: "title",
          type: "text", // 10+ Years, 150+, etc
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};