import ApplicantProfile from '../models/ApplicantProfileModel.js';
import { handleCreate, handleDelete, handleRetrieve, handleRetrieveOne, handleUpdate } from '../utils/controllerUtils.js';

export const createController = async (req, res) => {
  const { accountId, profileImg, banner, firstName, lastName, email, phone, address, bio, about, skills, preferedCareer, academicAchievements, activitiesAndInvolvements, certs, projects, resume, portfolioStyle, portfolioId, messages } = req.body;

  // await handleCreate(ApplicantProfile, {
  //   accountId,
  //   profileImg,
  //   banner,
  //   firstName,
  //   lastName,
  //   email,
  //   phone,
  //   address,
  //   bio,
  //   about,
  //   skills,
  //   preferedCareer,
  //   academicAchievements,
  //   activitiesAndInvolvements,
  //   certs,
  //   projects,
  //   resume,
  //   portfolioStyle,
  //   portfolioId,
  //   messages
  // }, res);

  await handleCreate(ApplicantProfile, req.body, res)
};

export const deleteController = async (req, res) => {
  const { _id } = req.body;
  await handleDelete(ApplicantProfile, { _id }, res);
};

export const retrieveController = async (req, res) => {
  await handleRetrieve(ApplicantProfile, res);
};

export const retrieveOneController = async (req, res) => {
  const { profileId } = req.body
  await handleRetrieveOne(ApplicantProfile, profileId,  res)
};

export const updateController = async (req, res) => {
  const { _id, set } = req.body;
  await handleUpdate(ApplicantProfile, { _id }, set, res);
};
