exports.registerValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.userName:
        errorMsg = "Please enter your username";
        break;
      case !data.email:
        errorMsg = "Please enter your email";
        break;
      case !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email):
        errorMsg = "Please enter a valid email";
        break;
      case !data.mobileNumber:
        errorMsg = "Please enter your mobile number";
        break;
      // case !/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(
      //   data.mobileNumber
      // ):
      //   errorMsg = "Please Enter A Valid Mobile Number";
      //   break;
      case !data.password:
        errorMsg = "Please enter your password";
        break;
      case !/(?=.*\d)(?=.*[!@#$%^&*()-=_+~])(?=.*[a-zA-Z]).{8,}/.test(
        data.password
      ):
        errorMsg =
          "Password should contain 8 characters, 1 numeric, and 1 special character";
        break;
      case !data.confirmPassword:
        errorMsg = "Confirm password is required";
        break;
      case data.password !== data.confirmPassword:
        errorMsg = "Confirm password does not match";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.emailValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.email:
        errorMsg = "Please enter your email";
        break;
      case !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email):
        errorMsg = "Please enter a valid email";
        break;
      case !data.mobileNumber:
        errorMsg = "Please enter mobile number";
        break;
      // case !/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(
      //   data.mobileNumber
      // ):
      //   errorMsg = "Please Enter A Valid Mobile Number";
      //   break;

    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.smsValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.mobileNumber:
        errorMsg = "Please enter mobile number";
        break;
      // case !/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(
      //   data.mobileNumber
      // ):
      //   errorMsg = "Please Enter A Valid Mobile Number";
      //   break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.signUpValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.userName:
        errorMsg = "Please enter your user name";
        break;
      case !data.dateOfBirth:
        errorMsg = "Please enter your date of birth";
        break;
      case !isValidDateFormat(data.dateOfBirth):
        errorMsg = "Please enter a valid date format (dd/mm/yyyy)";
        break;
      case !isValidDate(data.dateOfBirth):
        errorMsg = "Please enter a valid date of birth";
        break;
      case calculateAge(data.dateOfBirth) < 16:
        errorMsg = "You must be at least 17 years old to register";
        break;
      case calculateAge(data.dateOfBirth) > 200:
        errorMsg = "Please enter a valid date of birth";
        break;
      case !data.email:
        errorMsg = "Please Enter Your Email";
        break;
      case !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email):
        errorMsg = "Please Enter A Valid Email";
        break;
      case !data.mobileNumber:
        errorMsg = "Please Enter Mobile Number";
        break;
      // case !/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(
      //   data.mobileNumber
      // ):
      //   errorMsg = "Please Enter A Valid Mobile Number";
      //   break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

function isValidDateFormat(dateString) {
  // Check if the date string is in a valid format (dd/mm/yyyy)
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(dateString);
}

