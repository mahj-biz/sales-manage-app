// We are telling TypeScript that we are modifying the Express namespace
declare namespace Express {
  // We are adding the 'user' property to the Request interface
  // The type should match what your JwtStrategy's validate() method returns
  export interface Request {
    user?: {
      userId: string;
      email: string;
    };
  }
}