import { sendRefreshToken } from '../../auth/sendRefreshToken';
import { createRefreshToken, createAccessToken } from '../../auth/auth';
import { MyContext } from '../context/MyContext';
import { Resolver, Mutation, Arg, ObjectType, Field, Ctx } from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { Person } from '../../db/models/Person';
import connectToDataBase from '../../db/sequelize';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg('userName') userName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await Person.create({
        userName,
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('userName') userName: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext,
  ): Promise<LoginResponse> {
    const person = await Person.findOne({ where: { userName } });
    if (!person) {
      throw new Error('user was not found');
    }

    const valid = await compare(password, person.password);
    console.log(valid);
    if (!valid) {
      throw new Error('password not found');
    }

    sendRefreshToken(res, createRefreshToken(person));

    return {
      accessToken: createAccessToken(person),
    };
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(
    @Arg('userName', () => String) userName: string,
  ) {
    (await connectToDataBase())
      .getRepository(Person)
      .increment('tokenVersion', { by: 1, where: { userName } });
    return true;
  }
}
