exports.vendorLoginValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.email:
        errorMsg = "Email is required";
        break;

      case !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email):
        errorMsg = "Please Enter A Valid Email";
        break;

      case !data.password:
        errorMsg = "Please Enter Password";
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
      msg: "Error from validator",
    });
  }
};

exports.getVendorProfilePicValidatorByEmail = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.email:
        errorMsg = "Email is required";
        break;

      case !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email):
        errorMsg = "Please Enter A Valid Email";
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
      msg: "Error from validator",
    });
  }
};

exports.vendorChangePasswordValidator = async (req, res, next) => {
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

exports.updateVendorProfileValidator = async (req, res, next) => {
  try {
    let data = req.body;

    switch (true) {
      case !data.userName:
        errorMsg = "User name is required";
        break;

      case !data.mobileNumber:
        errorMsg = "Mobile number is required";
        break;

      case !data.profilePic:
        errorMsg = "Profile pic is required";
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

exports.insertEventsValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.name:
        errorMsg = "Please provide name";
        break;

      case !data.description:
        errorMsg = "Please provide description";
        break;

      case !data.location:
        errorMsg = "Please provide location";
        break;

      // case !data.eventPrice:
      //   errorMsg = "Please provide event price";
      //   break;

      // case !data.mobileNumber:
      //   errorMsg = "Please provide mobile number";
      //   break;

      default:
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({
        success: false,
        msg: errorMsg,
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: errorMsg,
    });
  }
};



exports.updateEventsValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.name:
        errorMsg = "Please provide name";
        break;

      // case !/^[a-zA-Z ]{2,30}$/.test(data.name):
      //   errorMsg = "Please provide valid name";
      //   break;

      case !data.description:
        errorMsg = "Please provide description";
        break;

      case !data.address:
        errorMsg = "Please provide address";
        break;

      case !data.eventDate:
        errorMsg = "Please provide Event Date";
        break;

      case !data.fromTime:
        errorMsg = "Please provide Start Time";
        break;

      case !data.toTime:
        errorMsg = "Please provide End Time";
        break;

      case !data.location:
        errorMsg = "Please provide location";
        break;

      // case !data.eventPrice:
      //   errorMsg = "Please provide event price";
      //   break;

        // case !data.mobileNumber:
        //   errorMsg = "Please provide mobile number";
        //   break;
     

      default:
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({
        success: false,
        msg: errorMsg,
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "errorMsg",
    });
  }
};

exports.getEventsValidatorByEventId = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.eventId:
        errorMsg = "Events Id is required";
        break;

      default:
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({
        success: false,
        msg: errorMsg,
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "errorMsg",
    });
  }
};