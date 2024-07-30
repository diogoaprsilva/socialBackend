const menuPermissionModel = require("../../models/adminModels/menuPermissionModel");
const { validationResult } = require("express-validator");

exports.getMenuPermissionsDetailsByUserId = async (req, res) => {
  try {
    let getMenuPermissionsDetailsByUserId =
      await menuPermissionModel.getMenuPermissionsDetailsByUserId(
        req.body.userId
      );
    if (getMenuPermissionsDetailsByUserId.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Menu permissions list",
        data: getMenuPermissionsDetailsByUserId[0],
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Not able to get menu permissions",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};

exports.insertMenuPermissions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getMenuPermissionsDetails =
      await menuPermissionModel.getMenuPermissionsDetailsByUserId(
        req.body.userId
      );

    if (getMenuPermissionsDetails.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Permission already granted",
      });
    } else {
      let insertMenuPermissions =
        await menuPermissionModel.insertMenuPermission(
          req.body.userId,
          dashBoard = 0,
          req.body.userManagement,
          req.body.events,
          req.body.offers,
          req.body.wellBeing,
          // req.body.communication,
          req.body.cms,
          req.body.systemRole,
          req.body.systemResources
        );

      if (insertMenuPermissions) {
        return res.status(200).send({
          success: true,
          msg: "Permission given to particular user",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Permission denied",
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

exports.updateMenuPermissions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let getMenuPermissionsByUserId =
      await menuPermissionModel.getMenuPermissionsDetailsByUserId(
        req.body.userId
      );

    if (getMenuPermissionsByUserId.length > 0) {
      let updateMenuPermissions = menuPermissionModel.updateMenuPermissions(
        req.body.dashBoard,
        req.body.userManagement,
        req.body.events,
        req.body.offers,
        req.body.wellBeing,
        // req.body.communication,
        req.body.cms,
        req.body.systemRole,
        req.body.systemResources,
        req.body.userId
      );

      if (updateMenuPermissions) {
        return res.status(200).send({
          success: true,
          msg: "Permissions updated successfully for particular user",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Not able to update permissions",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "User id not found",
      });
    }
  } catch (error) {
    
    return res.status(200).send({
      success: false,
      msg: "Internal error",
    });
  }
};
