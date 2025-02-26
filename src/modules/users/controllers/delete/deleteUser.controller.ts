import { Request, Response } from "express";
import { logger } from "src/utils/logger";
import { container } from "tsyringe";
import { DeleteUserService } from "../../services/delete/deleteUser.service";


export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userService = container.resolve(DeleteUserService);

    try {
      await userService.execute(Number(id))
      return response.status(204).end()
    } catch (error) {
      logger.error(error.message)
      return response.status(400).json({ error: error.message });
    }
  }
}