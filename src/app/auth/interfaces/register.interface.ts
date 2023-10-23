export interface UserRegister {
  username: string,
  password: string,
  lastname: string,
  firstname: string
}

export interface UserRegisterResponse {
  token: string
}
