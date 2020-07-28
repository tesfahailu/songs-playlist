import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { Person } from './../../db/models/Person';
import { sign } from 'jsonwebtoken';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class PersonResolver {
  @Query(() => String)
  hello() {
    return 'hi!';
  }

  @Query(() => [Person])
  async people() {
    try {
      const people = await Person.findAll();
      return people;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('userName') userName: string,
    @Arg('password') password: string,
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

    return {
      accessToken: sign({ userId: person.id }, 'adkfadfladflakdfl', {
        expiresIn: '15m',
      }),
    };
  }

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
}
