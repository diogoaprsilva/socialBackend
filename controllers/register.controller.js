const UserModel = require("../models/userModel");
const emailActivity = require("./emailActivity.controller");
const { validationResult } = require("express-validator");

const QRCode = require("qrcode");
const speakeasy = require("speakeasy");
const config = require("../config");
const CryptoJS = require("crypto-js");
const requestIp = require("request-ip");
const stripe = require("stripe")(process.env.StripeKey);
var random = require("random-string-alphanumeric-generator");

exports.emailVerification = async (req, res) => {
  try {
    let getUsersEmail = await UserModel.getUsersDetails(req.body.email);
    let getUsersMobile = await UserModel.getUsersMobileDetails(req.body.mobileNumber);
    if (getUsersEmail.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Email is already registered! Try with different email.",
      });
    }

    if (getUsersMobile.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Mobile number is already registered! Try with different mobile number.",
      });
    }

    const smartpinhash = CryptoJS.SHA256(req.body.smartPin).toString(
      CryptoJS.enc.Hex
    );

    let getUsersdata = await UserModel.getUsersDetailsSmartPin(smartpinhash);
    if (getUsersdata.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Please set different pin",
      });
    }
    if (req.body.referBy) {
      referBy = req.body.referBy;
      let getRefUsersDetails = await UserModel.getUsersReferralCode(
        req.body.referBy
      );
      if (getRefUsersDetails.length == 0) {
        return res.status(200).send({
          success: false,
          msg: "Refferal code is not valid, please enter valid Code!!",
        });
      }
    }

    let emailOTP = Math.floor(1000 + Math.random() * 9000);
    let checkMobileExist = await UserModel.checkemailExistForOTP(req.body.email);

    // let checkemailExist = await UserModel.checkmobileExistForOTP(
    //   req.body.mobileNumber
    // );

    if (checkMobileExist.length > 0) {
      await UserModel.updateOTP({ email: req.body.email, otp: emailOTP });
      // await UserModel.updateOTPUsingMobile({
      //   mobileNumber: req.body.mobileNumber,
      //   otp: emailOTP,
      // });
    } else {
      await UserModel.insertOTP({ email: req.body.email, otp: emailOTP });
      // await UserModel.insertOTPUsingMobile({
      //   mobileNumber: req.body.mobileNumber,
      //   otp: emailOTP,
      // });
    }
    let mailmsg =
      `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
        <p style="text-align: center"> Dear ${req.body.userName}, </p>
        <p style="text-align: center"> Please use the verification code below on The socials app: </p>
        <h3 style="text-align: center">  ${emailOTP}  </h3>        
        <p style="text-align: center"> If you didn't request this, You can ignore this email.</p>
    </div>
    `;
    await emailActivity.Activity(
      req.body.email,
      "OTP for Registration",
      mailmsg
    );
    // const smsResponse = await fetch(`http://sms.smsindori.com/http-tokenkeyapi.php?authentic-key=383063656e747572793130301688993328&senderid=IMRSMS&route=06&number=${req.body.mobileNumber}&message=${smsOTP}%20is%20your%20Login%20otp%20for%20centurycoin%20IMRSMS&templateid=1207167594991592693`);
    return res.status(200).send({
      success: true,
      otp: emailOTP,
      msg: "OTP sent successfully!",
    });
  } catch (err) {
    console.log("err", err);
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again!!",
      err,
    });
  }
};

