import mongoose, { Schema, model } from "mongoose"

export enum InputTypes {
    Button = "button",
    Checkbox = "checkbox",
    Color = "color",
    Date = "date",
    DatetimeLocal = "datetime-local",
    Email = "email",
    File = "file",
    Hidden = "hidden",
    Image = "image",
    Month = "month",
    Number = "number",
    Password = "password",
    Radio = "radio",
    Range = "range",
    Reset = "reset",
    Search = "search",
    Submit = "submit",
    Tel = "tel",
    Text = "text",
    Time = "time",
    Url = "url",
    Week = "week"
}

export enum DataTypes {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    OBJECT = "object",
    ARRAY = "array"
}

export interface IFieldOptions {
    required?: boolean
    arrayMin?: number
    arrayMax?: number
}

const FieldOptionsSchema = new Schema(
    {
        required: { type: Boolean, default: false },
        arrayMin: { type: Number, default: null },
        arrayMax: { type: Number, default: null }
    },
    { _id: false }
)

export interface IField {
    id: string
    name: string
    label: string
    inputType: string
    dataType: string
    fields: IField[]
    options: IFieldOptions
}

const FieldSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        label: { type: String, required: true },
        inputType: { type: String, required: true },
        dataType: { type: String, default: null },
        fields: [{ default: [] }],
        options: FieldOptionsSchema
    },
    { _id: false }
)

export interface IForm {
    id: string
    name: string
    label: string
    fields: IField[]
    createdAt: Date
    updatedAt: Date
}

const FormSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            default: () => new mongoose.Types.ObjectId()
        },
        name: { type: String, required: true },
        label: { type: String, required: true },
        fields: [FieldSchema],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { collection: "forms" }
)

FormSchema.pre("save", function (next) {
    this.updatedAt = new Date()
    next()
})

// 3. Create a Model.
export const Form = model<IForm>("Form", FormSchema)
