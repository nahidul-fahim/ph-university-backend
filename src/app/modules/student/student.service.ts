import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import mongoose from "mongoose";
import { User } from "../user/user.model";


// get all students from DB
const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester')
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty"
      },
    });
  return result;
};

// get single student from DB
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id).populate('admissionSemester')
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty"
      },
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
    throw new Error('Failed to delete student');
  }
};


export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};