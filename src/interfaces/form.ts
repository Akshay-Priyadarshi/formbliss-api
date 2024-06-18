import { IField } from "./form-field"

export interface IForm {
    _id: string
    name: string
    label: string
    fields: IField[]
    createdAt: Date
    updatedAt: Date
}
