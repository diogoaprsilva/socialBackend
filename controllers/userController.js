const userModel = require('../models/userModel');
const emailActivity = require('./emailActivity.controller');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const config = require('../config')
const requestIp = require('request-ip');
const QRCode = require('qrcode');
const speakeasy = require("speakeasy");

exports.updateFCMToken = async (req, res) => {
    try {
        let updateFCM = await userModel.updateFCMTokenByUserId(req.body.FCM_token, req.user_id)
        if (updateFCM) {
            return res.status(200).send({
                success: true,
                msg: 'FCM_token updated!'
            })
        } else {
            return res.status(400).send({
                success: true,
                msg: 'Something went wrong please try again'
            })
        }

    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
}


exports.googleLogin = async (req, res) => {
    try {
        let data = req.body;
        let checkUser = await userModel.getUsersDetails(data.email);
        if (checkUser.length > 0) {
            const jwtToken = jwt.sign(
                {
                    email: checkUser[0].email,
                    id: checkUser[0].id,
                },
                process.env.JWTSECRETKEY
            );
            let userDetail = {
                userName: checkUser[0].userName,
                mobileNumber: checkUser[0].mobileNumber,
                email: checkUser[0].email,
                profilePic: checkUser[0].profilePic,
                passport: checkUser[0].passport,
            };
            return res.status(200).send({
                success: true,
                msg: "Login Successful",
                jwt: jwtToken,
                data: userDetail,
            });
        } else {
            let secret = speakeasy.generateSecret({ length: 20 });
            QRCode.toDataURL(secret.otpauth_url, async function (err, data_url) {

                let referralCode = randomString(
                    10,
                    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                );


                let user = {
                    "userName": req.body.userName,
                    "mobileNumber": req.body.mobileNumber,
                    "dateOfBirth": null,
                    "email": data.email,
                    "password": null,
                    "smartPin": null,
                    "googleAuthCode": secret.base32,
                    "QRCode": data_url,
                    "userDocument": null,
                    "gender": null,
                    "referralId": null,
                    "referBy": null,
                    "referralCode": referralCode,
                    "isEmailVerify": 1,
                    "isSmsVerify": 1,
                    "signupBy": 2,
                    "loginType": 4
                }


                let insert = await userModel.saveUserDetails(user);
                if (insert) {
                    const jwtToken = jwt.sign(
                        {
                            email: data.email,
                            id: insert.insertId,
                        },
                        process.env.JWTSECRETKEY
                    );
                    return res.status(200).send({
                        success: true,
                        msg: "Login Successsfully!!",
                        jwt: jwtToken,
                        data: user,
                    });

                }
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};


function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


exports.checkUserOldPassword = async (req, res) => {
    try {

        const oldHashPassword = CryptoJS.SHA256(req.body.oldPassword).toString(CryptoJS.enc.Hex);
        let checkUserOldPassword = await userModel.checkUserOldPassword(oldHashPassword, req.user_id)
        if (checkUserOldPassword.length == 0) {
            return res.status(200).send({
                success: false,
                msg: 'Please enter valid old Password'
            })
        } else {
            return res.status(200).send({
                success: true,
                msg: 'verified password'
            })
        }

    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
}


exports.changeUserPassword = async (req, res) => {
    try {

        const oldHashPassword = CryptoJS.SHA256(req.body.oldPassword).toString(CryptoJS.enc.Hex);
        let checkUserOldPassword = await userModel.checkUserOldPassword(oldHashPassword, req.user_id)
        if (checkUserOldPassword.length == 0) {
            return res.status(200).send({
                success: false,
                msg: 'Please enter valid old Password'
            })
        }
        const newHashPassword = CryptoJS.SHA256(req.body.newPassword).toString(CryptoJS.enc.Hex);
        await userModel.updateUserNewPassword(newHashPassword, req.user_id)
        return res.status(200).send({
            success: true,
            msg: 'Password changed successfully'
        })
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        let getUserDetails = await userModel.getUsersDetailsById(req.user_id);
        if (getUserDetails.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Get user details",
                data: getUserDetails[0]
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No data found"
            });
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
}

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


exports.UpdateUserProfile = async (req, res) => {
    try {
        let profile_pic = (!req.files['profilePic']) ? null : req.files['profilePic'][0].filename;
        if (profile_pic) {
            req.body.profilePic = profile_pic;
        } else {
            req.body.profilePic = req.body.old_profile_pic;
        }

        let getUserDetails = await userModel.getUsersDetailsById(req.user_id);

        let errors = await userModel.checkUserEmailAndMobile(req.body, req.user_id)
        if (Object.keys(errors).length > 0) {
            return res.status(200).send({
                success: true,
                msg: errors.msg,
                data: {}
            });
        }

        if (!isValidDateFormat(req.body.dateOfBirth)) {
            return res.send({ success: false, msg: "Please enter a valid date format (dd/mm/yyyy)" });
        }
        
        if (!isValidDate(req.body.dateOfBirth)) {
            return res.send({ success: false, msg: "Please enter a valid date of birth" });
        }
        
        const age = calculateAge(req.body.dateOfBirth);
        if (age < 17) {
            return res.send({ success: false, msg: "You must be at least 17 years old to register" });
        }
        
        if (age > 200) {
            return res.send({ success: false, msg: "Please enter a valid date of birth" });
        }
        
        let dateString = req.body.dateOfBirth.toString();
        let [day, month, year] = dateString.split('/');
        let dob = `${year}-${month}-${day}`;
        
        console.log(req.body.dateOfBirth)
        

        let newData = {
            userName: req.body.userName ? req.body.userName : getUserDetails[0].userName,
            gender: req.body.gender ? req.body.gender : getUserDetails[0].gender,
            dateOfBirth: dob ? dob : getUserDetails[0].dateOfBirth,
            email: req.body.email ? req.body.email : getUserDetails[0].email,
            countryCodeId: req.body.countryCodeId ? req.body.countryCodeId : getUserDetails[0].countryCodeId,
            countryIsoCode: req.body.countryIsoCode ? req.body.countryIsoCode : getUserDetails[0].countryIsoCode,
            mobileNumber: req.body.mobileNumber ? req.body.mobileNumber : getUserDetails[0].mobileNumber,
            profilePic: profile_pic ? profile_pic : getUserDetails[0].profilePic
        }

        let updateProfile = await userModel.updateProfile(newData, req.user_id);
        if (updateProfile) {
            let getUserDetails = await userModel.getUsersDetailsById(req.user_id);

            // Insert Activity
            await userModel.insertActivity({
                "user_id": req.user_id,
                "activity_type": 'Profile Update',
                "ip": requestIp.getClientIp(req)
            });
            return res.status(200).send({
                success: true,
                msg: "Profile updated!",
                data: getUserDetails[0]
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No data found"
            });
        }
    } catch (error) {
        console.log(error.message)
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
}

exports.getReferralUsersList = async (req, res) => {
    try {
        let getReferralUsersList = await userModel.getReferralUsersList(req.user_id);
        if (getReferralUsersList.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Referral Users List !!!",
                data: getReferralUsersList
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No data found"
            });
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};


exports.getUserOfferList = async (req, res) => {
    try {
        let getofferList = await userModel.getUserOfferList(req.user_id);
        if (getofferList.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Users offer List !!!",
                data: getofferList
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No data found"
            });
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};


exports.getPlanList = async (req, res) => {
    try {
        let getPlanList = await userModel.getPlanList(req.user_id);
        if (getPlanList.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Users Plan List !!!",
                data: getPlanList
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No data found"
            });
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};

exports.getReferralDetail = async (req, res) => {
    try {
        let getReferralDetail = await userModel.getReferralDetail(req.user_id);
        if (getReferralDetail.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Referral Detail !!!",
                data: getReferralDetail[0]
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No data found"
            });
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};


exports.getAllEventsDetail = async (req, res) => {
    try {
        let data = req.body;
        let newData = '1'
        if (data.type == 1) {
            newData = `date_format(datetime,'%Y-%m-%d')=CURDATE()`
        }
        let getEventsData = await userModel.getAllEventsDetail(newData, data.type);
        if (getEventsData.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Events details is available",
                data: getEventsData,
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found",
            });
        }
    } catch (error) {
        console.log(error.message)
        return res.status(200).send({
            success: false,
            msg: "Internal server error",
        });
    }
};

exports.accountDelete = async (req, res) => {
    try {
        let isAccountDeleted = await userModel.accountDelete(req.user_id);
        if (isAccountDeleted) {
            return res.status(200).send({
                success: true,
                msg: "Account deleted successfully",
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong please try again",
            });
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "Internal server error",
        });
    }
};


exports.countryCodeList = async (req, res) => {
    try {
        let countryCodeList = await userModel.countryCodeList();
        if (countryCodeList.length > 0) {

            return res.status(200).send({
                success: true,
                msg: "Contry Code List",
                data: countryCodeList
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No data found"
            });
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};