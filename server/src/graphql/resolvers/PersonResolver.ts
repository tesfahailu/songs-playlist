import {
  Resolver,
  Query,
  Arg,
  ArgsType,
  Field,
  Mutation,
  Args,
  ObjectType,
} from 'type-graphql';
import { Person } from './../../db/models/Person';

@ArgsType()
class CreatePersonArg {
  @Field()
  userName: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  birthDate?: Date;
}

@ObjectType()
class DeletePersonResponse {
  @Field()
  success: Boolean;
}

@Resolver()
export class PersonResolver {
  @Query(() => Person)
  async person(@Arg('userName') userName: string): Promise<Person | null> {
    return await Person.findOne({ where: { userName } });
  }

  @Query(() => [Person])
  async people(): Promise<Person[] | null> {
    return await Person.findAll();
  }

  @Mutation(() => Person)
  async createPerson(
    @Args()
    {
      userName,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    }: CreatePersonArg,
  ): Promise<Person | null> {
    return await Person.create({
      userName,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    });
  }

  @Mutation(() => Person)
  async updatePerson(
    @Args()
    {
      userName,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
    }: CreatePersonArg,
  ): Promise<Person | null> {
    return (await Person.update(
      {
        userName,
        password,
        firstName,
        lastName,
        email,
        phoneNumber,
        birthDate,
      },
      {
        where: {
          userName,
        },
      },
    )) as any;
  }

  @Mutation(() => DeletePersonResponse)
  async deletePerson(
    @Arg('userName') userName: string,
  ): Promise<DeletePersonResponse> {
    const person = await Person.findOne({ where: { userName } });
    if (!person) throw new Error('user does not exist');

    try {
      await Person.destroy({ where: { userName } });
    } catch (err) {
      console.log(err);
      return { success: false };
    }
    return { success: true };
  }
}
