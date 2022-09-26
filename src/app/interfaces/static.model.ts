export interface Static {
  success: boolean;
  data: {
    resource_type: string;
    id: number;
    title: string;
    slug: string;
    description: string;
  };
}
