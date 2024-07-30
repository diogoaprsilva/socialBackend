exports.offerListValidatorById = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.offerId:
        errorMsg = "Offer Id is required";
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
      msg: error.message,
    });
  }
};
