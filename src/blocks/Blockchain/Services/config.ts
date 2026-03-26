import { Block } from "payload";

export const Services: Block = {
    slug: "services",
    labels: {
        singular: "Services Sections",
        plural: "Services Sections",
    },
    fields: [
        {
            name: "heading",
            type: "text",
            required: true,
            defaultValue: "Real stories, real impact",
        },

        {
            name: "testimonials",
            type: "array",
            minRows: 1,
            maxRows: 12,
            fields: [
                {
                    name: "quote",
                    type: "textarea",
                    required: true,
                },
                {
                    name: "icon",
                    type: "upload",
                    relationTo: "media",
                    required: false, // optional (since same icon usually)
                },
            ],
        },
    ],
};