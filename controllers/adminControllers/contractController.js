const contractModel = require("../../models/adminModels/contractModel");
const { validationResult } = require("express-validator");

exports.getContractDetails = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let getContractDetails = await contractModel.getContractDetails();

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

exports.insertContractDetails = async (req, res) => {
  try {
    let contractPdf = !req.files["contractPdf"]
      ? null
      : req.files["contractPdf"][0].filename;
    if (contractPdf) {
      req.body.contractPdf = contractPdf;
    } else {
      req.body.contractPdf = req.body.old_contractPdf;
    }

    let getContractDetails = await contractModel.getContractDetailsByPdf(
      req.body.contractPdf
    );
    if (getContractDetails.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Contract details already exists",
      });
    } else {
        let insertContractDetails = await contractModel.insertContractDetails(
        req.body.contractPdf,
        req.vendor_id,

      );
      if (insertContractDetails) {
        return res.status(200).send({
          success: true,
          msg: "Contract details insert successfully",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Unable to insert contract details",
        });
      }
    }
  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.updateContractDetails = async (req, res) => {
  try {

    let contractPdf = !req.files["contractPdf"]
      ? null
      : req.files["contractPdf"][0].filename;
    if (contractPdf) {
      req.body.contractPdf = contractPdf;
    } else {
      req.body.contractPdf = req.body.old_contractPdf;
    }

      let updateContractDetails = await contractModel.updateContractDetails(
        req.body.contractPdf,
        req.body.userId
      );
      if (updateContractDetails) {
        return res.status(200).send({
          success: true,
          msg: "Contract details updated successfully",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Unable to update contract details",
        });
      }
  } catch (error) {
    console.log(error)

    return res.status(200).send({
      success: false,
      msg: "Internal Error",
    })
  }
};

exports.getContractTemplateById = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }
    let getContractDetails = await contractModel.getContractTemplateById(req.body.userId);

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


exports.updateContractDetailsByVendor = async (req, res) => {
  try {

    let contractPdf = !req.files["contractPdf"]
      ? null
      : req.files["contractPdf"][0].filename;
    if (contractPdf) {
      req.body.contractPdf = contractPdf;
    } else {
      req.body.contractPdf = req.body.old_contractPdf;
    }

      let updateContractDetails = await contractModel.updateContractDetailsByVendor(
        req.body.contractPdf,
        req.body.userId
      );
      if (updateContractDetails) {
        return res.status(200).send({
          success: true,
          msg: "Contract details updated successfully",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Unable to update contract details",
        });
      }
  } catch (error) {
    console.log(error)

    return res.status(200).send({
      success: false,
      msg: "Internal Error",
    })
  }
};