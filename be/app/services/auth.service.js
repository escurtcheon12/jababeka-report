const bcrypt = require("bcryptjs");
const { BadRequestException } = require("../helpers/errors");
const { messages } = require("../helpers/messages");
const { userRepository } = require("../repository");

const login = async (username, password) => {
  if (!username || !password)
    throw new BadRequestException(messages.FieldEmpty("Username and password"));

  const getByUsername = await userRepository.getByOneKeyColumn(
    username,
    "username"
  );

  if (!getByUsername)
    throw new BadRequestException(messages.dataNotExist("Username"));

  const compare_password = await bcrypt.compare(
    password,
    getByUsername ? getByUsername.password : ""
  );

  if (
    (username != getByUsername.username &&
      password != getByUsername.password) ||
    !compare_password
  ) {
    throw new BadRequestException(messages.LoginFail);
  }

  return getByUsername;
};

const register = async (username, email, phone, password, repeat_password) => {
  if (!username || !email || !phone || !password || !repeat_password)
    throw new BadRequestException(
      messages.FieldEmpty(
        "Username, email, phone, password and repeat password"
      )
    );

  if (password != repeat_password)
    throw new BadRequestException(
      messages.SameField("Password", "Repeat password")
    );

  const getByUsername = userRepository.getByOneKeyColumn(username, "username");
  const getByEmail = userRepository.getByOneKeyColumn(email, "email");
  const getByPhone = userRepository.getByOneKeyColumn(phone, "phone");

  const checkingData = await Promise.all([
    getByUsername,
    getByEmail,
    getByPhone,
  ]);
  for (const index in checkingData) {
    if (index == 0 && checkingData[0])
      throw new BadRequestException(messages.dataExist("Username"));

    if (index == 1 && checkingData[1])
      throw new BadRequestException(messages.dataExist("Email"));

    if (index == 2 && checkingData[2])
      throw new BadRequestException(messages.dataExist("Phone"));
  }

  const hash_password = await bcrypt.hash(password, 10);

  let fields_data = {
    username,
    email,
    phone,
    password: hash_password,
  };
  const data = await userRepository.create(fields_data);

  return data;
};

module.exports = {
  login,
  register,
};
