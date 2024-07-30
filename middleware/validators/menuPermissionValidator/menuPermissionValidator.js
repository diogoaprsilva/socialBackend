exports.insertMenuPermissionsValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.userId:
        errorMsg = "User id is required";
        break;

      // case !data.userManagement:
      //   errorMsg = "User management is required";
      //   break;

      case !data.events:
        errorMsg = "Events is required";
        break;

      case !data.offers:
        errorMsg = "Offer is required";
        break;

      case !data.wellBeing:
        errorMsg = "Wellbeing is required";
        break;

      // case !data.communication:
      //   errorMsg = "Communication is required";
      //   break;

      case !data.cms:
        errorMsg = "CMS is required";
        break;

      // case !data.systemRole:
      //   errorMsg = "System Role is required";
      //   break;

      case !data.systemResources:
        errorMsg = "systemResources  is required";
        break;

      default:
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({
        success: false,
        msg: errorMsg,
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Error from middlware: " + error.message,
    });
  }
};

exports.updateMenuPermissionsValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      // case !data.dashBoard:
      //   errorMsg = "Dashboard is required";
      //   break;

      case !data.userManagement:
        errorMsg = "User management is required";
        break;

      case !data.events:
        errorMsg = "Events is required";
        break;

      case !data.offers:
        errorMsg = "Offer is required";
        break;

      case !data.wellBeing:
        errorMsg = "Wellbeing is required";
        break;

      // case !data.communication:
      //   errorMsg = "Communication is required";
      //   break;

      case !data.cms:
        errorMsg = "CMS is required";
        break;

      // case !data.systemRole:
      //   errorMsg = "System Role is required";
      //   break;

      case !data.systemResources:
        errorMsg = "systemResources  is required";
        break;

      case !data.userId:
        errorMsg = "User id is required";
        break;

      default:
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({
        success: false,
        msg: errorMsg,
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: "Error from middlware: " + error.message,
    });
  }
};
