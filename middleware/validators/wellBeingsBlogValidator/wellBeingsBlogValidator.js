exports.insertWellBeingsBlogValidator = async (req, res, next) => {
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

      case !data.description:
        errorMsg = "Please provide description";
        break;

      case !data.userId:
        errorMsg = "Please provide description";
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
      succes: false,
      msg: errorMsg,
    });
  }
};

exports.updateWellBeingsBlogValidator = async (req, res, next) => {
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

      case !data.description:
        errorMsg = "Please provide description";
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
      succes: false,
      msg: errorMsg,
    });
  }
};

exports.getWellBeingsBlogIdValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.id:
        errorMsg = "Id is required";
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
      succes: false,
      msg: error.message,
    });
  }
};
