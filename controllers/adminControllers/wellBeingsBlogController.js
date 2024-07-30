const wellBeingsBlogModel = require("../../models/adminModels/wellBeingsBlogModel");
const { validationResult } = require("express-validator");

exports.getWellBeingsBlogData = async (req, res) => {
  try {
    let getWellBeingsBlogData =
      await wellBeingsBlogModel.getWellBeingsBlogData();
    if (getWellBeingsBlogData.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Data found",
        data: getWellBeingsBlogData,
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

exports.getWellBeingsBlogDataById = async (req, res) => {
  try {
    let getWellBeingsBlogDataById =
      await wellBeingsBlogModel.getWellBeingsBlogDataById(req.body.id);
    if (getWellBeingsBlogDataById.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Data found",
        data: getWellBeingsBlogDataById[0],
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

exports.getWellBeingsBlogDataByCategory = async (req, res) => {
  try {
    let getWellBeingsBlogDataByCategory =
      await wellBeingsBlogModel.getWellBeingsBlogDataByCategory();
    if (getWellBeingsBlogDataByCategory.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Data is available",
        data: getWellBeingsBlogDataByCategory,
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

exports.insertWellBeingsBlogData = async (req, res) => {
  try {

    let image = !req.files["image"] ? null : req.files["image"][0].filename;
    if (image) {
      req.body.image = image;
    } else {
      req.body.image = req.body.old_image;
    }

    let backgroundImage = !req.files["backgroundImage"] ? null : req.files["backgroundImage"][0].filename;
    if (backgroundImage) {
      req.body.backgroundImage = backgroundImage;
    } else {
      req.body.backgroundImage = req.body.old_backgroundImage;
    }

    const getWellBeingsBlogDataByName =
      await wellBeingsBlogModel.getWellBeingsBlogDataByName(req.body.name);
    if (getWellBeingsBlogDataByName.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Wellbeings blog already added",
      });
    } else {
      const insertWellBeingsBlogData =
        await wellBeingsBlogModel.insertWellBeingsBlogData(
          req.body.name,
          req.body.description,
          req.body.image,
          req.body.backgroundImage,
          req.body.wellBeingsCategoryId,
          req.body.userId
        );
      if (insertWellBeingsBlogData) {
        return res.status(200).send({
          success: true,
          msg: "WellBeings Blog add successfully",
        });
      } else {
        return res.status(200).send({success: false, msg: "Something went wrong",});
      }
    }
  } catch (error) {
    return res.status(200).send({ success: false, msg: "Internal server error", });
  }
};


exports.updateWellBeingsBlogData = async (req, res) => {
  try {
 
    let image = !req.files["image"] ? null : req.files["image"][0].filename;
    if (image) {
      req.body.image = image;
    } else {
      req.body.image = req.body.old_image;
    }

    let backgroundImage = !req.files["backgroundImage"] ? null : req.files["backgroundImage"][0].filename;
    if (backgroundImage) {
      req.body.backgroundImage = backgroundImage;
    } else {
      req.body.backgroundImage = req.body.old_backgroundImage;
    }
   
    if (req.body.image == undefined || req.body.backgroundImage == undefined) {
      let updateWellBeingsBlogData =
        await wellBeingsBlogModel.updateWellBeingsBlogData(
          req.body.name,
          req.body.description,
          req.body.wellBeingsCategoryId,
          req.body.id
        );

      if (updateWellBeingsBlogData) {
        return res.status(200).send({
          success: true,
          msg: "Well beings blog data updated",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Unable to update",
        });
      }
    } else {
      let updateWellBeingsBlogDataImages =
        await wellBeingsBlogModel.updateWellBeingsBlogDataImages(
          req.body.name,
          req.body.description,
          req.body.wellBeingsCategoryId,
          req.body.image,
          req.body.backgroundImage,
          req.body.id
        );
      if (updateWellBeingsBlogDataImages) {
        return res.status(200).send({
          success: true,
          msg: "Well beings blog and images also updated",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Unable to update",
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



exports.wellBeingsBlodStatusChangeById = async (req, res) => {
  try {
    const getWellBeingsBlogById = await wellBeingsBlogModel.getWellBeingsBlogDataById(req.body.id);
    if (getWellBeingsBlogById.length > 0) {
      const wellBeingsBlodStatusChangeById = await wellBeingsBlogModel.wellBeingsBlodStatusChangeById(req.body.id);
      if (wellBeingsBlodStatusChangeById) {
        return res.status(200).send({
          success: true,
          msg: getWellBeingsBlogById[0].status === 0 ? "active" : "nonactive",
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
    console.log(error);
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getWellBeingsBlogCategoryId = async (req, res) => {
  try {
    let data = req.body;
    console.log(data)
    let getWellBeingsBlogDataByCategory =
      await wellBeingsBlogModel.getWellBeingsByCategoryId(data);
    if (getWellBeingsBlogDataByCategory.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Well Beings Category Details",
        data: getWellBeingsBlogDataByCategory,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data found!!",
        data : []
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};


