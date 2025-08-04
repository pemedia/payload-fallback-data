import type * as P from "payload";
import { match } from "ts-pattern";
import type * as T from "../types/index.js";

export const mapFields = (fields: P.FlattenedField[]) => {
    return fields.filter(filterField).map(mapField);
};

const filterField = (field: any) => field.name && field.type !== "ui" && field.defaultValue === undefined;

const mapArrayField = (field: P.FlattenedArrayField): T.ArrayFieldConfig => ({
    type: "array",
    name: field.name,
    fields: mapFields(field.flattenedFields),
    required: field.required || false,
});

const mapBlocksField = (field: P.FlattenedBlocksField): T.BlocksFieldConfig => ({
    type: "blocks",
    name: field.name,
    blocks: field.blocks.map(mapBlock),
    required: field.required || false,
});

const mapCheckboxField = (field: P.CheckboxField): T.CheckboxFieldConfig => ({
    type: "checkbox",
    name: field.name,
    required: field.required || false,
});

const mapCodeField = (field: P.CodeField): T.CodeFieldConfig => ({
    type: "code",
    name: field.name,
    required: field.required || false,
});

const mapDateField = (field: P.DateField): T.DateFieldConfig => ({
    type: "date",
    name: field.name,
    required: field.required || false,
});

const mapEmailField = (field: P.EmailField): T.EmailFieldConfig => ({
    type: "email",
    name: field.name,
    required: field.required || false,
});

const mapGroupField = (field: P.FlattenedGroupField): T.GroupFieldConfig => ({
    type: "group",
    name: field.name,
    required: false, // NOTE: can't be required
    fields: mapFields(field.flattenedFields),
});

const mapJSONField = (field: P.JSONField): T.JSONFieldConfig => ({
    type: "json",
    name: field.name,
    required: field.required || false,
});

const mapNumberField = (field: P.NumberField): T.NumberFieldConfig => ({
    type: "number",
    name: field.name,
    required: field.required || false,
    hasMany: field.hasMany || false,
});

const mapPointField = (field: P.PointField): T.PointFieldConfig => ({
    type: "point",
    name: field.name,
    required: field.required || false,
});

const mapRadioField = (field: P.RadioField): T.RadioFieldConfig => ({
    type: "radio",
    name: field.name,
    required: field.required || false,
});

const mapRelationshipField = (field: P.RelationshipField): T.RelationshipFieldConfig => ({
    type: "relationship",
    name: field.name,
    required: field.required || false,
    hasMany: field.hasMany || false,
    relationTo: field.relationTo,
});

const mapRichTextField = (field: P.RichTextField): T.RichTextFieldConfig => ({
    type: "richText",
    name: field.name,
    required: field.required || false,
});

const mapSelectField = (field: P.SelectField): T.SelectFieldConfig => ({
    type: "select",
    name: field.name,
    required: field.required || false,
    hasMany: field.hasMany || false,
    options: field.options,
});

const mapTextField = (field: P.TextField): T.TextFieldConfig => ({
    type: "text",
    name: field.name,
    required: field.required || false,
    hasMany: field.hasMany || false,
});

const mapTextareaField = (field: P.TextareaField): T.TextareaFieldConfig => ({
    type: "textarea",
    name: field.name,
    required: field.required || false,
});

const mapUploadField = (field: P.UploadField): T.UploadFieldConfig => ({
    type: "upload",
    name: field.name,
    required: field.required || false,
    hasMany: field.hasMany || false,
});

const mapField = (field: P.FlattenedField): T.FieldConfig => {
    return match(field)
        .with({ type: "array" }, mapArrayField)
        .with({ type: "blocks" }, mapBlocksField)
        .with({ type: "checkbox" }, mapCheckboxField)
        .with({ type: "code" }, mapCodeField)
        .with({ type: "date" }, mapDateField)
        .with({ type: "email" }, mapEmailField)
        .with({ type: "group" }, mapGroupField)
        .with({ type: "json" }, mapJSONField)
        .with({ type: "number" }, mapNumberField)
        .with({ type: "point" }, mapPointField)
        .with({ type: "radio" }, mapRadioField)
        .with({ type: "relationship" }, mapRelationshipField)
        .with({ type: "richText" }, mapRichTextField)
        .with({ type: "select" }, mapSelectField)
        .with({ type: "text" }, mapTextField)
        .with({ type: "textarea" }, mapTextareaField)
        .with({ type: "upload" }, mapUploadField)
        .with({ type: "join" }, () => { throw new Error("not implemented"); })
        .with({ type: "tab" }, () => { throw new Error("not implemented"); })
        .exhaustive();
};

const mapBlock = (block: P.FlattenedBlock): T.BlockConfig => ({
    slug: block.slug,
    fields: mapFields(block.flattenedFields),
});
