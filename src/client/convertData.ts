import { match } from "ts-pattern";
import type * as T from "../types";

export const convertData = (fields: T.FieldConfig[], data: any) => {
    return fields.reduce((result, field) => ({
        ...result,
        [field.name]: getValue(field, data),
    }), data);
};

const convertArrayField = (field: T.ArrayFieldConfig, values: any) => {
    const value = values[field.name];

    if (!field.required && !value) {
        return undefined;
    }

    if (!Array.isArray(value)) {
        return [];
    }

    return value.map(item => {
        return field.fields.reduce((result, subField) => ({
            ...result,
            [subField.name]: getValue(subField, item),
        }), {});
    });
};

const convertBlocksField = (field: T.BlocksFieldConfig, values: any) => {
    const value = values[field.name];

    if (!field.required && !value) {
        return undefined;
    }

    if (!Array.isArray(value)) {
        return [];
    }

    return value.map(block => {
        const blockConfig = getBlockConfig(field.blocks, block.blockType);

        if (!blockConfig) {
            return {};
        }

        return blockConfig.fields.reduce((result, subField) => ({
            ...result,
            [subField.name]: getValue(subField, block),
        }), { id: block.id, blockType: block.blockType });
    });
};

const convertGroupField = (field: T.GroupFieldConfig, values: any) => {
    const value = values[field.name];

    if (!field.required && !value) {
        return undefined;
    }

    return field.fields.reduce((result, subField) => ({
        ...result,
        [subField.name]: getValue(subField, value || {}),
    }), {});
};

const convertRadioField = (field: T.RadioFieldConfig, values: any) => {
    const value = values[field.name];

    // if (field.required && !value) {
    //   if (optionIsObject(field.options[0])) {
    //     return field.options[0].value;
    //   }

    //   return field.options[0];
    // }

    return value;
};

const convertRelationshipField = (field: T.RelationshipFieldConfig, values: any) => {
    const value = values[field.name];

    if (field.required && !value) {
        if (field.hasMany) {
            return [];
        }

        // TODO: get fallback, if depth === 0 ? string : object
        return "";
    }

    return value;
};

const convertSelectField = (field: T.SelectFieldConfig, values: any) => {
    const value = values[field.name];

    if (field.required && !value) {
        if (field.hasMany) {
            return [];
        }

        if (typeof field.options[0] === "string") {
            return field.options[0];
        }

        return field.options[0].value;
    }

    return value;
};

const convertUploadField = (field: T.UploadFieldConfig, values: any) => {
    const value = values[field.name];

    if (field.required && !value) {
        if (field.hasMany) {
            return [];
        }

        // TODO: get fallback, if depth === 0 ? string : object
        return "";
    }

    return value;
};

const convertRichTextField = (field: T.RichTextFieldConfig, values: any) => {
    const value = values[field.name];

    if (field.required && !value) {
        return { root: {} };

        // // lexical editor
        // if (field.editor.editorConfig.lexical) {
        //     return ({
        //         root: {},
        //     });
        // }

        // // slate editor
        // return [];
    }

    return value;
};

const convertSimpleField = (defaultValue: any) => (field: T.FieldConfig, values: any) => {
    const value = values[field.name];

    if (field.required) {
        return value ?? defaultValue;
    }

    return value;
};

const convertCheckboxField = convertSimpleField(false);
const convertNumberField = convertSimpleField(0);
const convertPointField = convertSimpleField([0, 0]);
const convertStringField = convertSimpleField("");

const getValue = (field: T.FieldConfig, values: any): any => {
    return match(field)
        .with({ type: "array" }, f => convertArrayField(f, values))
        .with({ type: "blocks" }, f => convertBlocksField(f, values))
        .with({ type: "checkbox" }, f => convertCheckboxField(f, values))
        .with({ type: "code" }, f => convertStringField(f, values))
        .with({ type: "date" }, f => convertStringField(f, values))
        .with({ type: "email" }, f => convertStringField(f, values))
        .with({ type: "group" }, f => convertGroupField(f, values))
        .with({ type: "json" }, f => convertStringField(f, values))
        .with({ type: "number" }, f => convertNumberField(f, values))
        .with({ type: "point" }, f => convertPointField(f, values))
        .with({ type: "radio" }, f => convertRadioField(f, values))
        .with({ type: "relationship" }, f => convertRelationshipField(f, values))
        .with({ type: "richText" }, f => convertRichTextField(f, values))
        .with({ type: "select" }, f => convertSelectField(f, values))
        .with({ type: "text" }, f => convertStringField(f, values))
        .with({ type: "textarea" }, f => convertStringField(f, values))
        .with({ type: "upload" }, f => convertUploadField(f, values))
        .exhaustive();
};

const getBlockConfig = (blockConfigs: T.BlockConfig[], blockType: string) => blockConfigs.find(b => b.slug === blockType);
