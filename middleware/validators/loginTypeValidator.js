exports.getTeacherAndVendorIdValidator = async (req, res, next) => {
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
      error: error.mesaage,
    });
  }
};

exports.updateUserValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.userName:
        errorMsg = "User name is required";
        break;

      // case !/^[a-zA-Z ]{2,30}$/.test(data.name):
      //   errorMsg = "Please provide valid name";
      //   break;

      // case !data.dateOfBirth:
      //   errorMsg = "Date of birth is required";
      //   break;

      // case !data.mobileNumber:
      //   errorMsg = "Mobile number is required";
      //   break;
      // case !/^[0-9]{10}$/.test(
      //   data.mobileNumber
      // ):
      //   errorMsg = "Please provide valid mobile number";
      //   break;

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
      msg: error.mesaage,
    });
  }
};

exports.getUserListByIdValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.userId:
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
      msg: error.mesaage,
    });
  }
};

exports.getUserListByUserIdValidator = async (req, res, next) => {
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
      msg: error.mesaage,
    });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    let data = req.body;

    let errorMsg = "";
    switch (true) {
      case !data.userName:
        errorMsg = "Name ie required";
        break;
      // case !/^[a-zA-Z ]{2,30}$/.test(data.userName):
      //   errorMsg = "Please provide valid name";
      //   break;

      // case !data.dateOfBirth:
      //   errorMsg = "DOB is required";
      //   break;

      // case !data.mobileNumber:
      //   errorMsg = "Mobile number is required";

      // case !/^[0-9]{10}$/.test(
      //   data.mobileNumber
      // ):
      //   errorMsg = "Please provide valid mobile number";
      //   break;

      case !data.email:
        errorMsg = "Email is required";
        break;
      case !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email):
        errorMsg = "Please Enter A Valid Email";
        break;

      case !data.password:
        errorMsg = "Password is required";
        break;

      case !data.loginType:
        errorMsg - "Login type is required";
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
      super: false,
      msg: error.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";
    switch (true) {
      case !data.userName:
        errorMsg = "Name is required";
        break;
      case !/^[a-zA-Z ]{2,30}$/.test(data.userName):
        errorMsg = "Please provide valid name";
        break;

      case !data.loginType:
        errorMsg - "Login type is required";
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
      super: false,
      msg: error.message,
    });
  }
};
