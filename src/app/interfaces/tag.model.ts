import { Tags } from 'src/app/interfaces/tags.model';
import { Paginator } from './paginator.model';
import { Article } from './article.model';

export interface Tag {
  sucess: boolean;
  data: {
    tag: Tags;
    articles: Article[];
  };
  paginator: Paginator;
}
