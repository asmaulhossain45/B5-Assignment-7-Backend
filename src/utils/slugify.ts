import { prisma } from "../config/database";
import STATUS_CODE from "../config/statusCode";
import AppError from "./appError";

export const slugify = (text: string) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const generateSlug = async <
  T extends keyof typeof prisma,
  K extends string
>(
  modelName: T,
  field: K,
  value: string
) => {
  let slug = slugify(value);
  let uniqueSlug = slug;
  let counter = 1;

  const model = (prisma as any)[modelName];

  if (!model) {
    throw new AppError(STATUS_CODE.NOT_FOUND, "Model not found");
  }

  try {
    while (await model.findUnique({ where: { [field]: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
  } catch (error) {
    throw new AppError(
      STATUS_CODE.BAD_REQUEST,
      `Error generating unique slug!`
    );
  }

  return uniqueSlug;
};
