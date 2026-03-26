import { Block } from "payload";

export const DecentralizingFinance: Block = {
    slug: "decentralizingFinance",
    labels: {
        singular: "Decentralizing Finance",
        plural: "Decentralizing Finance Sections",
    },
    fields: [
        {
            name: "heading",
            type: "text",
            required: true,
            defaultValue:
                "Decentralizing finance with Ampere's DeFi expertise",
        },
        {
            name: "description",
            type: "textarea",
            required: true,
            defaultValue:
                "Ampere Labs ensures that your DeFi platform is secure, user-friendly, and scalable. We help you unlock new business models and revenue streams.",
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true,
        },

    ],
};