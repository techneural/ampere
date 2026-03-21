import type { Block } from "payload";

export const PatentSection: Block = {
    slug: "patentCards",
    labels: {
        singular: "Patent Section",
        plural: "Patent Sections",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "type",
            type: "select",
            options: [
                { label: "Software", value: "software" },
                { label: "Hardware", value: "hardware" },
            ],
            required: true,
        },

        // IMAGES (swiper)
        {
            name: "images",
            type: "array",
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
        {
            name: "patentNumbers",
            type: "array",
            fields: [
                {
                    name: "number",
                    type: "text",
                },
            ],
        },

        // HIGHLIGHTS
        {
            name: "highlights",
            type: "array",
            fields: [
                {
                    name: "text",
                    type: "text",
                    required: true,
                },
                {
                    name: "variant",
                    type: "select",
                    options: [
                        { label: "Primary", value: "primary" },
                        { label: "Secondary", value: "secondary" },
                        { label: "Accent", value: "accent" },
                        { label: "Muted", value: "muted" },
                    ],
                    required: true,
                },
            ],
        },
    ],
};