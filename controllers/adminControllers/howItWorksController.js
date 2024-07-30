const howItWorksModel = require("../../models/adminModels/howItWorksModel");
const { validationResult } = require("express-validator");

exports.getHowItWorksDetails = async (req, res) => {
  try {

    let userId = req.vendor_id;
    if(!req.vendor_id){
     userId = req.admin_id
    }

    let getHowItWorksDetails = await howItWorksModel.getHowItWorkDetais(userId);
    if (getHowItWorksDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "How it work details",
        data: getHowItWorksDetails,
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

exports.insertHowItWorksPdf = async (req, res) => {
  try {
    let howItWorksPdf = !req.files["howItWorksPdf"]
      ? null
      : req.files["howItWorksPdf"][0].filename;
    if (howItWorksPdf) {
      req.body.howItWorksPdf = howItWorksPdf;
    } else {
      req.body.howItWorksPdf = req.body.old_howItWorksPdf;
    }

    let userId = req.vendor_id;
    if(!req.vendor_id){
     userId = req.admin_id
    }

    let getHowItWorkDetaisByPdf = await howItWorksModel.getHowItWorkDetaisByPdf(
      req.body.howItWorksPdf
    );

    if (getHowItWorkDetaisByPdf.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "How it works pdf already exits",
      });
    } else {
      let insertHowItWorksPdf = await howItWorksModel.insertHowItWorksPdf(
        req.body.howItWorksPdf,
        userId
      );
      if (insertHowItWorksPdf) {
        return res.status(200).send({
          success: true,
          msg: "How it works pdf insert successfully",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Unable to insert how it works pdf",
        });
      }
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.uploadHowItWorksPdf = async (req, res) => {
  try {
    let howItWorksPdf = !req.files["howItWorksPdf"]
      ? null
      : req.files["howItWorksPdf"][0].filename;
    if (howItWorksPdf) {
      req.body.howItWorksPdf = howItWorksPdf;
    } else {
      req.body.howItWorksPdf = req.body.old_howItWorksPdf;
    }

    

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getHowItWorkDetaisById = await howItWorksModel.getHowItWorkDetaisById(
      req.body.howItWorksId
    );
    if (getHowItWorkDetaisById.length > 0) {
      let uploadHowItWorksPdf = await howItWorksModel.uploadHowItWorksPdf(req.body.howItWorksPdf, req.body.howItWorksId);
      if(uploadHowItWorksPdf) {
        return res.status(200).send({
            success: true,
            msg: "How it works pdf upload successfully"
        })
      } else {
        return res.status(200).send({
            success: false,
            msg: "Unable to upload pdf"
        })
      }
    } else {
        return res.status(200).send({
            success: false,
            msg: "No data found"
        })
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};


exports.getHowItWorksDetailsForVendor = async (req, res) => {
  try {

    let getHowItWorksDetails = await howItWorksModel.getHowItWorksDetailsForVendor();
    if (getHowItWorksDetails.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "How it work details",
        data: getHowItWorksDetails,
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
