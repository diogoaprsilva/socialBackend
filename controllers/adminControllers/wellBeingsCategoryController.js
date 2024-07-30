const wellBeingsCategoryModel = require("../../models/adminModels/wellBeingsCategoryModel");
const { validationResult } = require("express-validator");

exports.getWellBeingsCategoryData = async (req, res) => {
  try {
    const getWellBeingsCategoryData = await wellBeingsCategoryModel.getWellBeingsCategoryData();
    if (getWellBeingsCategoryData.result.length > 0 || getWellBeingsCategoryData.result1.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Well beings category data",
        data: getWellBeingsCategoryData.result,
        data1 :getWellBeingsCategoryData.result1
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Well beings category data is not present",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getWellBeingsCategoryDataById = async (req, res) => {
  try {
    const getWellBeingsCategoryData =
      await wellBeingsCategoryModel.getWellBeingsCategoryDataById(req.body.id);
    if (getWellBeingsCategoryData.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Well beings category data",
        data: getWellBeingsCategoryData[0]
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Well beings category data is not present",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.insertWellBeingsCategory = async (req, res) => {
  try {
    const getWellBeingsCategoryData = await wellBeingsCategoryModel.getWellBeingsCategoryDataByName(req.body.name);
    if(getWellBeingsCategoryData.length > 0) {
        return res.status(200).send({
            success: false,
            msg: "Wellbeings category already added"
        })
    } else {
        const insertWellBeingsCategory = await wellBeingsCategoryModel.insertWellBeingsCategory(req.body.name);
        if(insertWellBeingsCategory) {
            return res.status(200).send({
                success: true,
                msg: "Wellbeings category added successfully"
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong"
            })
        }
    }
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};


exports.updatetWellBeingsCategory = async (req, res) => {
  try {
        const updatetWellBeingsCategory = await wellBeingsCategoryModel.updatetWellBeingsCategory(req.body);
        if(updatetWellBeingsCategory) {
            return res.status(200).send({
                success: true,
                msg: "Success"
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong"
            })
        }
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};


exports.insertWellBeingsCategory = async (req, res) => {
  try {
    const getWellBeingsCategoryData = await wellBeingsCategoryModel.getWellBeingsCategoryDataByName(req.body.name);
    if(getWellBeingsCategoryData.length > 0) {
        return res.status(200).send({
            success: false,
            msg: "Wellbeings category already added"
        })
    } else {
        const insertWellBeingsCategory = await wellBeingsCategoryModel.insertWellBeingsCategory(req.body.name);
        if(insertWellBeingsCategory) {
            return res.status(200).send({
                success: true,
                msg: "Wellbeings category added successfully"
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong"
            })
        }
    }
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.wellBeingsCategoryStatusChange = async(req, res) => {
    try {

        let getWellBeingsBlogDataById = await wellBeingsCategoryModel.getWellBeingsCategoryDataById(req.body.id);
        if(getWellBeingsBlogDataById.length > 0) {
            
            const wellBeingsCategoryStatusChange = await wellBeingsCategoryModel.wellBeingsCategoryStatusChange(req.body.id);
            if(wellBeingsCategoryStatusChange) {
                return res.status(200).send({
                    success: true,
                    msg: getWellBeingsBlogDataById[0].status === 0 ? "active" : "non_active"
                })
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Something went wrong"
                })
            }
        } else {
            return res.status(200).send({
                success: false,
                msg: "No data found"
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(200).send({
            success: false,
            msg: "Internal server error"
        })
    }
};

exports.deleteWellBeingBlodData = async(req, res) => {
  try {

    let deleteWellBeingBlodData = await wellBeingsCategoryModel.deleteWellBeingData(req.body.id);
    if(deleteWellBeingBlodData) {
      return res.status(200).send({
        success: true,
        message: "Well being blog data deleted"
      })
    } else {
      return res.status(200).send({
        success: false,
        msg: "Not able to delete well bring blog data "
      })
    }

  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message
    })
  }
}

