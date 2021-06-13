import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordController } from '@modules/accounts/useCases/sendForgotPasswordMail/sendForgotPasswordMailController';
import { Router } from 'express';




const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes }