const offerCategoryModel = require("../../models/adminModels/offerCategory");
const { validationResult } = require("express-validator");

exports.getOfferCategoryDetails = async (req, res) => {
  try {
    const getOfferCategoryDetails =
      await offerCategoryModel.getOfferCategoryDetails();
    if (getOfferCategoryDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "List of offer category",
        data: getOfferCategoryDetails,
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

exports.getOfferListById = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }


    let getOfferListById = await offerCategoryModel.getOfferListById(
      req.body.offerId
    );
    if (getOfferListById.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "List of offer list by id",
        data: getOfferListById[0],
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

exports.insertOfferCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let image = !req.files["image"] ? null : req.files["image"][0].filename;
    if (image) {
      req.body.image = image;
    } else {
      req.body.image = req.body.old_image;
    }

    const getOfferCategoryByName =
      await offerCategoryModel.getOfferCategoryDetailsByName(req.body.name);

    if (getOfferCategoryByName.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Offer already added",
      });
    } else {
      const insertOfferCategory = await offerCategoryModel.insertOfferCategory(
        req.body
      );
      if (insertOfferCategory) {
        return res.status(200).send({
          success: true,
          msg: "Latest offer added in offer category",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong offer not able to add",
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

exports.updateOfferCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let image = !req.files["image"] ? null : req.files["image"][0].filename;
    if (image) {
      req.body.image = image;
    } else {
      req.body.image = req.body.old_image;
    }

    let getOfferCategoryById =
      await offerCategoryModel.getOfferCategoryDetailsById(req.body.id);
    if (getOfferCategoryById.length > 0) {
      let updateOfferCategory = await offerCategoryModel.updateOfferCategory(
        req.body.name,
        req.body.image,
        req.body.id
      );
      if (updateOfferCategory) {
        return res.status(200).send({
          success: true,
          msg: "Offer category updated",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "No offer in category found",
      });
    }
  } catch (error) {
   
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.offerCategoryStatusChangeById = async (req, res) => {
  try {
    let getOfferCategoryById =
      await offerCategoryModel.getOfferCategoryDetailsById(req.body.id);
    if (getOfferCategoryById.length > 0) {
      let offerCategoryStatusChangeById =
        await offerCategoryModel.offerCategoryStatusChangeById(req.body.id);
      if (offerCategoryStatusChangeById) {
        return res.status(200).send({
          success: true,
          msg: getOfferCategoryById[0].status === 0 ? "active" : "inactive",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong",
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
      msg: "Interal server error",
    });
  }
};
