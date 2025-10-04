type QueryParams<T> = {
  model: any;
  query: Record<string, any>;
  searchFields: (keyof T)[];
  select?: Record<string, any>;
  defaultSortBy?: string;
};

export const queryBuilder = async <T>({
  model,
  query,
  searchFields,
  defaultSortBy = "excerpt",
  select,
}: QueryParams<T>) => {
  const { search, sortBy, sortOrder, limit, page, ...rest } = query;

  const where: any = { ...rest };

  if (search && searchFields?.length > 0) {
    where.OR = searchFields.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));
  }

  const orderBy = { [sortBy || defaultSortBy]: sortOrder || "desc" };

  const pageNum = Number(page) || 1;
  const take = Number(limit) || 10;
  const skip = (pageNum - 1) * take;

  const [data, total] = await Promise.all([
    model.findMany({ where, orderBy, skip, take, select }),
    model.count({ where }),
  ]);

  return {
    data,
    meta: {
      page: pageNum,
      limit: take,
      total,
      totalPage: Math.ceil(total / take),
    },
  };
};
