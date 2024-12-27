export const getUserKey = {
  list: (filter?: Record<string, any>) => ['users', filter ?? {}],
  id: (id: string) => ['users', id],
};

export const BUILT_IN_ROLES = {
  PROVIDERS: '676bb368e42580a08ea2609e',
};
