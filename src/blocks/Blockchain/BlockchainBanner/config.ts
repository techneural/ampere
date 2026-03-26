import { Block } from "payload";

export const BlockchainBanner: Block = {
    slug: "blockchainBanner",
    labels: {
        singular: "Blockchain Banner",
        plural: "Blockchain Banners",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            defaultValue: "Mint the future with Ampere Labs",
        },
        {
            name: "subtitle",
            type: "textarea",
            required: true,
            defaultValue:
                "Our global collective of 300+ specialists has partnered with founders, brands, and studios to sustainable systems.",
        },
        {
            name: "buttonLabel",
            type: "text",
            defaultValue: "Unlock Solutions",
        },
        {
            name: "bannerImage",
            type: "upload",
            relationTo: "media", // make sure you have media collection
            required: true,
        },
    ],
};