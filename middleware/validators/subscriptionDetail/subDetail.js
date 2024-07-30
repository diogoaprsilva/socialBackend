exports.insertSubsDetailValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.name:
        errorMsg = "Name is Required";
        break;

      case !data.description:
        errorMsg = "Description Type is Required";
        break;

      case !data.subscriptionType:
        errorMsg = "Subscription Type is Required";
        break;

      case !data.amount:
        errorMsg = "Amount Type is Required";
        break;

      case !data.validity:
        errorMsg = "Validity Type is Required";
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
      msg: error.message,
    });
  }
};

exports.updateSubsDetailValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.name:
        errorMsg = "Name is Required";
        break;

      case !data.description:
        errorMsg = "Description is Required";
        break;

      case !data.subscriptionType:
        errorMsg = "Subscription Type is Required";
        break;

      case !data.amount:
        errorMsg = "Amount is Required";
        break;

      case !data.validity:
        errorMsg = "Validity is Required";
        break;

      case !data.id:
        errorMsg = "Subscription Detail Id is Required";
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



exports.updateSubscriptionStatusValidation = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.id:
        errorMsg = "Id is Required";
        break;

      case !data.status:
        errorMsg = "Status is Required";
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