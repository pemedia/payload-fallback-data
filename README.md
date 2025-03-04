# payload-fallback-data

Want to show a (live) preview of some pages built with [payload cms](https://payloadcms.com)?<br/>
While relying on the generated types, the frontend can break easily, if it is coupled to required fields. :boom:<br/>
(s. https://payloadcms.com/docs/live-preview/client)

This library provides a fallback for every required unset field.

## Quick Start

### Server

Generate the schema for all collections which needs fallback data.<br/>
The easiest way is to provide custom endpoints:

```ts
import { PayloadRequest } from "payload";
import { mapFields } from "payload-fallback-data/server";

const endpoint = {
    method: "get",
    path: "/schema",
    handler: async (req: PayloadRequest) => {
        const fields = mapFields(req.payload.collections.posts.config.flattenedFields);

        return Response.json(fields);
    },
};
```

### Client

1. Get the schema for the collection (for example by using the custom endpoint from above):

```ts
import { FieldConfig } from "payload-fallback-data/types";

const schema: FieldConfig[] = await fetch(...)
```

2. Use the schema to convert the partial data:

```ts
import { convertData } from "payload-fallback-data/client";

// e.g. while using payload live preview
const { data } = useLivePreview(...);

const dataWithFallbacks = convertData(schema, data);
```

## Changelog

### v 1.0.0

- Initial release
