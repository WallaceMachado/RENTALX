import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";


class DevolutionRentalController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
        //  {id: rental_id } sobescreve id por rental_id
    const { id: rental_id } = request.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
        rental_id: rental_id as string,
        user_id,
    });

    return response.status(200).json(rental);
}

}

export { DevolutionRentalController }