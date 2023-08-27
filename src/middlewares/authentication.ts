import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';

export interface CustomRequest extends Request {
    token: string | JwtPayload|undefined;
   }

const authenticateToken = (req:Request, res:Response, next:NextFunction)=> {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header
    console.log(token);
  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    (req as CustomRequest).token = user; // Attach the user data to the request object
});
next();
}

export default authenticateToken;