exports.smsVerification = async (req, res) => {
  try {
    let smsOTP = Math.floor(1000 + Math.random() * 9000);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let checkemailOrMobileExist = await UserModel.checkmobileExistForOTP(
      req.body.mobileNumber
    );

    if (checkemailOrMobileExist.length > 0) {
      await UserModel.updateOTPUsingMobile({
        mobileNumber: req.body.mobileNumber,
        otp: smsOTP,
      });
    } else {
      await UserModel.insertOTPUsingMobile({
        mobileNumber: req.body.mobileNumber,
        otp: smsOTP,
      });
    }

    if (smsOTP) {
      // const smsResponse = await fetch(`http://sms.smsindori.com/http-tokenkeyapi.php?authentic-key=383063656e747572793130301688993328&senderid=IMRSMS&route=06&number=${req.body.mobileNumber}&message=${smsOTP}%20is%20your%20Login%20otp%20for%20centurycoin%20IMRSMS&templateid=1207167594991592693`);
      return res.status(200).send({
        success: true,
        otp: smsOTP,
        msg: "OTP sent successfully!",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong please try again!",
      });
    }
  } catch (err) {
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again!",
      err,
    });
  }
};

exports.userRegister = async (req, res) => {
  try {
    let isEmailVerify = 1;
    let isSmsVerify = 1;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let emailOTP = req.body.emailOTP;

    if (!emailOTP) {
      return res.send(
        response(false, 200, "Email verification required!!", {})
      );
    }

    let checkemailExist = await UserModel.checkemailExistForOTP(req.body.email);
    // let checkMobileExist = await UserModel.checkmobileExistForOTP(
    //   req.body.mobileNumber
    // );
    if (checkemailExist.length > 0) {
      if (parseInt(req.body.emailOTP) != parseInt(checkemailExist[0].otp)) {
        return res.status(200).send({
          success: false,
          msg: "Entered OTP is not correct, Please enter correct OTP",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Entered OTP is not correct, Please enter correct OTP",
      });
    }

    // if (checkMobileExist.length > 0 && emailOTP != checkMobileExist[0].otp) {
    //   return res.status(200).send({
    //     success: false,
    //     msg: "Entered OTP is not correct, Please enter correct OTP",
    //   });
    // }

    let getUsersEmail = await UserModel.getUsersDetails(req.body.email);
    let getUsersMobile = await UserModel.getUsersMobileDetails(
      req.body.mobileNumber
    );

    // if(req.body.wallet_address){
    //     getUsersaddress = await UserModel.getUsersDetailsAddress(req.body.wallet_address);
    // }

    let referBy = "";
    let referralId = 0;
    if (req.body.referBy) {
      referBy = req.body.referBy;
      let getRefUsersDetails = await UserModel.getUsersReferralCode(
        req.body.referBy
      );
      if (getRefUsersDetails.length == 0) {
        return res.status(200).send({
          success: false,
          msg: "Refferal code is not valid, please enter valid Code!!",
        });
      }

      referralId = getRefUsersDetails[0].id;
      let getRefUsersCount = await UserModel.getReferralUsersCount(referralId);
      let refCount = parseInt(getRefUsersCount[0].referralCount) + 1;
      if (getRefUsersCount.length > 0 && refCount == 5) {
        let users = {
          userId: referralId,
          cardId: null,
          cardNumber: null,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
          amount: 24,
          type: 1,
          receiptUrl: null,
          stripePayementId: null,
        };

        await UserModel.insertSubscriptionPlan(users);
      }
    }

    let errMsg = "";
    if (getUsersEmail.length > 0 || getUsersMobile.length > 0) {
      if (
        getUsersEmail.length > 0 &&
        getUsersEmail[0].email == req.body.email
      ) {
        errMsg = "Email is already registered! Try with different email.";
      } else if (
        getUsersMobile.length > 0 &&
        req.body.mobileNumber == getUsersMobile[0].mobileNumber
      ) {
        errMsg =
          "Mobile number is already registered! Try with different mobile number.";
      }
      return res.status(200).send({
        success: false,
        msg: errMsg,
      });
    } else {

      let userDocument = !req.files["document"]
        ? null
        : req.files["document"][0].filename;


      let secret = speakeasy.generateSecret({ length: 20 });
      QRCode.toDataURL(secret.otpauth_url, async function (err, data_url) {
        const hash = CryptoJS.SHA256(req.body.password).toString(
          CryptoJS.enc.Hex
        );
        const smartpinhash = CryptoJS.SHA256(req.body.smartPin).toString(
          CryptoJS.enc.Hex
        );

        let referralCode = randomString(
          10,
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        );

        let dateString = req.body.dateOfBirth
        let [day, month, year] = dateString.split('/')
        let dob = `${year}-${month}-${day}`;

        let users = {
          userName: req.body.userName,
          mobileNumber: req.body.mobileNumber,
          dateOfBirth: dob,
          email: req.body.email,
          password: hash,
          smartPin: smartpinhash,
          googleAuthCode: secret.base32,
          QRCode: data_url,
          userDocument: userDocument,
          gender: req.body.gender,
          referralId: referralId,
          referBy: referBy, 
          referralCode: referralCode,
          isEmailVerify: isEmailVerify,
          isSmsVerify: isSmsVerify,
          signupBy: req.body.signupBy,
          countryCodeId: req.body.countryCodeId,
          loginType: 4,
          countryIsoCode: req.body.countryIsoCode
        };
        console.log(users);
        let saveUserDetails = await UserModel.saveUserDetails(users);

        if (saveUserDetails) {
          // refferal user token credited

          await UserModel.insertActivity({
            user_id: saveUserDetails,
            activity_type: "Register",
            ip: requestIp.getClientIp(req),
          });
          //   users.id = saveUserDetails
          return res.status(200).send({
            success: true,
            msg: "Registration successfully!!",
            //  data:users
          });
        } else {
          return res.status(200).send({
            success: false,
            msg: "Something went wrong please try again.",
          });
        }
      });
    }
  } catch (err) {
    return res.status(200).send({
      success: false,
      msg: "User not registered due to internal error",
      err,
    });
  }
};

function randomString(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

exports.singUpValidations = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let getUsersEmail = await UserModel.getUsersDetails(req.body.email);
    if (getUsersEmail[0]?.email.toLowerCase() == req.body.email.toLowerCase()) {
      return res.status(200).send({
        success: false,
        msg: "Email already registered",
      });
    }

    let getUsersMobile = await UserModel.getUsersMobileDetails(
      req.body.mobileNumber
    );

    if (parseInt(getUsersMobile[0]?.mobileNumber) == parseInt(req.body.mobileNumber)) {
      return res.status(200).send({
        success: false,
        msg: "Mobile number already registered",
      });
    }

    if (req.body.referralCode) {
      let referral = await UserModel.getUsersReferralCode(
        req.body.referralCode
      );
      if (referral.length == 0) {
        return res.status(400).send({
          success: false,
          msg: "Invalid referral code",
        });
      }
    }
    return res.status(200).send({
      success: true,
      msg: "Success",
    });
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "User not registered due to internal error",
      error,
    });
  }
};

