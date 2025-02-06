import { z } from "zod";

export const createValidatorWithZodSchema = <TSchema extends z.ZodType>(
  schema: TSchema
) => {
  return (data: unknown): string[] | undefined => {
    const result = schema.safeParse(data);
    if (result.success) {
      return undefined;
    }
    return [
      ...result.error.errors.map(
        (error) => `(${error.path.join(".")}) ${error.message}`
      ),
      `\n전체 응답\n---\n${JSON.stringify(data)}\n---\n`,
    ];
  };
};
