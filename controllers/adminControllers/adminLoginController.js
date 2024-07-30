const adminModel = require("../../models/adminModels/adminModels");
const { validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const requestIp = require("request-ip");

exports.adminLogin = async (req, res) => {
  try {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getAdminDetails = await adminModel.getAdminDetails(req.body);
   
  
    if ( getAdminDetails.length > 0 ) {
      if(getAdminDetails[0].isBlock == 1){
        return res.status(200).send({ success: false, msg: "Your account is blocked. Please contact to admin"});
      }
      
      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);

      if (getAdminDetails[0].password == hash) {
        const jwtToken = jwt.sign(
          {
            email: req.body.email,
            id: getAdminDetails[0].id,
            role: "cpadmin",
          },
          config.JWT_SECRET_KEY,
          {
            expiresIn: config.SESSION_EXPIRES_IN,
          }
        );

        //Insert activity

        await adminModel.adminInsertActivity({
          user_id: getAdminDetails[0].id,
          activity_type: "Admin login",
          ip: requestIp.getClientIp(req),
        });

        return res.status(200).send({
          success: true,
          msg: "Login successfully",
          data: {
            adminEmail: getAdminDetails[0].email,
            token: jwtToken,
            loginType: getAdminDetails[0].loginType,
            adminId: getAdminDetails[0].id
            
          },
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
        msg: "Invalid credentials",
      });
    }
  } catch (error) {
   
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.adminChangePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

   
    let getAdminInfo = await adminModel.getAdminInfo(req.body.email);

    if (getAdminInfo.length > 0) {
   

      let currentPassword = CryptoJS.SHA256(req.body.currentPassword).toString(
        CryptoJS.enc.Hex
      );

      if (currentPassword == getAdminInfo[0].password) {
        let newPassword = CryptoJS.SHA256(req.body.newPassword).toString(
          CryptoJS.enc.Hex
        );

        let confirm = CryptoJS.SHA256(
          req.body.confirmPassword
        ).toString(CryptoJS.enc.Hex);

        if (newPassword == confirm) {
          let response = await adminModel.adminUpdatePassword(
            newPassword,
            req.body.email
          );

          if (response) {
            return res.status(200).send({
              success: true,
              msg: "Password updated successfully",
            });
          } else {
            return res.status(200).send({
              success: false,
              msg: "Password updated failed",
            });
          }
        } else {
          return res.status(200).send({
            success: false,
            msg: "New password and confirm password does not match",
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          msg: "Old password is wrong",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Invalid user! Please check user credetails",
      });
    }
  } catch (error) {
    
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.updateProfilePic = async (req, res) => {
  try {

   
    let profilePic = !req.files["profilePic"]
      ? null
      : req.files["profilePic"][0].filename;
    if (profilePic) {
      req.body.profilePic = profilePic;
    } else {
      req.body.profilePic = req.body.old_profilePic;
    }


    let getAdminInfo = await adminModel.getAdminInfo(req.body.email);
   
    if (getAdminInfo.length > 0) {
      let updateProfilePic = await adminModel.updateProfilePic(
        req.body.profilePic,
        getAdminInfo[0].email
      );
      if (updateProfilePic) {
        return res.status(200).send({
          success: true,
          msg: "Profile pic updated",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Unable to updated profile pic",
        });
      }
    } else {
      
      return res.status(200).send({
        success: false,
        msg: "Invalid user",
      });
    }
  } catch (error) {
    
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.getAdminProfilePic = async(req, res) => {
  try {

    let getAdminInfo = await adminModel.getAdminInfo(req.body.email)
    if(getAdminInfo.length > 0) {
      let getAdminProfilePic = await adminModel.getAdminProfilePIc(req.body.email)
      if(getAdminProfilePic) {
        return res.status(200).send({
          success: true,
          msg: "Profile pic",
          data: getAdminProfilePic[0]
        })
      } else {
        return res.status(200).send({
          success: false,
          msg: "Profile pic error"
        })
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Invalid user"
      })
    }

    
  } catch (error) {
   
    return res.status(200).send({
      success: false,
      msg: error.message
    })
  }
}



exports.getAdminData = async(req, res) => {
  try {
    
    let getAdminData = await adminModel.getAdminInfo()
    if(getAdminData.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Details of admin",
        data: getAdminData[0]
      })
    } else {
      return res.status(200).send({
        success: false,
        msg: "Admin data not found",
      })
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg : error.message
    })
  }
}

exports.getUserListById = async(req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getUserListById = await adminModel.getUserListById(req.body.id)
    if(getUserListById.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "List of user",
        data: getUserListById[0]
      })
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found"
      })
    }
    
  } catch (error) {
    
    return res.status(200).send({
      success: false,
      msg: error.message
    })
  }
}

exports.getSuperAdminList = async(req, res) => {
  try {

    let getSuperAdminList = await adminModel.getSuperAdminList()
    if(getSuperAdminList.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "List of super admin list",
        data: getSuperAdminList
      })
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found"
      })
    }
    
  } catch (error) {
    
    return res.status(200).send({
      success: false,
      msg: "Internal server error"
    })
  }
}

exports.userBlockByAdmin = async(req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
   
    let userBlockByAdmin = await adminModel.userBlockByAdmin(req.body.id);
    if(userBlockByAdmin) {
      return res.status(200).send({
        success: true,
        msg: "success"
      })
    } else {
      return res.status(200).send({
        success: false,
        msg: "Invalid user unable to block"
      })
    } 
  

  } catch (error) {
    
    return res.status(200).send({
      success: false,
      msg: "Internal server error"
    })
  }
}

exports.updateIsOfferFree = async(req, res) => {
  try {
  console.log(req.body)
    let update = await adminModel.updateIsOfferFree(req.body.id);
    await adminModel.updateAllOfferToFree(req.body.status, req.body.id)
    if(update) {
      return res.status(200).send({
        success: true,
        msg: "success"
      })
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong Please try again"
      })
    } 
  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: "Internal server error"
    })
  }
}