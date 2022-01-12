export type APIQuery<T extends object>
  = T & {
    _id: string;
    _v: string;
  };
