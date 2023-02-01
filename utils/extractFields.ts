export const ExtractFields = (
  object: Record<string, any>,
  fields: string[]
) => {
  const data: any = {};

  Object.entries(object).map(([key, value]) => {
    if (fields.includes(key)) {
      data[key] = value;
    }
  })
  return data;
};
