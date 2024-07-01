import { Response } from "express"


type AuthContext = {
  payload: {
    userId: string,
    userName: string,
    email: string
  },
  res: Response<any, Record<string, any>>
};

export default AuthContext;