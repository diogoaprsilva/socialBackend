exports.insertWellBeingsCategoryValidator = async (req, res, next) => {
  try {
    let data = req.body;
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

    if (errorMsg == "") {
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
      msg: errorMsg,
    });
  }
};

exports.updateWellBeingsCategoryValidator = async (req, res, next) => {
  try {
    let data = req.body;
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

    if (errorMsg == "") {
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
      msg: errorMsg,
    });
  }
};
