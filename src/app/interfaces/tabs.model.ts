import { TvSchemaItem } from './tv-schema-item.model';
import { TvProgram } from './tv-program.model';
export interface Tabs {
  title: string;
  active: boolean;
  content: TvSchemaItem[];
}
