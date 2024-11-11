export const getQuestionKey = {
  list: (filter?: Record<string, any>) => ['question', filter ?? {}],
  id: (id: string) => ['question', id],
};
