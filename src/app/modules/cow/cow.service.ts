import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
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

type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
//get all cow
const getAllCows = async (
  filters: any,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICows[]>> => {
  // ------------------------->>>>>>>>>>>>>
  const { searchTerm } = filters;
  const andConditions = [
    {
      $or: [
        { location: { $regex: new RegExp(searchTerm.toString(), "i") } },
        { breed: { $regex: new RegExp(searchTerm.toString(), "i") } },
        { category: { $regex: new RegExp(searchTerm.toString(), "i") } },
      ],
    },
  ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const total = await Cow.countDocuments();

  const result = await Cow.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ApiError(400, "failed to get all cow");
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
