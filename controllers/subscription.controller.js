const UserModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const config = require("../config")
const stripe = require("stripe")('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');
const eventListModel = require("../models/eventListModel");

const eventModel = require("../models/adminModels/eventsModel");



exports.paymentIntent = async (req, res) => {
  try {
    let data = req.body;
    let checkSub = await UserModel.getSubscriptionPlan(req.user_id);
    if (checkSub?.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "You have already subscribed the plan!!",
      });
    }

    let subscriptionPlanDetail =
      await UserModel.subscriptionPlanDetail(data);
    if (subscriptionPlanDetail?.length == 0) {
      return res.status(200).send({
        success: false,
        msg: "No Subscription Plan Found",
      });
    }

    let getUserDetails = await UserModel.getUsersDetailsById(req.user_id);


    const paymentIntent = await stripe.paymentIntents.create({
      shipping: {
        name: getUserDetails[0].userName,
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      amount: subscriptionPlanDetail[0].amount * 100,
      currency: "aed",
      description: "Hello test"
      // payment_method: 'pm_card_visa',
    });
    let newAmount = (subscriptionPlanDetail[0].amount).toString();
    let client_secret = Buffer.from(paymentIntent.client_secret).toString('base64');
    let authToken = Buffer.from(req.headers['authorization']).toString('base64');
    let planId = Buffer.from(data.subscriptionId).toString('base64');
    let amount = Buffer.from(newAmount).toString('base64');
    let eventId = Buffer.from('').toString('base64');

    let url = config.paymentUrl + `?secret=` + client_secret + `&amount=` + amount + `&eventId=` + eventId + `&planId=` + planId + `&authToken=` + authToken + ``;

    return res.status(200).send({
      success: true,
      msg: "Payment Intented!",
      payment_url: url,
    });
  } catch (err) {
    console.log(err)
    return res.status(200).send({
      success: false,
      msg: "Stripe payment error!",
      error: err,
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
     // if (data.stripeResponse) {
        let user = {
          userId: userId,
          planId: 1,
          amount: data.amount ? data.amount : subscriptionPlanDetail[0].amount,
          startTime: new Date(),
          // endTime: new Date(new Date().getTime() + 90  24  60  60  1000),
          endTime: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
          stripePayementId: data.stripe_trx_id,
          receiptUrl: data.receipt_url,
         // stripeResponse: JSON.stringify(data.stripeResponse),
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
      // } else {
      //   return res.status(200).send({
      //     success: false,
      //     msg: "something went wrong"
      //   });
      // }
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


exports.paymentIntentForEvent = async (req, res) => {
  try {
    let data = req.body;
    let getEventListDetails = await eventModel.getEventsDataById(data.eventId, req.user_id);
    if (getEventListDetails.length == 0) {

      return res.status(200).send({
        success: false,
        msg: "No Event Found!!",
      });
    }

    let getEventCheck = await eventListModel.getEventListCheck(req.user_id, data.eventId);
    if (getEventCheck.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Event Already Joined",
      });
    }

    if (parseFloat(getEventListDetails[0].eventPrice) == 0) {
      let newData = {
        userId: req.user_id,
        eventId: data.eventId,
        amount: 0,
        status: 1,
        type: 0
      };
      let insertEvent = await eventListModel.insertEventParticipation(
        newData
      );
      if (insertEvent) {
        return res.status(200).send({
          success: true,
          msg: "Congratulations you have successfully joined Event !!",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong, Please try again!",
        });
      }
    } else {
      let getUserDetails = await UserModel.getUsersDetailsById(req.user_id);
      const paymentIntent = await stripe.paymentIntents.create({
        shipping: {
          name: getUserDetails[0].userName,
          address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
          },
        },
        amount: getEventListDetails[0].eventPrice * 100,
        currency: "aed",
        description: "Hello Event Payment"
        // payment_method: 'pm_card_visa',
      });
      let newAmount = (getEventListDetails[0].eventPrice).toString();
      let client_secret = Buffer.from(paymentIntent.client_secret).toString('base64');
      let authToken = Buffer.from(req.headers['authorization']).toString('base64');
      let eventId = Buffer.from(data.eventId).toString('base64');
      let amount = Buffer.from(newAmount).toString('base64');
      let planId = Buffer.from('').toString('base64');
      let url = config.paymentUrl + `?secret=` + client_secret + `&amount=` + amount + `&planId=` + planId + `&eventId=` + eventId + `&authToken=` + authToken + ``;

      return res.status(200).send({
        success: true,
        msg: "Payment Intented For Event!",
        payment_url: url,
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(200).send({
      success: false,
      msg: "Stripe payment error!",
      error: err,
    });
  }
};

exports.getSubsubscriptionDetail = async (req, res) => {
  try {

    let getSubData = await UserModel.getUserSubscriptionDetail(req.user_id);
    if (getSubData.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Subsubscription details ",
        data: getSubData[0],
      });
    } else {
      let getSubData = await UserModel.getplanData();
      return res.status(200).send({
        success: true,
        msg: "No Data Found",
        data: getSubData[0],
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message })
  }
};

exports.paymentHistory = async (req, res) => {
  try {
    let paymentHistory = await UserModel.paymentHistory(req.user_id, req.body.type);
    if (paymentHistory.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Payment History",
        data: paymentHistory,
      });
    } else {
      return res.status(200).send({
        success: true,
        msg: "No Data Found",
        data: []
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, msg: error.message })
  }
};

exports.checkIsPlanSubscribe = async(req, res) =>{
  try {
    let isPlanSubscribe = await UserModel.checkIsPlanSubscribe(req.user_id)
    if(isPlanSubscribe.length > 0){
      return res.status(200).send({success: true, msg: "Plan subscribed", isSubscribe: true});
    }else{
      return res.status(200).send({success: true, msg: "No subscription found", isSubscribe: false});
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message })
  }
}