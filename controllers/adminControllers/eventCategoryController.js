const eventCategoryModel = require("../../models/adminModels/eventCategoryModel");
const { validationResult } = require("express-validator");

exports.getEventsCategoryDetails = async (req, res) => {
  try {
    let getEventsCategoryDetails = await eventCategoryModel.getEventCategory();
    if (getEventsCategoryDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Events category details",
        data: getEventsCategoryDetails,
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
      msg: "Internal error",
    });
  }
};

exports.getEventsCategoryDetailsById = async (req, res) => {
  try {
    let getEventsCategoryDetailsById =
      await eventCategoryModel.getEventsCategoryDetailsById(req.body.id);
    if (getEventsCategoryDetailsById.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Events category details",
        data: getEventsCategoryDetailsById[0],
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
      msg: "Internal error",
    });
  }
};

exports.insertEventsCategoryDetails = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getEventListDetails =
      await eventCategoryModel.getEventsCategoryDetailsById(req.body.id);
    if (getEventListDetails.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Events category already available",
      });
    } else {
      let insertEventsCategoryDetails =
        await eventCategoryModel.insertEventsCategoryDetails(req.body.categoryName);
      if (insertEventsCategoryDetails) {
        return res.status(200).send({
          success: true,
          msg: "Events category data added successfully",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong",
        });
      }
    }
  } catch (error) {
   
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.updateEventsCategoryById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getEventsCategoryDetailsById =
      await eventCategoryModel.getEventsCategoryDetailsById(req.body.id);

    if (getEventsCategoryDetailsById.length > 0) {
      let updateEventsCategoryById =
        await eventCategoryModel.updateEventsCategoryById(
          req.body.categoryName,
          req.body.id
        );

      if (updateEventsCategoryById) {
        return res.status(200).send({
          success: true,
          msg: "Events category updated successfully",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Not able to updated",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found",
      });
    }
  } catch {
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.updateEventsCategoryStatusById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let getEventsCategoryDetailsById = await eventCategoryModel.getEventsCategoryDetailsById(req.body.id);
    if (getEventsCategoryDetailsById.length > 0) {
      let updateEventsCategoryStatusById = await eventCategoryModel.updateEventsCategoryStatusById(req.body.id);
      if (updateEventsCategoryStatusById) {
        return res.status(200).send({
          success: true,
          msg: getEventsCategoryDetailsById[0].Status === 0 ? "block" : "unBlock",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Not able to update status",
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
      msg: "Internal error",
    });
  }
};
