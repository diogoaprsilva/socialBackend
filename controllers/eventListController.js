const eventListModel = require("../models/eventListModel");
const eventModel = require("../models/adminModels/eventsModel");
const UserModel = require("../models/userModel");
const config = require("../config");

exports.getEventListDetails = async (req, res) => {
  try {
    let getEventListDetails = await eventListModel.getEventListData();
    if (getEventListDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "List event",
        data: getEventListDetails,
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

exports.eventParticipation = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.user_id;
    let getEventListDetails = await eventModel.getEventsDataById(data.eventId, req.user_id);

    if (getEventListDetails.length > 0 && getEventListDetails[0].status == 1) {
      //0
      let getEventCheck = await eventListModel.getEventListCheck(req.user_id, data.eventId);
      if (getEventCheck.length > 0) {
        return res.status(200).send({
          success: true,
          msg: "Event Already Joined",
        });
      } else {

        let newData = {
          userId: req.user_id,
          eventId: data.eventId,
          amount: getEventListDetails[0].eventPrice,
          stripePayementId: data.stripePayementId,
          status: 1,
          type: 0
        };
        let insertEvent = await eventListModel.insertEventParticipation(
          newData
        );

        return res.status(200).send({
          success: false,
          msg: "Congratulations you have successfully joined Event !!",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "No Event Available ",
      });
    }
  } catch (error) {
    console.log('eeeee', error);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};


exports.updateReceipt = async (req, res) => {
  try {
    let userId = req.user_id;
    let data = req.body;
    let getEventCheck = await eventListModel.getEventListCheck(
      userId,
      data.eventId
    );
    if (getEventCheck.length > 0) {
      let eventRecipt = !req.files["eventRecipt"]
        ? null
        : req.files["eventRecipt"][0].filename;

      let newData = {
        userId: userId,
        eventId: eventId,
        receipt: eventRecipt,
      };

      let getEventCheck = await eventListModel.updateEventRecipt(newData);
    }
    if (getEventCheck) {
      return res.status(200).send({
        success: true,
        msg: "receipt updated successfully",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "updation failed",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.ThirdPartyEvent = async (req, res) => {
  try {
    let userId = req.user_id;
    let data = req.body;
    let getEventCheck = await eventListModel.getEventListCheck(
      userId,
      data.eventId
    );
    if (getEventCheck.length > 0) {
      let newData = {
        userId: req.user_id,
        eventId: data.eventId,
        cardNumber: data.cardNumber,
        amount: data.amount,
        type: 1
      };
      let insertEvent = await eventListModel.insertEventParticipation(newData);
      if (insertEvent) {
        return res.status(200).send({
          success: false,
          msg: "Congratulations you have successfully joined Event !!",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "insertion failed",
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


exports.getPushNotificationsList = async (req, res) => {
  try {
    let getPushNotificationsDetails = await eventListModel.getPushNotificationsDetails();

    if (getPushNotificationsDetails && getPushNotificationsDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Success",
        data: getPushNotificationsDetails
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No push notifications found",
      });
    }

  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};