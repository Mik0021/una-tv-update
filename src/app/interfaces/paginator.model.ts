export interface Paginator {
  path: string;
  per_page: number;
  count: number;
  total: number;
  current_page: number;
  last_page: number;
}
