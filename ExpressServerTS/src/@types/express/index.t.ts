// declare module NodeJS {
//   declare global {}
// }

export {};

declare global {
  namespace NodeJS {
    // interface Global {
    namespace Express {
      interface Request {
        authenticated: boolean;
        userId: number;
        isAdmin: boolean;
        //  }
      }
    }
  }
}
