exports.getContractDetailsById = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.contractId:
        errorMsg = "Contract id required";
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
      msg: "error from validator",
    });
  }
};

exports.howItWorksById = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.howItWorksId:
        errorMsg = "HowItWorks id required";
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
      msg: "Error from validator",
    });
  }
};

exports.getContractDetailsByUserId = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.userId:
        errorMsg = "user id required";
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
      msg: "error from validator",
    });
  }
};

exports.updateContractDetailsByUserId = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.contractId:
        errorMsg = "contract id required";
        break;

      case !data.contractPdf:
        errorMsg = "Contract pdf is required";
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
      msg: "error from validator",
    });
  }
};
