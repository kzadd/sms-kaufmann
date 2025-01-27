export interface JwtResponse {
  ApplicationData: string
  JWTTokenId: string
  User: string
  WSMessage: string
  WSStatus: string
  WSVersion: string
  exp: number
  iss: string
  jti: string
  secret: string
}
