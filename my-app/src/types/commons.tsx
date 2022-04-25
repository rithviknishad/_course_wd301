export type Paginated<T> = {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
};

export type PaginationParams = {
  limit: number;
  offset: number;
};

export type Errors<T> = Partial<Record<keyof T, string>>;
