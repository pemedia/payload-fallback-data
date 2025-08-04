import { convertData } from "../client/convertData.js";
import { data } from "./data.js";
import { schema } from "./schema.js";

console.log(convertData(schema as any, data));
