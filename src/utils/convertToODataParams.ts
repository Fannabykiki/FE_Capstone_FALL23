export const convertToODataParams = (obj: {
  [key: string]: string | number | boolean | undefined | null;
}) => {
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

  return odataParams.join(" and ");
};
