const eventsModel = require("../../models/vendorModels/eventModel");
const { validationResult } = require("express-validator");

exports.getVenodrEventsListById = async (req, res) => {
  try {
    let getEventsData = await eventsModel.getVenodrEventsListById(req.vendor_id);
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
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getEventsDataById = async (req, res) => {
  try {
    
    let getEventsDataById = await eventsModel.getEventsDataById(req.body.id, req.user_id);
    if (getEventsDataById.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Events details is available",
        data: getEventsDataById[0],
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No Data Found",
      });
    }
  } catch (error) {
    
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getEventsDataByEventId = async (req, res) => {
  try {


    let getEventsDataByEventId = await eventsModel.getEventsDataByEventId(req.body.eventId);
    if (getEventsDataByEventId.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Events details is available",
        data: getEventsDataByEventId[0],
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No Data Found",
      });
    }
  } catch (error) {
    
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.insertEventsDataByVendor = async (req, res) => {
  try {

    let userId = req.vendor_id
    console.log(userId)
    let image = !req.files["eventImages"] ? null : req.files["eventImages"][0].filename;
    if (image) {
      req.body.image = image;
    } else {
      req.body.image = req.body.old_image;
    }

    let getEventsById = await eventsModel.getEventsDataByEventId(req.body.eventId);
    if (getEventsById.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Events already present",
      });
    } else {
      let insertEventsData = await eventsModel.insertEventsDataByVendor(
        req.body.name,
        req.body.description,
        req.body.image,
        req.body.location,
        req.body.eventPrice || 0,
        req.body.eventDiscount,
        req.body.mobileNumber,
        req.body.eventDate,
        req.body.fromTime,
        req.body.toTime,
        req.body.address,
        // req.body.isHighlights,
        userId,
        req.body.addedBy
        

      );
      if (insertEventsData) {
        return res.status(200).send({
          success: true,
          msg: "Events data added successfully",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong",
        });
      }
    }
  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.updateVendorEventsDataById = async (req, res) => {
  try {

    let userId = req.vendor_id

    let image = !req.files["eventImages"]
      ? null
      : req.files["eventImages"][0].filename;
    if (image) {
      req.body.image = image;
    } else {
      req.body.image = req.body.old_image;
    }

    if (req.body.image == undefined) {
      let updateEventsDataById = await eventsModel.updateEventsDataById(
        req.body.name,
        req.body.description,
        req.body.location,
        req.body.eventPrice,
        req.body.eventDiscount,
        req.body.mobileNumber,
        req.body.eventDate,
        req.body.fromTime,
        req.body.toTime,
        req.body.address,
        // req.body.isHighlights,
        userId,
        req.body.id
      );

      if (updateEventsDataById) {
        return res.status(200).send({
          success: true,
          msg: "Events update successfully",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Unable to updated",
        });
      }
    } else {
      let updateEventsDataByIdImage =
        await eventsModel.updateEventsDataByIdImage(
          req.body.name,
          req.body.description,
          req.body.image,
          req.body.location,
          req.body.eventPrice,
          req.body.eventDiscount,
          req.body.mobileNumber,
          req.body.eventDate,
          req.body.fromTime,
          req.body.toTime,
          req.body.address,
          // req.body.isHighlights,
          userId,
          req.body.id
        );

      if (updateEventsDataByIdImage) {
        return res.status(200).send({
          success: true,
          msg: "Events update successfully ",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Something went wrong",
        });
      }
    }
  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.updateEventsStatusById = async (req, res) => {
  try {
    let getEventsDataById = await eventsModel.getEventsDataById(req.body.id);
    if (getEventsDataById.length > 0) {
      let updateEventsStatusById = await eventsModel.updateEventsStatusById(
        req.body.id
      );
      if (updateEventsStatusById) {
        return res.status(200).send({
          success: true,
          msg: getEventsDataById[0].status === 0 ? "active" : "non_active",
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
        msg: "Events data is not available",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Inernal server error",
    });
  }
};

exports.getContractDetails = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getContractDetails = await eventsModel.getContractDetails();
    
    if (getContractDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Contract details",
        data: getContractDetails,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No contract found",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};
