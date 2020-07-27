import { Resolver, Query } from 'type-graphql';

@Resolver()
export class PersonResolver {
  @Query(() => String)
  hello() {
    return 'hi!';
  }
}
