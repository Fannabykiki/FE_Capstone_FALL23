export const convertToODataParams = (
  obj: {
    [key: string]: string | number | boolean | undefined | null;
  },
  contains?: {
    [key: string]: string | null;
  }
) => {
  const odataParams: string[] = [];

  for (const key in obj) {
    const value = obj[key];
    if (value !== "" && value !== undefined && value !== null) {
      if (obj.hasOwnProperty(key)) {
        if (typeof value === "boolean" || typeof value === "number") {
          odataParams.push(`${key} eq ${value}`);
        } else {
          odataParams.push(`${key} eq '${value}'`);
        }
      }
    }
  }

  if (contains) {
    for (const key in contains) {
      const value = contains[key];
      if (value !== "" && value !== undefined && value !== null) {
        if (contains.hasOwnProperty(key)) {
          if (typeof value === "boolean" || typeof value === "number") {
            odataParams.push(`contains(${key}, ${value})`);
          } else {
            odataParams.push(`contains(${key}, '${value}')`);
          }
        }
      }
    }
  }

  return odataParams.length ? odataParams.join(" and ") : undefined;
};
