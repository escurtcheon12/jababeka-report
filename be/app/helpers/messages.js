module.exports.messages = {
  ServerError: "Internal Server Error",
  DataNotFound: "Data is not found",
  FieldEmpty: (field_names) => field_names + " should be fill",
  dataExist: (data) => data + " is already exists",
  dataNotExist: (data) => data + " is not exists",
  LoginFail: "Username and password is not correct",
  SaveSuccess: "Data has been successfully",
  SaveFail: "Data has been failed to save",
  SameField: (field_1, field_2) => field_1 + " should be same with " + field_2,
};
