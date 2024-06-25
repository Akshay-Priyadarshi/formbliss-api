import { Field, Form, Prisma } from "@prisma/client"
import { prismaClient } from "../clients/prisma.client"
import { BadRequestError } from "../errors/bad-request.error"

export class FormService {
    async create(
        formData: Form,
        nestedFields: (Field | string)[]
    ): Promise<Form> {
        return await prismaClient.form.create({
            data: {
                ...formData,
                fields: {
                    create: nestedFields.map(
                        (nestedField: string | Field, i) => {
                            if (typeof nestedField === "string") {
                                return {
                                    field: {
                                        connect: {
                                            id: nestedField
                                        }
                                    },
                                    order: i + 1
                                }
                            }
                            return {
                                field: {
                                    create: {
                                        ...nestedField
                                    }
                                },
                                order: i + 1
                            }
                        }
                    )
                }
            },
            include: {
                fields: { include: { field: true } }
            }
        })
    }

    async read(
        id?: string,
        filterDto: Prisma.FormWhereInput = {}
    ): Promise<Form[] | Form | null> {
        if (id) {
            const foundForm = await prismaClient.form.findUnique({
                where: { id },
                include: {
                    fields: { include: { field: true } }
                }
            })
            if (!foundForm) throw new BadRequestError("Field not found!")
            return foundForm
        } else {
            return await prismaClient.form.findMany({
                where: filterDto,
                include: {
                    fields: { include: { field: true } }
                }
            })
        }
    }

    async update(id: string, updateDto: Prisma.FormUpdateInput): Promise<Form> {
        return await prismaClient.form.update({
            where: { id },
            data: updateDto
        })
    }

    async delete(id: string): Promise<Form> {
        return await prismaClient.form.delete({
            where: { id }
        })
    }
}