exports.getReferralCode = async (req, res) => {
  try {
    let getReferralCode = await UserModel.getReferralCode(req.user_id);
    if (getReferralCode.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Referral Code",
        data: getReferralCode[0],
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
      msg: "something went wrong",
      error,
    });
  }
};

exports.buySubscription = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.user_id;

    let subscriptionPlanDetail =
      await UserModel.subscriptionPlanDetail(data);
    if (subscriptionPlanDetail.length == 0) {
      return res.status(200).send({
        success: false,
        msg: "No Subscription Plan Found",
      });
    }
    let checkSub = await UserModel.getSubscriptionPlan(userId);
    if (checkSub.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "You have already subscribed the plan!!",
      });
    } else {

      let user = {
        userId: userId,
        planId: subscriptionPlanDetail[0].id,
        amount: subscriptionPlanDetail[0].amount,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000),
        stripePayementId: data.stripePayementId,
        receiptUrl: data.receipt_url,
        type: 2,
      };
      let insert = await UserModel.insertSubscriptionPlan(user);

      if (insert) {
        return res.status(200).send({
          success: true,
          msg: "Plan Buy Successsfully!!",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "insertion Error!!",
        });
      }
    }
  } catch (err) {
    console.log({ err });
    return res.status(200).send({
      success: false,
      msg: "something went wrong",
      err,
    });
  }
};

