import { TvSchemaItem } from './tv-schema-item.model';

export interface TvProgram {
  data: {
    resource_type: string;
    id: number;
    date: string;
    schema: TvSchemaItem[];
  };
  success: boolean;
  active?: boolean;
}
