import { prismaClient } from "../clients/prisma.client"
import { DataTypes, Field, InputTypes, Prisma } from "@prisma/client"
import { BadRequestError } from "../errors/bad-request.error"

export class FieldService {
    async createField(
        field: Field,
        nestedFields?: (Field | string)[]
    ): Promise<Field> {
        const createdField = await prismaClient.field.create({
            data: {
                ...field,
                dataType: DataTypes[field.dataType],
                inputType: InputTypes[field.inputType],
                dataSubType: field.dataSubType
                    ? DataTypes[field.dataSubType]
                    : undefined,
                toFields: nestedFields
                    ? {
                          create: nestedFields.map(
                              (nestedField: Field | string, i: number) => {
                                  if (typeof nestedField === "string") {
                                      return {
                                          toField: {
                                              connect: { id: nestedField }
                                          },
                                          order: i + 1
                                      }
                                  }
                                  return {
                                      toField: {
                                          create: {
                                              ...nestedField,
                                              dataType:
                                                  DataTypes[field.dataType],
                                              inputType:
                                                  InputTypes[field.inputType],
                                              dataSubType: field.dataSubType
                                                  ? DataTypes[field.dataSubType]
                                                  : undefined
                                          }
                                      },
                                      order: i + 1
                                  }
                              }
                          )
                      }
                    : undefined
            },
            include: { toFields: { include: { toField: true } } }
        })
        return createdField
    }

    async readField(
        id?: string,
        filter: Prisma.FieldWhereInput = {}
    ): Promise<Field | Field[] | null> {
        if (id) {
            const foundField = await prismaClient.field.findUnique({
                where: { id },
                include: {
                    toFields: { include: { toField: true } }
                }
            })
            if (!foundField) throw new BadRequestError("Field not found!")
            return foundField
        } else {
            return await prismaClient.field.findMany({
                where: filter,
                include: {
                    toFields: { include: { toField: true } }
                }
            })
        }
    }

    async updateField(
        id: string,
        data: Prisma.FieldUpdateInput
    ): Promise<Field> {
        return prismaClient.field.update({
            where: { id },
            data
        })
    }

    async deleteField(id: string): Promise<Field> {
        return prismaClient.field.delete({ where: { id } })
    }
}
