import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { z } from "zod";


const CategoriesEnum = z.enum(["food", "others", "services", "transport", "accommodation",])

class RefundsController {
    async create(request: Request, response: Response){

        const bodySchema = z.object({
            name: z.string().trim().min(3, {message: "Informe o nome da solicitação"}),
            category: CategoriesEnum,
            amount: z.number().positive({message: "Valor tem que ser positivo"}),
            filename: z.string().min(20, {message: "Informe o nome do arquivo"}),

        })

        const { name, category, amount, filename } = bodySchema.parse(request.body)

        if(!request.user){
            throw new AppError("Unauthorized", 401)
        }

        const refund = await prisma.refunds.create({
            data:{
                name,
                category,
                amount,
                filename,
                userId: request.user.id
            }
        })
     response.status(201).json(refund)
    }
}

export { RefundsController }