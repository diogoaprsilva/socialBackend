const pushNotificationsModels = require("../../models/adminModels/pushNotificationsModels");
const { validationResult } = require("express-validator");
const pushNotification = require('../adminControllers/pushnotification.controller')

exports.getPushNotificationsDetails = async (req, res) => {
  try {

    let getPushNotificationsDetails = await pushNotificationsModels.getPushNotificationsDetails();
    if (getPushNotificationsDetails.length > 0){
      return res.status(200).send({
        success: true,
        msg: "Push notifications data is avaiable",
        data: getPushNotificationsDetails
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong",
      });
    }
  } catch (error) {
    
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.insertPushNotifications = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let userId = req.admin_id;
    if(!userId) {
      userId = req.vendor_id;
    } 
   
      let insertPushNotifications =
        await pushNotificationsModels.insertPushNotifications(
          req.body.title,
          req.body.message,
          userId
        );

      if (insertPushNotifications) {
        await pushNotification.sendNotification(
          req.body.title,
          req.body.message
        );

        return res.status(200).send({
          success: true,
          msg: "Success",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong",
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
