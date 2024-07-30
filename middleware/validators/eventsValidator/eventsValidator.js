exports.insertEventsValidator = async (req, res, next) => {
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

      case !data.location:
        errorMsg = "Please provide location";
        break;

      // case !data.eventPrice:
      //   errorMsg = "Please provide event price";
      //   break;

      // case !data.mobileNumber:
      //   errorMsg = "Please provide mobile number";
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
      msg: errorMsg,
    });
  }
};

exports.updateEventsValidator = async (req, res, next) => {
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

      case !data.address:
        errorMsg = "Please provide address";
        break;

      case !data.eventDate:
        errorMsg = "Please provide Event Date";
        break;

      case !data.fromTime:
        errorMsg = "Please provide Start Time";
        break;

      case !data.toTime:
        errorMsg = "Please provide End Time";
        break;

      case !data.location:
        errorMsg = "Please provide location";
        break;

      // case !data.eventPrice:
      //   errorMsg = "Please provide event price";
      //   break;

      // case !data.mobileNumber:
      //   errorMsg = "Mobile number is required";
      //   break;
      // case !/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(
      //   data.mobileNumber
      // ):
      //   errorMsg = "Please provide valid mobile number";
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
      msg: "errorMsg",
    });
  }
};

exports.insertEventsCategoryDetailsValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.categoryName:
        errorMsg = "Category name is required";
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
      msg: "errorMsg",
    });
  }
};

exports.updateEventsCategoryByIdValidator = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.id:
        errorMsg = "Id is required";
        break;

      case !data.categoryName:
        errorMsg = "Category Name is required";
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
      msg: "errorMsg",
    });
  }
};

exports.updateEventsCategoryStatusByIdValidator = async (req, res, next) => {
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
      success: false,
      msg: "errorMsg",
    });
  }
};

exports.getEventsIdValidator = async (req, res, next) => {
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
      success: false,
      msg: "errorMsg",
    });
  }
};

exports.getEventsValidatorByEventId = async (req, res, next) => {
  try {
    let data = req.body;
    let errorMsg = "";

    switch (true) {
      case !data.eventId:
        errorMsg = "Events Id is required";
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
      msg: "errorMsg",
    });
  }
};