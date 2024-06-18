import mongoose, { Schema, model } from "mongoose"
import { IForm } from "../interfaces/form"


const FieldOptionsSchema = new Schema(
    {
        required: { type: Boolean, default: false },
        arrayMin: { type: Number, default: null },
        arrayMax: { type: Number, default: null }
    },
    { _id: false }
)



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
