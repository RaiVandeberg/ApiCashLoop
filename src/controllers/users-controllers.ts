import { Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { z } from "zod";

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "Nome é obrigatório" }),
      email: z.string().trim().email({ message: "Email inválido" }),   
      password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
      role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee),
    })

    const { name, email, password, role } = bodySchema.parse(request.body);

   response.json({ name, email, password, role });
    }
}

export { UsersController };