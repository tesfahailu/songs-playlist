import { MiddlewareFn } from 'type-graphql';
import { MyContext } from 'src/graphql/context/MyContext';
import { verify } from 'jsonwebtoken';

export const authGuard: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) throw new Error('please sign in');
  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
  }
  return next();
};
