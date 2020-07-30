import { Resolver, Query } from 'type-graphql';
import { Person } from './../../db/models/Person';

@Resolver()
export class PersonResolver {
  @Query(() => [Person])
  people() {
    return Person.findAll();
  }
}
