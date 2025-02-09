type ArrayFormatOptions = {
  type: "join" | "map" | "filter" | "reduce" | "every" | "some";
  separator?: string;
  field?: string;
  template?: string;
  predicate?: string | ((item: any) => boolean);
  reducer?: string | ((acc: any, item: any) => any);
  initialValue?: any;
};

type ObjectFormatOptions = {
  type: "pick" | "template" | "path";
  fields?: string[];
  template?: string;
  path?: string;
  fallback?: string;
};

export type FormatOptions = {
  array?: ArrayFormatOptions;
  object?: ObjectFormatOptions;
};

const getValueByPath = (obj: any, path: string): any => {
  return path
    .split(".")
    .reduce((acc, part) => (acc ? acc[part] : undefined), obj);
};

const evaluateExpression = (expression: string, item: any): boolean => {
  try {
    // 안전한 방식으로 표현식 평가
    const fn = new Function("item", `return ${expression}`);
    return fn(item);
  } catch {
    return false;
  }
};

export const formatComplexValue = (
  value: any,
  options?: FormatOptions
): string => {
  // 배열 처리
  if (Array.isArray(value) && options?.array) {
    const {
      type,
      separator = ", ",
      field,
      template,
      predicate,
      reducer,
      initialValue,
    } = options.array;

    let processedArray = [...value];

    switch (type) {
      case "filter":
        if (predicate) {
          processedArray =
            typeof predicate === "string"
              ? processedArray.filter((item) =>
                  evaluateExpression(predicate, item)
                )
              : processedArray.filter(predicate);
        }
        return processedArray.join(separator);

      case "map":
        if (field) {
          return processedArray
            .map((item) => getValueByPath(item, field))
            .join(separator);
        }
        if (template) {
          return processedArray
            .map((item) => {
              let result = template;
              Object.entries(item).forEach(([key, val]) => {
                result = result.replace(`{${key}}`, String(val));
              });
              return result;
            })
            .join(separator);
        }
        return processedArray.join(separator);

      case "reduce":
        if (typeof reducer === "string") {
          const fn = new Function("acc", "item", `return ${reducer}`);
          return processedArray.reduce(fn, initialValue).toString();
        }
        if (reducer) {
          return processedArray.reduce(reducer, initialValue).toString();
        }
        return value.toString();

      case "every":
        if (predicate) {
          return processedArray
            .every(
              typeof predicate === "string"
                ? (item) => evaluateExpression(predicate, item)
                : predicate
            )
            .toString();
        }
        return "false";

      case "some":
        if (predicate) {
          return processedArray
            .some(
              typeof predicate === "string"
                ? (item) => evaluateExpression(predicate, item)
                : predicate
            )
            .toString();
        }
        return "false";

      case "join":
      default:
        return processedArray.join(separator);
    }
  }

  // 객체 처리
  if (value && typeof value === "object" && options?.object) {
    const { type, fields, template, path, fallback = "" } = options.object;

    switch (type) {
      case "pick":
        if (fields) {
          return fields
            .map((field) => getValueByPath(value, field))
            .filter(Boolean)
            .join(", ");
        }
        return Object.values(value).join(", ");

      case "template":
        if (template) {
          let result = template;
          Object.entries(value).forEach(([key, val]) => {
            result = result.replace(`{${key}}`, String(val));
          });
          return result;
        }
        return JSON.stringify(value);

      case "path":
        if (path) {
          const result = getValueByPath(value, path);
          return result !== undefined ? String(result) : fallback;
        }
        return fallback;

      default:
        return JSON.stringify(value);
    }
  }

  return String(value);
};
