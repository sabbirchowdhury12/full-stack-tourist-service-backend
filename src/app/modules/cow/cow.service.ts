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
const getAllCows = async (): Promise<ICows[]> => {
  const allCows = await Cow.find({});
  if (!allCows) {
    throw new ApiError(400, "failed to get all cow");
  }
  return allCows;
};

//get a cow
const getSingleCow = async (id: string): Promise<ICows> => {
  const getCow = await Cow.findById(id);
  if (!getCow) {
    throw new ApiError(400, "failed to get a cow");
  }
  return getCow;
};

//update a cow
const updateCow = async (id: string, newCow: {}): Promise<ICows> => {
  const result = await Cow.findByIdAndUpdate(id, { ...newCow }, { new: true });
  if (!result) {
    throw new ApiError(400, "failed to update a cow");
  }
  return result;
};
//delete a cow
const deleteCow = async (id: string): Promise<ICows> => {
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
  updateCow,
};