function isValidDate(dateString) {
  // Check if the date string is a valid date
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero based
  const year = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

function calculateAge(dateOfBirth) {
  // Calculate age based on date of birth
  const parts = dateOfBirth.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero based
  const year = parseInt(parts[2], 10);
  const dob = new Date(year, month, day);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - dob.getFullYear();
  const monthDiff = currentDate.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}



exports.smartPinValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.smartPin:
        errorMsg = "Please enter smart pin";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.loginValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.emailOrMobile:
        errorMsg = "Please enter email or mobile number";
        break;
      // case !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email):
      //   errorMsg = "Please Enter A Valid Email";
      //   break;
      case !data.password:
        errorMsg = "Please enter password";
        break;
      // case !data.otp:
      //   errorMsg = "Please Enter OTP";
      //   break;
      // case !data.serverOTP:
      //   errorMsg = "Please Enter server OTP";
      //   break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(400).json({ success: false, error: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.resetPasswordValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.emailormobile:
        errorMsg = "Please enter email or mobile number";
        break;
      case !data.password:
        errorMsg = "Please enter password";
        break;
      case !/(?=.*\d)(?=.*[!@#$%^&*()-=_+~])(?=.*[a-zA-Z]).{8,}/.test(
        data.password
      ):
        errorMsg =
          "Password should contain 8 characters, 1 numeric, and 1 special character";
        break;
      case !data.confirmPassword:
        errorMsg = "Confirm password is required";
        break;
      case data.password !== data.confirmPassword:
        errorMsg = "Confirm password does not match";
        break;
      case !data.otp:
        errorMsg = "Please enter OTP";
        break;
      // case !data.serverOTP:
      //   errorMsg = "Please Enter server OTP";
      //   break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(400).json({ success: false, error: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.changePasswordValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.oldPassword:
        errorMsg = "Old password is required";
        break;
      case !data.newPassword:
        errorMsg = "Please enter new password";
        break;
      case !/(?=.*\d)(?=.*[!@#$%^&*()-=_+~])(?=.*[a-zA-Z]).{8,}/.test(
        data.newPassword
      ):
        errorMsg =
          "Password should contain 8 characters, 1 numeric, and 1 special character";
        break;
      case !data.confirmPassword:
        errorMsg = "Confirm password is required";
        break;
      case data.newPassword !== data.confirmPassword:
        errorMsg = "Confirm password does not match";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(400).json({ success: false, error: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};


exports.checkOldPasswordValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.oldPassword:
        errorMsg = "Old password is required";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(400).json({ success: false, error: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.checkEmailValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You have not entered any data";
        break;
      case !data.email:
        errorMsg = "Please Enter Email";
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
      return res.status(400).json({ success: false, error: errorMsg });
    }
  } catch (error) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.OTPForLoginValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";
    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.emailormobile:
        errorMsg = "Please enter email or mobile number";
        break;

      default:
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(400).json({ success: false, error: errorMsg });
    }
  } catch (error) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.cardDetailValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.cardNumber:
        errorMsg = "Please Enter card Number";
        break;
      // case !/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(data.cardNumber):
      //   errorMsg = "Please Enter A Valid Card Number";
      //   break;
      case !data.nameOnCard:
        errorMsg = "Please Enter name On Card";
        break;
      // case !/^[a-zA-Z0-9_.-]*$/.test(data.nameOnCard):
      //   errorMsg = "Please Enter A Valid name On Card";
      //   break;
      case !data.expiryMonth:
        errorMsg = "Please Enter expiry Month";
        break;
      case !/^(0?[1-9]|1[012])$/.test(data.expiryMonth):
        errorMsg = "Please Enter A Valid month";
        break;
      case !data.expiryYear:
        errorMsg = "Please Enter expiry Year";
        break;
      case !/^(19[5-9]\d|20[0-4]\d|2050)$/.test(data.expiryYear):
        errorMsg = "Please Enter A Valid Year";
        break;
      case !data.postalCode:
        errorMsg = "Please Enter postal Code";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.cardDetailByIdValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.id:
        errorMsg = "Please Enter Id";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.addOfferValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.offerCategoryId:
        errorMsg = "Please Enter offerCategoryId";
        break;

      case !data.offerName:
        errorMsg = "Please Enter offer Name";
        break;

      case !data.offerDescription:
        errorMsg = "Please Enter offer Description";
        break;
      case !data.offerPrice:
        errorMsg = "Please Enter offer Price";
        break;
      case !/^[0-9]*$/.test(data.offerPrice):
        errorMsg = "Please Enter A Valid offer Price";
        break;
      case !data.offerPercent:
        errorMsg = "Please Enter offer Percentage";
        break;
      case !/^[0-9]*$/.test(data.offerPercent):
        errorMsg = "Please Enter A Valid offer Percentage";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.offerDetailByIdValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.id:
        errorMsg = "Please Enter Id";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.offerDetailByCategoryIdValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.categoryId:
        errorMsg = "Please Enter categoryId";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.wishListValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.offerId:
        errorMsg = "Please Enter offerId";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.reviewRatingValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.offerId:
        errorMsg = "Please Enter offerId";
        break;
      case !data.review:
        errorMsg = "Please Enter review";
        break;
      case !data.rating:
        errorMsg = "Please Enter rating";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.insertChatValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      // case !data.ticketNumber:
      //   errorMsg = "Please Enter ticketNumber";
      //   break;
      case !data.receiverId:
        errorMsg = "Please Enter receiverId";
        break;
      case !data.message:
        errorMsg = "Please Enter message";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.getChatValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      // case !data.ticketNumber:
      //   errorMsg = "Please Enter ticketNumber";
      //   break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.insertSupportValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.message:
        errorMsg = "Please Enter message";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.redeemOfferValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.offerId:
        errorMsg = "Please Enter offerId";
        break;
      case !data.redeemCode:
        errorMsg = "Please Enter redeemCode";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.insertEventParticipationValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.eventId:
        errorMsg = "Please Enter eventId";
        break;
      // case !data.cardNumber:
      //   errorMsg = "Please Enter cardNumber";
      //   break;
      // case !data.amount:
      //   errorMsg = "Please Enter amount";
      //   break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.insertEventParticipationThirdPartyValidator = async (
  req,
  res,
  next
) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.eventId:
        errorMsg = "Please Enter eventId";
        break;

      case !data.amount:
        errorMsg = "Please Enter amount";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.addExpenseValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.title:
        errorMsg = "Please Enter title";
        break;

      // case !data.description:
      //   errorMsg = "Please Enter description";
      //   break;
      case !data.amount:
        errorMsg = "Please Enter amount";
        break;
      case !data.type:
        errorMsg = "Please Enter type";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.ExpenseByIdValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.id:
        errorMsg = "Please Enter id";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.eventIdValidator = async (req, res, next) => {
  try {
    const data = req.body;

    let errorMsg = "";

    switch (true) {
      case Object.keys(data).length === 0:
        errorMsg = "You Have Not Entered Any Data";
        break;
      case !data.eventId:
        errorMsg = "Please Enter event Id";
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};