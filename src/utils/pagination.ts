export const pagination = <T>(
  data: T[] | undefined,
  page: number,
  pageSize: number
) => data?.slice((page - 1) * pageSize, page * pageSize) || [];
