interface AuthenticateUseCaseInput {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  async execute({ email, password }: AuthenticateUseCaseInput) {}
}
