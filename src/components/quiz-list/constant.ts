export const getQuizKey = {
  list: (filter?: Record<string, any>) => ['quiz', filter ?? {}],
  detail: (id: string) => ['quiz', id],
};
