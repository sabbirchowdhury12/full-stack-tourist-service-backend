import ApiError from "../../../errors/ApiError";
import { ICows } from "./cow.interface";
import Cow from "./cow.model";

const createCow = async (cow: ICows): Promise<ICows> => {
  const createCow = await Cow.create(cow);
  if (!createCow) {
    throw new ApiError(400, "failed to create");
  }
  return createCow;
};

export const CowService = {
  createCow,
};
