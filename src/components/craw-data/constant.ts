export const getCrawDataKey = {
  list: (filter?: Record<string, any>) => ['crawData', filter ?? {}],
  detail: (id: string) => ['crawData', id],
};
