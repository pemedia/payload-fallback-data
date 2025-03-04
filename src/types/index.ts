export type BaseFieldConfig = { name: string; required: boolean };

export type ArrayFieldConfig = BaseFieldConfig & { type: "array"; fields: FieldConfig[] };
export type BlocksFieldConfig = BaseFieldConfig & { type: "blocks"; blocks: any[] };
export type CheckboxFieldConfig = BaseFieldConfig & { type: "checkbox" };
export type CodeFieldConfig = BaseFieldConfig & { type: "code" };
export type DateFieldConfig = BaseFieldConfig & { type: "date" };
export type EmailFieldConfig = BaseFieldConfig & { type: "email" };
export type GroupFieldConfig = BaseFieldConfig & { type: "group"; fields: FieldConfig[] };
export type JSONFieldConfig = BaseFieldConfig & { type: "json" };
export type NumberFieldConfig = BaseFieldConfig & { type: "number"; hasMany: boolean };
export type PointFieldConfig = BaseFieldConfig & { type: "point" };
export type RadioFieldConfig = BaseFieldConfig & { type: "radio" };
export type RelationshipFieldConfig = BaseFieldConfig & { type: "relationship"; relationTo: string | string[]; hasMany: boolean };
export type RichTextFieldConfig = BaseFieldConfig & { type: "richText" };
export type SelectFieldConfig = BaseFieldConfig & { type: "select"; hasMany: boolean; options: (string | { value: string })[] };
export type TextareaFieldConfig = BaseFieldConfig & { type: "textarea" };
export type TextFieldConfig = BaseFieldConfig & { type: "text"; hasMany: boolean };
export type UploadFieldConfig = BaseFieldConfig & { type: "upload"; hasMany: boolean };

export type FieldConfig =
    | ArrayFieldConfig
    | BlocksFieldConfig
    | CheckboxFieldConfig
    | CodeFieldConfig
    | DateFieldConfig
    | EmailFieldConfig
    | GroupFieldConfig
    | JSONFieldConfig
    | NumberFieldConfig
    | PointFieldConfig
    | RadioFieldConfig
    | RelationshipFieldConfig
    | RichTextFieldConfig
    | SelectFieldConfig
    | TextareaFieldConfig
    | TextFieldConfig
    | UploadFieldConfig

export type BlockConfig = { slug: string; fields: FieldConfig[] };