exports.checkSubscription = async (req, res) => {
  try {
    let getSubscription = await UserModel.checkSubscription();
    if (getSubscription.length > 0) {
      await UserModel.updateSubscription();
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "something went wrong",
    });
  }
};

exports.insertSupportRequest = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.user_id;
    let user = {
      userId: userId,
      ticketNumber: random.randomLetters(8, "uppercase"),
      message: data.message,
    };
    let insert = await UserModel.insertSupportRequest(user);
    if (insert) {
      return res.status(200).send({
        success: true,
        msg: "Your Request Submit Successsfully!",
      });
    }
  } catch (err) {
    console.log({ err });
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
    });
  }
};

exports.getSupportRequest = async (req, res) => {
  try {
    let getSupportDetail = await UserModel.getSupportRequest(req.user_id);
    if (getSupportDetail.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Get Support list",
        data: getSupportDetail,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No Data Found !!",
      });
    }
  } catch (error) {
    console.log({ error });
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.insertChat = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.user_id;

    let user = {

      senderId: userId,
      receiverId: data.receiverId,
      message: data.message,
    };
    let insert = await UserModel.insertChat(user);
    if (insert) {
      return res.status(200).send({
        success: true,
        msg: "Message Sent Successsfully!!",
      });
    }
  } catch (err) {
    console.log({ err });
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
    });
  }
};

exports.getChat = async (req, res) => {
  try {
    let data = req.body;
    let getChatDetail = await UserModel.getChat(req.user_id);

    if (getChatDetail.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Get Chat list",
        data: getChatDetail,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No Data Found !!",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    let smsOTP = Math.floor(1000 + Math.random() * 9000);
    let getPropertyOwnerDetails = await loginModel.getPropertyOwnerDetails(
      req.body.mobileNumber
    );
    console.log(getPropertyOwnerDetails, "sdsadsad");
    let checkMobileExist = await registrationModel.checkmobileExistForOTP(
      req.body.mobileNumber
    );
    if (checkMobileExist.length > 0) {
      await registrationModel.updateOTPUsingMobile({
        mobileNumber: req.body.mobileNumber,
        otp: smsOTP,
      });
    } else {
      await registrationModel.insertOTPUsingMobile({
        mobileNumber: req.body.mobileNumber,
        otp: smsOTP,
      });
    }

    if (smsOTP) {
      // await fetch(`http://sms.smsindori.com/http-tokenkeyapi.php?authentic-key=383063656e747572793130301688993328&senderid=IMRSMS&route=06&number=${req.body.mobileNumber}&message=${smsOTP}%20is%20your%20Login%20otp%20for%20centurycoin%20IMRSMS&templateid=1207167594991592693`);
      let notify = {
        userId: getPropertyOwnerDetails[0].id,
        message: "Resend OTP sent successfully",
      };
      await registrationModel.insertNotication(notify);
      return res.send(
        response(false, 200, "OTP sent successfully", { otp: smsOTP })
      );
    } else {
      return res.send(
        response(
          false,
          200,
          "Something went wrong please try again after some time"
        )
      );
    }
  } catch (error) {
    console.log(error);
    return res.send(
      response(
        false,
        400,
        "Something went wrong please try again after some time"
      )
    );
  }
};

exports.updateDocument = async (req, res) => {
  try {


    let userDocument = !req.files["document"]
      ? null
      : req.files["document"][0].filename;

    let updateDocument = await UserModel.updateDocument(
      userDocument,
      req.user_id
    );
    if (updateDocument) {
      return res.status(200).send({
        success: true,
        msg: "Document updated successfully",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Unable to updated document",
      });
    }

  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: "Internal Server Srror",
    });
  }
};


