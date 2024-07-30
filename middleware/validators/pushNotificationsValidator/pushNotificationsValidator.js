exports.insertPushNotificationsValidator = async (req, res, next) => {
  try {
    const data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.title:
        errorMsg = "Please provide name";
        break;

 

      case !data.message:
        errorMsg = "Please provide name";
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
