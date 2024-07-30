exports.insertOfferCategoryValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.name:
        errorMsg = "Please provide name";
        break;

      // case !/^[a-zA-Z ]{2,30}$/.test(data.name):
      //   errorMsg = "Please provide valid name";
      //   break;

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
      msg: error.message,
    });
  }
};

exports.updateOfferCategoryValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.name:
        errorMsg = "Please provide name";
        break;
      // case !/^[a-zA-Z ]{2,30}$/.test(data.name):
      //   errorMsg = "Please provide valid name";
      //   break;

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
      msg: error.message,
    });
  }
};

exports.getOfferListByIdValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.offerId:
        errorMsg = "Offer id  is required";
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
      msg: "ErrorMsg",
    });
  }
};

exports.updateOfferListValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {

      case !data.offerCategoryId:
          errorMsg =  "Offer category id is required"
          break;

      case !data.offerName:
        errorMsg = "Offer name is required";
        break;

      case !/^[a-zA-Z ]{2,30}$/.test(data.name):
        errorMsg = "Please provide valid name";
        break;

      case !data.offerPrice:
        errorMsg = "Offer price is required";
        break;

      case !data.id:
        errorMsg = "Id is required";
        break;

      default:
        break;
    }

    if (errorMsg === "") {
      next();
    } else {
      return res.status(200).send({ success: false, msg: errorMsg });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.mesaage,
    });
  }
};

