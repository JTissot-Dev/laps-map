import * as jwt from "jsonwebtoken";
import User from "../../models/User/User";
import AuthContext from "../../types/AuthContext";


const authenticate = (context: AuthContext, user: User) => {
  const token = jwt.sign({
    userId: user.id,
    userName: user.firstName + " " + user.lastName,
    email: user.email
  }, 
  process.env.JWT_SECRET
  );  

  let expireCookieUTC = new Date();
  expireCookieUTC.setSeconds(expireCookieUTC.getSeconds() + Number(process.env.COOKIE_TTL));

  const secureCookie = process.env.NODE_ENV === "production" ? "; Secure" : "";

  context.res.setHeader(
    "Set-Cookie", 
    `token=${token} ${secureCookie}; HttpOnly; SameSite=Strict; Expires=${expireCookieUTC.toUTCString()}`
  );

  return JSON.stringify({
    userId: user.id,
    userName: user.firstName + " " + user.lastName,
    email: user.email
  });
};

export default authenticate;