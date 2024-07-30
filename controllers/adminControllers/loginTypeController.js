const loginTypeModel = require("../../models/adminModels/loginTypeModel");
const { validationResult } = require("express-validator");
const config = require("../../config");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");
const emailActivity = require("../emailActivity.controller");

exports.getVenderDetails = async (req, res) => {
  try {
    let getVenderDetails = await loginTypeModel.getVenderDetails();
    if (getVenderDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Vender details",
        data: getVenderDetails,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getSubAdminDetails = async (req, res) => {
  try {
    let getSubAdminDetails = await loginTypeModel.getSubAdminDetails();
    if (getSubAdminDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Sub Admin details",
        data: getSubAdminDetails,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getTeacherListDetails = async (req, res) => {
  try {
    let getTeacherListDetails = await loginTypeModel.getTeacherListDetails();
    if (getTeacherListDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Teacher list details",
        data: getTeacherListDetails,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let image = !req.files["profilePic"]
      ? null
      : req.files["profilePic"][0].filename;
    console.log(image);
    if (image) {
      req.body.image = image;
    } else {
      req.body.image = req.body.old_image;
    }

    let updateUserDetails = await loginTypeModel.updateUserDetails(
      req.body.userName,
      req.body.id
    );
    if (updateUserDetails) {
      return res.status(200).send({
        success: true,
        msg: "User updated successfully",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.getUserListById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getUserListById = await loginTypeModel.getUserListById(req.body.id);
    if (getUserListById.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "User list",
        data: getUserListById[0],
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "User list not found",
      });
    }
  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.verifiedUserById = async (req, res) => {
  try {
    let userInfo = await loginTypeModel.getUserTeacherInfoById(req.body.id)

    let verifiedUserById = loginTypeModel.isVerifiedUserById(
      req.body.isVerified,
      req.body.reason,
      req.body.id,
    );
    console.log(verifiedUserById)
    if (req.body.isVerified == 2) {
      let mailmsg =
        `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
        <p style="text-align: center"> Dear ${userInfo[0].userName}, </p>
        <p style="text-align: center">Your ID is rejected for the reason: ${req.body.reason},</p> 
        <p style="text-align: center">Please resubmit your ID from the app for verification. </p>
    </div>
    `;
      await emailActivity.Activity(
        userInfo[0].email,
        'Your Digital ID is rejected by Admin.',
        mailmsg,
      );
    }
    if (verifiedUserById) {
      return res.status(200).send({
        success: true,
        msg: "Success",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "User not verified",
      });
    }

  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let checkUserName = await loginTypeModel.checkUserName(req.body.userName);
    if(checkUserName.length > 0){
      return res.status(200).send({
        success: false,
        msg: "Username already register! Please try with new username",
      });
    }

    let getUserDataBySuperAdmin = await loginTypeModel.getUserDataBySuperAdmin(
      req.body.email
    );

    if (getUserDataBySuperAdmin.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Email is already register! Please try with new email",
      });
    } else {
      const Token = jwt.sign(
        {
          email: req.body.email,
        },
        config.JWT_SECRET_KEY,
        {
          expiresIn: config.SESSION_EXPIRES_IN,
        }
      );

      const hash = CryptoJS.SHA256(req.body.password).toString(
        CryptoJS.enc.Hex
      );

      let users = {
        userName: req.body.userName,
        dateOfBirth: req.body.dateOfBirth,
        countryCodeId: req.body.countryCodeId,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        password: hash,
        loginType: req.body.loginType,
      };

      let saveUserBySuperAdmin = await loginTypeModel.saveUserBySuperAdmin(
        users,
        req.admin_id
      );

      if (saveUserBySuperAdmin) {
        await loginTypeModel.InsertActivity({
          user_id: saveUserBySuperAdmin.insertId,
          activity_type: "Register",
          ip: requestIp.getClientIp(req),
        });
        return res.status(200).send({
          success: true,
          msg: "Success",
          data: {
            token: Token,
          },
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Not able to register! Please check",
        });
      }
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let checkUser = await loginTypeModel.checkUser(req.body.id);

    if (checkUser.length > 0) {
      let user = {
        id: req.body.id,
        userName: req.body.userName,
        loginType: req.body.loginType
      };

      let updateAdmin = await loginTypeModel.updateUser(user, req.admin_id);
      if (updateAdmin) {
        return res.status(200).send({
          success: true,
          msg: "User data updated",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Unable to updated",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getReferralListByUser = async (req, res) => {
  try {
    let getReferralListByUser = await loginTypeModel.getReferralListByUser(
      req.body.userId
    );
    if (getReferralListByUser.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Referral list",
        data: getReferralListByUser,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.getEventsParticipantsByUser = async (req, res) => {
  try {
    let getEventsParticipantsByUser =
      await loginTypeModel.getEventsParticipantsByUser(req.body.userId);
    if (getEventsParticipantsByUser.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Events participants details for user",
        data: getEventsParticipantsByUser,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found for event participant details",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.getTeacherFeedBack = async (req, res) => {
  try {
    let getTeacherFeedBack = await loginTypeModel.getTeacherFeedBack();
    if (getTeacherFeedBack.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Feedback from teacher",
        data: getTeacherFeedBack,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.getVendorFeedBack = async (req, res) => {
  try {
    let getVendorFeedBack = await loginTypeModel.getVendorFeedBack();
    if (getVendorFeedBack.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Feedback from teacher",
        data: getVendorFeedBack,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};


exports.getCountryCode = async (req, res) => {
  try {
    let getCode = await loginTypeModel.getCountryCode();
    if (getCode.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Code list",
        data: getCode,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};
