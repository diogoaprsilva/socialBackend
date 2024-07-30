exports.adminLoginValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.email:
        errorMsg = "Please Enter Your Email";
        break;
      case !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email):
        errorMsg = "Please Enter A Valid Email";
        break;
        case !data.password:
          errorMsg = "Please Enter Password";
          break;
      // case !/(?=.*\d)(?=.*[!@#$%^&*()-=_+~])(?=.*[a-zA-Z]).{8,}/.test(data.password):
      //     errorMsg = "Password Should Contain 8 Characters, 1 Numeric, and 1 Special Character";
      //     break;
      // case !data.confirm_password:
      //     errorMsg = "Confirm Password Is Required";
      //     break;
      // case data.password !== data.confirm_password:
      //     errorMsg = "Confirm Password Does Not Match";
      //     break;
    }
    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};
exports.adminChangePasswordValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case !data.email:
        errorMsg = "Email is required";
        break;

      case !data.currentPassword:
        errorMsg = "Please enter correct current password";
        break;

      case !data.newPassword:
        errorMsg = "Please enter correct new password";
        break;

      case !data.confirmPassword:
        errorMsg = "Please enter confirm password";
        break;

      case data.newPassword !== data.confirmPassword:
        errorMsg = "New password and confirm password does not match";
        break;

      case data.currentPassword == data.newPassword:
        errorMsg =
          "Current password and new password match! Please used another password";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.blockByIdValidator = async (req, res, next) => {
  try {
    let data = req.body;

    let errorMsg = "";

    switch (true) {
      case !data.id:
        errorMsg = "User id is required";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.userListByIdValidator = async (req, res, next) => {
  try {
    let data = req.body;

    let errorMsg = "";

    switch (true) {
      case !data.id:
        errorMsg = "User id is required";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.getUserListByIdValidator = (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.id:
        errorMsg = "Id is required";
        break;

      default:
        break;
    }
    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};
