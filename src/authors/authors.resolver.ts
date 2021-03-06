import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { EditAuthorInput } from './dto/edit-author.input';
import { Author } from './models/author.model';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => Int)
  authorCount(): Promise<number> {
    return this.authorsService.countAll();
  }

  @Query(() => [Author])
  allAuthors(): Promise<Author[]> {
    return this.authorsService.allAuthors();
  }

  @ResolveField()
  async bookCount(@Parent() author: Author) {
    const { name } = author;
    return this.authorsService.authorBookCount(name);
  }

  @Mutation(() => Author, { nullable: true })
  async editAuthor(
    @Args('editAuthorData') editAuthorData: EditAuthorInput,
  ): Promise<Author> {
    const author = await this.authorsService.editAuthor(editAuthorData);
    return author;
  }
}
