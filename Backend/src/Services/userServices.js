import prisma from "../../prisma/prismaclient.js";

const signUpUser = async (
  name,
  email,
  hashedpassword,
  phonenumber,
  is_verified,
  verificationToken
) => {
  const user = await prisma.users.create({
    data: {
      name: name,
      email: email,
      phone_number: phonenumber,
      hashed_password: hashedpassword,
      is_verified: is_verified,
      verification_token: verificationToken,
    },
  });
  return user;
};

const verification = async (token) => {
  const user = await prisma.users.findFirst({
    where: { verification_token: token },
  });

  if (!user) {
    return "Invalid or expired token";
  }
  await prisma.users.update({
    where: { id: user.id },
    data: {
      is_verified: true,
      verification_token: "null",
    },
  });
  return "Registration and verification successfull!";
};

const getuserdata = async (email) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (!user) {
    return false;
  }
  return user;
};

const addVerificationToken = async (email, token) => {
  const user = await prisma.users.update({
    where: { email: email },
    data: {
      verification_token: token,
    },
  });
};

const changePassword = async (Token, password) => {
  const user = await prisma.users.updateMany({
    where: { verification_token: Token },
    data: {
      verification_token: null,
      hashed_password: password,
    },
  });
  return user;
};

const getuserdatawithToken = async (token) => {
  const user = await prisma.users.findFirst({
    where: {
      verification_token: token,
    },
  });
  return user;
};

const getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: { id },
  });
  return user;
};

const updateUser = async (id, data) => {
  try {
    const updatedUser = await prisma.users.update({
      where: { id },
      data,
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export {
  signUpUser,
  verification,
  getuserdata,
  addVerificationToken,
  changePassword,
  getuserdatawithToken,
  getUserById,
  updateUser,
};
