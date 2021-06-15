/*global spyOn*/
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/provaiders/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/provaiders/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokenRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgo Mail', () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokenRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  })
  /*

  it('should be able to send a forgot password mail to user', async () => {
    //const sendMail = spyOn(mailProvider, "sendMail");


    await usersRepositoryInMemory.create({
      driver_license: '430010',
      email: 'avufu@lepojud.ga',
      name: 'Bess Edwards',
      password: '1234'
    });

    await sendForgotPasswordMailUseCase.execute('avufu@lepojud.ga');

    // expect(sendMail).toHaveBeenCalled();
  });
  */


  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('viwtop@li.cl')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });
  /*
    it('should be able to create an users token', async () => {
      // const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');
      // console.log(generateTokenMail);
  
      await usersRepositoryInMemory.create({
        driver_license: '520717',
        email: 'jisitac@wacnuesi.fk',
        name: 'Gertrude Griffith',
        password: '1234'
      });
  
      await sendForgotPasswordMailUseCase.execute('jisitac@wacnuesi.fk');
  
      // expect(generateTokenMail).toBeCalled();
    });
    */
});