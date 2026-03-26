import { Block } from "payload";

export const Revolution: Block = {
    slug: "revolution",
    labels: {
        singular: "Revolution Section",
        plural: "Revolution Sections",
    },
    fields: [
        {
            name: "heading",
            type: "text",
            defaultValue: "Revolution in how brands connect",
            required: true,
        },
        {
            name: "subheading",
            type: "textarea",
            defaultValue:
                "We craft immersive experiences, tokenized ecosystems, and on-chain strategies that define the next digital era.",
            required: true,
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "cards",
            type: "array",
            minRows: 1,
            maxRows: 10,
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
            ],
        },
    ],
};