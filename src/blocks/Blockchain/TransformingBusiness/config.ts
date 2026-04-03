import { Block } from "payload";

export const TransformingBusiness: Block = {
    slug: "transformingBusiness",
    labels: {
        singular: "Transforming Business Section",
        plural: "Transforming Business Sections",
    },
    fields: [
        // HEADER
        {
            name: "heading",
            type: "text",
            required: true,
            defaultValue: "Transforming business models with Web3",
        },
        {
            name: "subheading",
            type: "textarea",
            required: true,
            defaultValue:
                "Our blockchain-based solutions empower forward-thinking businesses to leverage decentralized technologies",
        },

        // STATS BAR
        {
            name: "ratingText",
            type: "text",
            defaultValue: "100,000 Success Project",
        },
        {
            name: "buttonLabel",
            type: "text",
            defaultValue: "Reach Out Now!",
        },
        {
            name: 'buttonLink',
            type: 'text',
        },

        // FEATURES GRID
        {
            name: "features",
            type: "array",
            minRows: 1,
            maxRows: 12,
            fields: [
                {
                    name: "title",
                    type: "text",
                    required: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    required: true,
                },

                // either image OR value
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: false,
                },
                {
                    name: "value",
                    type: "text",
                    required: false,
                },
            ],
        },
    ],
};