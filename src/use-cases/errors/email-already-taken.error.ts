export class EmailAlreadyTakenError extends Error {
  constructor() {
    super('Email Already Taken.');
  }
}
