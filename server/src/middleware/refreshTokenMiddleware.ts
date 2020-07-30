import { Request, Response } from 'express';
import { createAccessToken, createRefreshToken } from './../auth/auth';
import { verify } from 'jsonwebtoken';
import { Person } from './../db/models/Person';
import { sendRefreshToken } from './../auth/sendRefreshToken';

export default async (req: Request, res: Response) => {
  const token = req.cookies.gid;
  if (!token) return res.send({ ok: false, accessToken: '' });

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: '' });
  }

  const person = await Person.findOne({
    where: { userName: payload.personUserName },
  });
  if (!person) {
    return res.send({ ok: false, accessToken: '' });
  }

  if (person.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' });
  }

  sendRefreshToken(res, createRefreshToken(person));

  return res.send({ ok: true, accessToken: createAccessToken(person) });
};
