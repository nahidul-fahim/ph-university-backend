import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import mongoose from "mongoose";
import { User } from "../user/user.model";


// get all students from DB
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {

  let searchTerm = '';

  // making a copy of query object that can be mutated
  let queryObj = { ...query }

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH (Query)  : 
  // { email: { $regex: query.searchTerm, $options: i } }
  // { presentAddress: { $regex: query.searchTerm, $options: i } }
  // { 'name.firstName': { $regex: query.searchTerm, $options: i } }


  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']

  // search query
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  })

  // exclude field
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'] // this fields will be excluded from filtering which will do exact match
  excludeFields.forEach((el) => delete queryObj[el])

  // filter query
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty"
      },
    });


  let sort = '-createdAt'
  if (query.sort) {
    sort = query.sort as string
  }

  // sort query
  const sortQuery = filterQuery.sort(sort)


  // pagination & limit query
  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit
  }

  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);

  // field limiting
  let fields = '-__v'
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ')
  }
  
  let fieldQuery = await limitQuery.select(fields)

  return fieldQuery;
};



// get single student from DB
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate('admissionSemester')
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty"
      },
    });
  return result;
};



// update student into db
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};



// delete a student from db
const deleteStudentFromDB = async (id: string) => {

  const isStudentExists = await Student.findOne({ id: id })
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student doesn't exist!")
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to delete student');
  }
};


export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};