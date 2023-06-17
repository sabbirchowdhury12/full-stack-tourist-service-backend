import ApiError from "../../../errors/ApiError";
import { ICows } from "./cow.interface";
import Cow from "./cow.model";

//create a cow
const createCow = async (cow: ICows): Promise<ICows> => {
  const createCow = await Cow.create(cow);
  if (!createCow) {
    throw new ApiError(400, "failed to create");
  }
  return createCow;
};

//get all cow
const getAllCows = async () => {
  const allCows = await Cow.find({});
  if (!allCows) {
    throw new ApiError(400, "failed to get all cow");
  }
  return allCows;
};

//get a user
const getSingleCow = async (id: string) => {
  const getCow = await Cow.findById(id);
  if (!getCow) {
    throw new ApiError(400, "failed to get a cow");
  }
  return getCow;
};

//delete a user
const deleteCow = async (id: string) => {
  const result = await Cow.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(400, "failed to delete a cow");
  }
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  deleteCow,
};
