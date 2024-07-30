const vendorModel = require("../../models/vendorModels/vendorLoginModels");
const { validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const requestIp = require("request-ip");

exports.vendorLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getVendorDetails = await vendorModel.getVendorDetails(req.body.email);
    console.log(getVendorDetails)
    // if(getVendorDetails[0].isBlock == 1){
    //   console.log(getVendorDetails)
    //   return res.status(200).send({ success: false, msg: "Your account is blocked. Please contact to admin"});
    // }
    
    if (getVendorDetails.length > 0) {
      if(getVendorDetails[0].isBlock == 1){
        console.log(getVendorDetails)
        return res.status(200).send({ success: false, msg: "Your account is blocked. Please contact to admin"});
      }
      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);

      if (getVendorDetails[0].password == hash) {
        const jwtToken = jwt.sign(
          {
            email: req.body.email,
            id: getVendorDetails[0].id,
            role: "vendor",
          },
          config.JWTSECRETKEYVENDORE,
          {
            expiresIn: config.SESSION_EXPIRES_IN,
          }
        );

        await vendorModel.vendorInsertActivity({
          user_id: getVendorDetails[0].id,
          activity_type: "Vendor login",
          ip: requestIp.getClientIp(req),
        });

        return res.status(200).send({
          success: true,
          msg: "Login successfully",
          data: {
            vendorEmail: getVendorDetails[0].email,
            userName: getVendorDetails[0].userName,
            token: jwtToken,
            loginType: getVendorDetails[0].loginType,
            vendorId: getVendorDetails[0].id,
          },
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "password does not match",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getVendorProfilePic = async (req, res) => {
  try {
    let getVendorProfilePic = await vendorModel.getVendorProfilePIc(
      req.body.email
    );
    if (getVendorProfilePic.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Vendor details and profile pic",
        data: getVendorProfilePic[0],
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

exports.vendorChangePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getVendorDetails = await vendorModel.getVendorDetails(req.body.email);
    if (getVendorDetails.length > 0) {
      let currentPassword = CryptoJS.SHA256(req.body.currentPassword).toString(
        CryptoJS.enc.Hex
      );

      if (currentPassword == getVendorDetails[0].password) {
        let newPassword = CryptoJS.SHA256(req.body.newPassword).toString(
          CryptoJS.enc.Hex
        );

        let confirmPassword = CryptoJS.SHA256(
          req.body.confirmPassword
        ).toString(CryptoJS.enc.Hex);

        if (newPassword == confirmPassword) {
          let response = await vendorModel.updateVendorPassword(
            newPassword,
            req.body.email
          );

          if (response) {
            return res.status(200).send({
              success: true,
              msg: "Password update successfully",
            });
          } else {
            return res.status(200).send({
              success: false,
              msg: "Password update failed",
            });
          }
        } else {
          return res.status(200).send({
            success: false,
            msg: "New password and confirm password",
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          msg: "Current password and old password does not match",
        });
      }
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.updateVendorProfile = async (req, res) => {
  try {

    let profilePic = !req.files["profilePic"]
      ? null
      : req.files["profilePic"][0].filename;
    if (profilePic) {
      req.body.profilePic = profilePic;
    } else {
      req.body.profilePic = req.body.old_profilePic;
    }

    let userId = req.vendor_id

    let getVendorProfiledetails = await vendorModel.getVendorProfileByUserId(userId);
    if(getVendorProfiledetails.length > 0) {
      let updateVendorProfile = await vendorModel.updateVendorProfile(
        req.body.userName,
        req.body.mobileNumber,
        req.body.profilePic,
        userId);
      if(updateVendorProfile) {
        return res.status(200).send({
          success: true,
          msg: "Vendor profile updated successfully"
        })
      } else {
        return res.status(200).send({
          success: false,
          msg: "Error while updating vendor profile"
        })
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Vendor profile not found"
      })
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};
