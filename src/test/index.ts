import { convertData } from "../client/convertData";
import { data } from "./data";
import { schema } from "./schema";

console.log(convertData(schema as any, data));
