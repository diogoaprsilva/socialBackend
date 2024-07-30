const UserModel = require("../models/userModel");
const emailActivity = require("./emailActivity.controller");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config");
const CryptoJS = require("crypto-js");
const requestIp = require("request-ip");
var keySize = 256;
var iterations = 100;

exports.getOTPForLogin = async (req, res) => {
  try {
    let smsOTP = Math.floor(1000 + Math.random() * 9000);

    let emailOrMobile = req.body.emailormobile;
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    let isEmail = regexExp.test(emailOrMobile);
    let getUsersEmail = [];
    let checkemailOrMobileExist = [];

    if (isEmail) {
      getUsersEmail = await UserModel.checkUserRegister(emailOrMobile);
      checkemailOrMobileExist = await UserModel.checkemailExistForOTP(
        emailOrMobile
      );
    } else {
      getUsersEmail = await UserModel.checkUserRegisterMobile(emailOrMobile);
      checkemailOrMobileExist = await UserModel.checkmobileExistForOTP(
        emailOrMobile
      );
    }
    if (getUsersEmail.length > 0) {
      if (getUsersEmail[0].isBlock == 1) {
        return res.status(200).send({
          success: false,
          msg: "Your account is deactivated, Please contact to admin.",
        });
      }

      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
      if (getUsersEmail[0].password === hash) {
        if (isEmail) {
          let mailmsg = `
                    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                        <p> Dear, </p>
                        <p> OTP For Login : ${smsOTP} </p>        
                    </div>
                    `;
          await emailActivity.Activity(
            req.body.emailormobile,
            "OTP For Login",
            mailmsg
          );

          if (checkemailOrMobileExist.length > 0) {
            await UserModel.updateOTP({ email: emailOrMobile, otp: smsOTP });
          } else {
            await UserModel.insertOTP({ email: emailOrMobile, otp: smsOTP });
          }

          return res.status(200).send({
            success: true,
            otp: smsOTP,
            msg: "OTP sent successfully",
          });
        } else {
          // const smsResponse = await fetch(`http://sms.smsindori.com/http-tokenkeyapi.php?authentic-key=383063656e747572793130301688993328&senderid=IMRSMS&route=06&number=${req.body.emailormobile}&message=${smsOTP}%20is%20your%20Login%20otp%20for%20centurycoin%20IMRSMS&templateid=1207167594991592693`);

          if (checkemailOrMobileExist.length > 0) {
            await UserModel.updateOTPUsingMobile({
              mobileNumber: emailOrMobile,
              otp: smsOTP,
            });
          } else {
            await UserModel.insertOTPUsingMobile({
              mobileNumber: emailOrMobile,
              otp: smsOTP,
            });
          }

          return res.status(200).send({
            success: true,
            otp: smsOTP,
            msg: "OTP sent successfully",
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          msg: "Password does not match",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "User not found.",
      });
    }
  } catch (err) {
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again!!",
      err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // if (req.body.otp != req.body.serverOTP) {
    //   return res.status(200).send({
    //     success: false,
    //     msg: "OTP not valid please enter valid OTP",
    //   });
    // }

    let emailOrMobile = req.body.emailOrMobile;
    let countryCodeId = req.body.countryCodeId
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    let isEmail = regexExp.test(emailOrMobile);
    let getUsersEmail = [];
    let checkemailOrMobileExist = [];

    if (isEmail) {
      getUsersEmail = await UserModel.getUsersDetails(emailOrMobile);
      // checkemailOrMobileExist = await UserModel.checkemailExistForOTP(emailOrMobile);
    } else {
      getUsersEmail = await UserModel.checkUserRegisterMobile(emailOrMobile, countryCodeId);
      // checkemailOrMobileExist = await UserModel.checkmobileExistForOTP(emailOrMobile);
    }

    // if (checkemailOrMobileExist.length > 0) {
    //   if (req.body.otp != checkemailOrMobileExist[0].otp) {
    //     return res.status(200).send({
    //       success: false,
    //       msg: "OTP not valid please enter valid OTP",
    //     });
    //   }
    // } else {
    //   return res.status(200).send({
    //     success: false,
    //     msg: "OTP not valid please enter valid OTP",
    //   });
    // }

    if (getUsersEmail.length > 0) {
      if (getUsersEmail[0].isBlock == 1) {
        return res.status(200).send({
          success: false,
          msg: "Your account is deactivated, Please contact to admin.",
        });
      }
      if (getUsersEmail[0].isAccountDeleted == 1) {
        return res.status(200).send({
          success: false,
          msg: "User not found.",
        });
      }
      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
      if (getUsersEmail[0].password === hash) {
        const jwtToken = jwt.sign(
          {
            email: req.body.emailOrMobile,
            mobileNumber: req.body.mobileNumber,
            id: getUsersEmail[0].id,
            // 'bnb_address': getUsersEmail[0].bnb_address,
          },
          config.JWTSECRETKEYUSER,
          {
            expiresIn: config.SESSION_EXPIRES_IN,
          }
        );

        await UserModel.updateFCMToken(req.body.FCM_token, req.body.emailOrMobile);

        // Insert Activity
        await UserModel.insertActivity({
          user_id: getUsersEmail[0].id,
          activity_type: "Login",
          ip: requestIp.getClientIp(req),
        });

        getUsersEmail[0].jwtToken = jwtToken;

        // if (isEmail) {
        //   await UserModel.updateOTP({ email: emailOrMobile, otp: "" });
        // } else {
        //   await UserModel.updateOTPUsingMobile({
        //     mobileNumber: emailOrMobile,
        //     otp: "",
        //   });
        // }

        return res.status(200).send({
          success: true,
          msg: "Login Successful",
          data: getUsersEmail[0],
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Password does not match",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "User not found.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
      err,
    });
  }
};

exports.smartPinlogin = async (req, res) => {
  try {
    let data = req.body;
    const smartpinhash = CryptoJS.SHA256(data.smartPin).toString(
      CryptoJS.enc.Hex
    ); 

    let getUsersEmail = await UserModel.getUsersDetailsSmartPin(smartpinhash);
    if (getUsersEmail.length > 0) {
      if (getUsersEmail[0].status == 0) {
        return res.status(200).send({
          success: false,
          msg: "Your account is deactivated, Please contact to admin.",
        });
      }

      if (getUsersEmail[0].isAccountDeleted == 1) {
        return res.status(200).send({
          success: false,
          msg: "User not found.",
        });
      }

      const jwtToken = jwt.sign(
        {
          email: getUsersEmail[0].email,
          id: getUsersEmail[0].id,
          // 'bnb_address': getUsersEmail[0].bnb_address,
        },
        config.JWTSECRETKEYUSER,
        {
          expiresIn: config.SESSION_EXPIRES_IN,
        }
      );

       await UserModel.updateFCMToken(req.body.FCM_token, req.body.email)

      // Insert Activity
      await UserModel.insertActivity({
        user_id: getUsersEmail[0].id,
        activity_type: "Smart Pin Login",
        ip: requestIp.getClientIp(req),
      });

      getUsersEmail[0].jwtToken = jwtToken;

      // if (isEmail) {
      //     await UserModel.updateOTP({ 'email': emailOrMobile, 'otp': '' });
      // } else {
      //     await UserModel.updateOTPUsingMobile({ 'mobileNumber': emailOrMobile, 'otp': '' });
      // }

      return res.status(200).send({
        success: true,
        msg: "Login Successfully",
        data: getUsersEmail[0],
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Smart Pin does not match",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
      err,
    });
  }
};

async function encriptedKey(pvkey, hash) {
  var private_key = pvkey;

  var salt = CryptoJS.lib.WordArray.random(128 / 8);
  var pass = hash;

  var key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });

  var iv = CryptoJS.lib.WordArray.random(128 / 8);

  var encrypted = CryptoJS.AES.encrypt(private_key, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return (privateKey = salt.toString() + iv.toString() + encrypted.toString());
}

exports.ForgotPassword = async (req, res) => {
  try {
    let smsOTP = Math.floor(1000 + Math.random() * 9000);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let emailOrMobile = req.body.emailormobile;
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    let isEmail = regexExp.test(emailOrMobile);
    let getUsersEmail = [];
    if (isEmail) {
      getUsersEmail = await UserModel.checkUserRegister(emailOrMobile);
    } else {
      getUsersEmail = await UserModel.checkUserRegisterMobile(emailOrMobile);
    }
    if (getUsersEmail.length > 0) {
      if (getUsersEmail[0].isBlock == 1) {
        return res.status(200).send({
          success: false,
          msg: "Your account is deactivated, Please contact to admin.",
        });
      }
      if (isEmail) {
        let mailmsg = `
                <div style="font-family:Arial,sans-serif;font-size:15px;line-height:25px;text-align:left;color:#000">
                    <p> Dear User, </p>
                    <p> Use this OTP to Reset your Password : ${smsOTP} </p>        
                </div>
                `;
        await emailActivity.Activity(
          req.body.emailormobile,
          "OTP to Reset your Password",
          mailmsg
        );
        await UserModel.updateEmailForgotOTP(smsOTP, emailOrMobile);
        return res.status(200).send({
          success: true,
          otp: smsOTP,
          msg: "OTP sent successfully",
        });
      } else {
        // const smsResponse = await fetch(`http://sms.smsindori.com/http-tokenkeyapi.php?authentic-key=383063656e747572793130301688993328&senderid=IMRSMS&route=06&number=${req.body.emailormobile}&message=${smsOTP}%20is%20your%20Login%20otp%20for%20centurycoin%20IMRSMS&templateid=1207167594991592693`);
        await UserModel.updateMobileForgotOTP(smsOTP, emailOrMobile);

        return res.status(200).send({
          success: true,
          otp: smsOTP,
          msg: "OTP sent successfully",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "User not found.",
      });
    }
  } catch (err) {
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
    });
  }
};


exports.verifyForgotPassword = async (req, res) => {
  try {
    if (!req.body.otp) {
      return res.status(200).send({
        success: false,
        msg: "Please enter the OTP",
      });
    }


    let emailOrMobile = req.body.emailormobile;
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    let isEmail = regexExp.test(emailOrMobile);
    let getUsersEmail = [];

    if (isEmail) {
      getUsersEmail = await UserModel.checkUserRegister(emailOrMobile);
      if (getUsersEmail.length == 0) {
        return res.status(200).send({
          success: false,
          msg: "Email is not registered",
        });
      }
      if (getUsersEmail.length > 0 && req.body.otp != getUsersEmail[0].forgotOtp
      ) {
        return res.status(200).send({
          success: false,
          msg: "Entered OTP is not correct, Please enter correct OTP",
        });

      }
      return res.status(200).send({
        success: true,
        msg: "OTP verified.",
      });

    } else {
      getUsersEmail = await UserModel.checkUserRegisterMobile(emailOrMobile);
      if (getUsersEmail.length == 0) {
        return res.status(200).send({
          success: false,
          msg: "Mobile number is not registered",
        });
      }
      if (getUsersEmail.length > 0 && req.body.otp != getUsersEmail[0].forgotOtp) {
        return res.send(
          response(false, 200, "Entered OTP is not correct, Please enter correct OTP", {})
        );
      }
      return res.status(200).send({
        success: true,
        msg: "OTP verified.",
      });
    }
  } catch (err) {
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
    });
  }
};

exports.Resetpassword = async (req, res) => {
  try {
    // if (req.body.otp != req.body.serverOTP) {
    //   return res.status(200).send({
    //     success: false,
    //     msg: "OTP not valid please enter valid OTP",
    //   });
    // }

    const hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);

    let emailOrMobile = req.body.emailormobile;
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    let isEmail = regexExp.test(emailOrMobile);
    let getUsersEmail = [];

    if (isEmail) {
      getUsersEmail = await UserModel.checkUserRegister(emailOrMobile);
      if (getUsersEmail.length == 0) {
        return res.status(200).send({
          success: false,
          msg: "Email is not registered",
        });
      }
      if (getUsersEmail.length > 0 && req.body.otp != getUsersEmail[0].forgotOtp
      ) {
        return res.status(200).send({
          success: false,
          msg: "Entered OTP is not correct, Please enter correct OTP",
        });

      }
      await UserModel.updatePasswordByEmail(hash, emailOrMobile);
      return res.status(200).send({
        success: true,
        msg: "Your password changed successfully, You can login now.",
      });
    } else {
      getUsersEmail = await UserModel.checkUserRegisterMobile(emailOrMobile);
      if (getUsersEmail.length == 0) {
        return res.status(200).send({
          success: false,
          msg: "Mobile number is not registered",
        });
      }
      if (getUsersEmail.length > 0 && req.body.otp != getUsersEmail[0].forgotOtp) {
        return res.send(
          response(false, 200, "Entered OTP is not correct, Please enter correct OTP", {})
        );
      }
      await UserModel.updatePasswordByMobile(hash, emailOrMobile);
      return res.status(200).send({
        success: true,
        msg: "Your password changed successfully, You can login now.",
      });
    }
  } catch (err) {
    return res.status(200).send({
      success: false,
      msg: "Something went wrong please try again.",
    });
  }
};
