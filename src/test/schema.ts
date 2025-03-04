export const schema = [
    {
        "name": "test",
        "type": "array",
        "required": true,
        "fields": [
            {
                "name": "title",
                "type": "text",
            }
        ]
    },
    {
        "name": "isHighlighted",
        "type": "checkbox",
        "required": true,
    },
    {
        "name": "title",
        "type": "text",
        "required": true
    },
    {
        "name": "shortHeadline",
        "type": "text"
    },
    {
        "name": "image",
        "type": "group",
        "required": true,
        "fields": [
            {
                "name": "title",
                "type": "text",
                "required": true,
            },
            {
                "name": "description",
                "type": "text"
            }
        ]
    },
    {
        "name": "themenspecial",
        "type": "relationship",
        "relationTo": "themenspecials",
        "required": true,
    },
    {
        "name": "tags",
        "type": "relationship",
        "hasMany": true,
        "relationTo": "tags",
        "required": true,
    },
    {
        "name": "content",
        "type": "blocks",
        "required": true,
        "blocks": [
            {
                "slug": "keyfacts",
                "fields": [
                    {
                        "name": "facts",
                        "type": "array",
                        "required": true,
                        "fields": [
                            {
                                "name": "fact",
                                "type": "textarea",
                                "required": true
                            }
                        ]
                    },
                    {
                        "name": "blockName",
                        "type": "text",
                        "required": false
                    }
                ]
            },
        ],
    },
    {
        name: "select1",
        type: "select",
        required: true,
        hasMany: false,
        options: ["aaa", "bbb"],
    },
    {
        name: "select2",
        type: "select",
        required: true,
        hasMany: true,
        options: ["aaa", "bbb"],
    },
    {
        name: "select3",
        type: "select",
        required: true,
        hasMany: false,
        options: [{ value: "aaa" }, { value: "bbb" }],
    },
    {
        name: "select4",
        type: "select",
        required: true,
        hasMany: true,
        options: [{ value: "aaa" }, { value: "bbb" }],
    },
]
