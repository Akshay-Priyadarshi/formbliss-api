import { IField } from "./form-field"

export interface IForm {
    id: string
    name: string
    label: string
    fields: IField[]
    createdAt: Date
    updatedAt: Date
}
