import { Block } from "payload";

export const AmpereExpo: Block = {
    slug: "ampereExpo",
    labels: {
        singular: "Ampere Expo",
        plural: "Ampere Expo Sections",
    },
    fields: [
        {
            name: "heading",
            type: "text",
            defaultValue: "Ampere Labs Expo",
            required: true,
        },
        {
            name: "expoCards",
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
                    name: "subtitle",
                    type: "text",
                    required: true,
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};