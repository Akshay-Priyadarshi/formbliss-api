import { Form } from "../models/form.model"
import { IForm } from "../interfaces/form"
import { BadRequestError } from "../errors/bad-request.error"
import { isValidObjectId } from "mongoose"

export class FormService {
    readForm = async (formId?: string): Promise<IForm | IForm[]> => {
        let formReadRes: IForm | IForm[]
        if (formId) {
            if (isValidObjectId(formId) === false) {
                throw new BadRequestError("Invalid form ID!")
            }
            const formReadResOrNull = await Form.findById(formId)
            if (formReadResOrNull === null) {
                throw new BadRequestError("Form not found!")
            }
            formReadRes = formReadResOrNull
        } else {
            formReadRes = await Form.find({})
        }
        return formReadRes
    }

    createForm = async (createFormDto: IForm): Promise<IForm> => {
        const formCreateRes = await Form.create(createFormDto)
        return formCreateRes
    }

    updateForm = async (
        formId: string,
        updateFormDto: IForm
    ): Promise<IForm | null> => {
        const formUpdateRes = await Form.findByIdAndUpdate(
            formId,
            updateFormDto,
            { new: true }
        )
        return formUpdateRes
    }

    deleteForm = async (formId: string): Promise<IForm | null> => {
        const formUpdateRes = await Form.findByIdAndDelete(formId)
        return formUpdateRes
    }
}
