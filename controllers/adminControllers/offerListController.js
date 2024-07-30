const assert = require("assert");
const offerListModel = require("../../models/adminModels/offerListModel");
const { validationResult } = require("express-validator");
const { off } = require("process");

exports.getOfferListDetails = async (req, res) => {
  try {
    let getOfferListDetails = await offerListModel.getOfferListDetails();
    if (getOfferListDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Offer list details",
        data: getOfferListDetails,
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
      msg: error.message,
    });
  }
};

exports.getOfferListDetailsByUser = async (req, res) => {
  try {
    let getOfferListDetailsByUser =
      await offerListModel.getOfferListDetailsByUser(req.body.userId);
    if (getOfferListDetailsByUser.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Offer list details by particuler user",
        data: getOfferListDetailsByUser,
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
      msg: error.message,
    });
  }
};

exports.getUnapprovedOffers = async (req, res) => {
  try {
    let getUnapprovedOffers = await offerListModel.getUnapprovedOffers();
    if (getUnapprovedOffers) {
      return res.status(200).send({
        success: true,
        msg: "List of unapproved offers",
        data: getUnapprovedOffers,
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
      msg: error.message,
    });
  }
};

exports.updateOfferList = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }



    let updateOfferList = await offerListModel.updateOfferList(
      req.body.offerCategoryId,
      req.body.offerName,
      req.body.offerPrice,
      req.body.id
    );

    if (updateOfferList) {
      return res.status(200).send({
        success: true,
        msg: "offer list updated successfully",
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Offer list not able to update",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.getRedeemOfferByUser = async (req, res) => {
  try {
    let getRedeemOfferByUser = await offerListModel.getRedeemOfferByUser(
      req.body.userId
    );
    if (getRedeemOfferByUser.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Redeem offer by user",
        data: getRedeemOfferByUser,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Not able to get redeem offer by user",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.updateStatusForApproved = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getOfferListdetailsByUserId = await offerListModel.getOfferListDetailsByUser(req.body.userId);

      let updateStatusForApproved = await offerListModel.updateStatusForApproved(req.body.isApproved, req.body.offerId);
      if (updateStatusForApproved) {
        return res.status(200).send({
          success: true,
          msg: "Success"
        })
      } else {
        return res.status(200).send({
          success: false,
          msg: "Not able to update status for approved"
        })
      }
    
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};


exports.getCountryCodeList = async (req, res) => {
  try {
    let codeList = await offerListModel.getCountryCodeList(
      req.body.userId
    );
    if (codeList.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Country code list",
        data: codeList,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Not able to get country code list",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};


exports.updateIsOfferFreeInOfferList = async(req, res) => {
  try {
  
    let update = await offerListModel.updateIsOfferFreeInOfferList(req.body.id);
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