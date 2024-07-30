const vendorOfferListModel = require("../../models/vendorModels/vendorOfferListModel");
const { validationResult } = require("express-validator");
const { off } = require("../../utils/connection");

exports.getVendorOfferList = async (req, res) => {
  try {

    let vendorId = req.vendor_id;

    let getVendorOfferList = await vendorOfferListModel.getVendorOfferList(vendorId);
    if (getVendorOfferList.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "List of offer",
        data: getVendorOfferList,
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "Offer not found",
      });
    }
  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: "Internal server error",
    });
  }
};

exports.getOfferListByUseridandOfferid = async (req, res) => {
  try {
    let userId = req.vendor_id;

    let getOfferListByUseridandOfferid =
      await vendorOfferListModel.getOfferListByUserIdandOfferId(
        req.body.offerId,
        userId
      );


    //   getOfferListByUseridandOfferid.filter(item => {
    //     item.offerImage = JSON.parse(item.offerImage)
    // })

    if (getOfferListByUseridandOfferid.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Offer list by user id and offer id",
        data: getOfferListByUseridandOfferid[0],
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data available",
      });
    }
  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.getOfferImageByUserIdandOfferId = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        success: false,
        msg: `${errors.errors[0].msg}`,
      });
    }

    let userId = req.vendor_id;
    console.log(userId);


    let getOfferImageByUserIdandOfferId = await vendorOfferListModel.getOfferImageUserIdandOfferIdBack(
      req.body.offerId,
      userId
    )


    if (getOfferImageByUserIdandOfferId.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "Offer Image by user id and offer id",
        data: getOfferImageByUserIdandOfferId[0],
      });
    } else {
      return res.status(200).send({
        success: false,
        msg: "No data available",
      });
    }

  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message
    })
  }
}

exports.insertVendorOfferList = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.vendor_id;
    let checkIsOfferFree = await vendorOfferListModel.checkIsOfferFree(userId)
    console.log('checkIsOfferFree', checkIsOfferFree)
    if(checkIsOfferFree.length > 0){
      req.body.isOfferFree = 1
    }else{
      req.body.isOfferFree = 0
    }
    

    let getVendorOfferName = await vendorOfferListModel.getVendorOfferName(req.body.offerName);

    if (getVendorOfferName.length > 0) {
      return res.status(200).send({
        success: false,
        msg: "Offer already added",
      });
    } else {
      // let imageArr = !req.files ? null : req.files;
      var imageArr = !req.files["image"]
        ? null
        : req.files["image"][0].filename;
      let brandLogo = !req.files["brandLogo"]
        ? null
        : req.files["brandLogo"][0].filename;


      // let offerCode = Math.floor(Math.random() * 9000 + 1000);

      const categoryIdArray = Array.isArray(data.offerCategoryId) ? data.offerCategoryId : [data.offerCategoryId];
      const offerCategoryId = categoryIdArray[0].split(',').map(Number);

      for (let i = 0; i < offerCategoryId.length; i++) {
        let offerCode = Math.floor(Math.random() * 9000 + 1000);
        let insertVendorOfferList = await vendorOfferListModel.insertVendorOfferList(
          userId,
          offerCategoryId[i],
          req.body.offerName,
          req.body.offerDescription,
          req.body.offerTermsAndCondition,
          req.body.offerLocation,
          req.body.offerPercent,
          req.body.offerPrice,
          req.body.offerType,
          req.body.offerAddress,
          req.body.isOfferFree,
          brandLogo,
          offerCode
        );

        if (insertVendorOfferList) {
          for (let j = 0; j < imageArr.length; j++) {
            let newImages = {
              userId: req.vendor_id,
              offerId: insertVendorOfferList.insertId,
              image: imageArr,
            };

            await vendorOfferListModel.insertOfferImages(newImages);
          }
        }
      }

      return res.status(200).send({
        success: true,
        msg: "Offer added successfully",
      });
    }
  } catch (error) {
    console.log(error.message)
    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.updateVendorOfferList = async (req, res) => {
  try {

    let offerImages = [];
    // let imageArr = !req.files ? null : req.files;
    // let imageIndex = imageArr.findIndex((item) => item.fieldname == "image");
    // let oldImage = !req.body.oldImage ? [] : JSON.parse(req.body.oldImage);

    // if (imageIndex > -1) {
    //   offerImages.push(imageArr[imageIndex].filename);
    // } else if (req.body.image && oldImage[0]) {
    //   offerImages.push(oldImage[0]);
    // }

    // let image1Index = imageArr.findIndex((item) => item.fieldname == "image1");
    // if (image1Index > -1) {
    //   offerImages.push(imageArr[image1Index].filename);
    // } else if (req.body.image1 && oldImage[1]) {
    //   offerImages.push(oldImage[1]);
    // }

    // let image2Index = imageArr.findIndex((item) => item.fieldname == "image2");
    // if (image2Index > -1) {
    //   offerImages.push(imageArr[image2Index].filename);
    // } else if (req.body.image2 && oldImage[2]) {
    //   offerImages.push(oldImage[2]);
    // }

    // let image3Index = imageArr.findIndex((item) => item.fieldname == "image3");
    // if (image3Index > -1) {
    //   offerImages.push(imageArr[image3Index].filename);
    // } else if (req.body.image3 && oldImage[3]) {
    //   offerImages.push(oldImage[3]);
    // }

    // let brandLogoName = '';
    // let brandLogoIndex = imageArr.findIndex((item) => item.fieldname == "brandLogo");
    // if (brandLogoIndex > -1) {
    //   brandLogoName = imageArr[brandLogoIndex].filename;
    // } else if (req.body.brandLogo && oldLogo[4]) {
    //   brandLogoName =  oldLogo[4];
    // }    


    var image = !req.files["image"]
      ? null
      : req.files["image"][0].filename;
    //  var oldCollectionImage = req.body.oldCollectionImage;
    if (image) {
      image = image;
    } else {
      image = req.body.oldImage;
    }

    let brandLogo = !req.files["brandLogo"]
      ? null
      : req.files["brandLogo"][0].filename;
    //   var oldCollectionbackgroundimage = req.body.oldCollectionbackgroundimage;
    if (brandLogo) {
      brandLogo = brandLogo;
    } else {
      brandLogo = req.body.oldBrandLogo;
    }

    let userId = req.vendor_id;

    let getOfferList = await vendorOfferListModel.getOfferListById(
      req.body.id,
      userId
    );

    if (getOfferList.length > 0) {
      let updateVendorOfferList =
        await vendorOfferListModel.updateVendorOfferList(
          req.body.offerName,
          req.body.offerDescription,
          req.body.offerTermsAndCondition,
          req.body.offerLocation,
          req.body.offerPercent,
          req.body.offerPrice,
          req.body.offerType,
          req.body.offerAddress,
          req.body.offerCategoryId,
          brandLogo,
          req.body.id
        );

      if (updateVendorOfferList) {

        let OfferandUserId = {
          userId: req.vendor_id,
          offerId: req.body.id,
        };

        await vendorOfferListModel.deleteOfferImages(OfferandUserId);
        //  for (let i = 0; i < offerImages.length; i++) {

        let newImages = {
          userId: req.vendor_id,
          offerId: req.body.id,
          image: image,
        };

        await vendorOfferListModel.insertOfferImages(newImages);
        //  }

        return res.status(200).send({
          success: true,
          msg: "Offer updated successfully !!",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Insert Failed !!",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "User and Offer id not exits",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.updateOfferListStatusByVendor = async (req, res) => {
  try {
    let vendorId = req.vendor_id;


    let getOfferListByVendorId =
      await vendorOfferListModel.getOfferListByVendorId(req.body.offerId, vendorId);


    if (getOfferListByVendorId[0].id) {

      let updateOfferListStatusByVendor =
        await vendorOfferListModel.updateOfferListStatusByVendor(
          req.body.offerId
        );

      if (updateOfferListStatusByVendor) {
        return res.status(200).send({
          success: true,
          msg: getOfferListByVendorId[0].status === 0 ? "Active" : "Inactive",
        });
      } else {
        return res.status(200).send({
          success: false,
          msg: "Not able to update status",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        msg: "Vendor id not found",
      });
    }
  } catch (error) {

    return res.status(200).send({
      success: false,
      msg: error.message,
    });
  }
};

exports.getListOfRedeemOfferByUser = async (req, res) => {
  try {

    let vendorId = req.vendor_id
    let getListOfRedeemOfferByUser = await vendorOfferListModel.getListOfRedeemOfferByUser(
      req.body.offerId, vendorId
    );
    if (getListOfRedeemOfferByUser.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "List of redeem offer by user",
        data: getListOfRedeemOfferByUser
      })
    } else {
      return res.status(200).send({
        success: false,
        msg: "Offer not redeem by user"
      })
    }

  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message
    })
  }
}


exports.getRedeemOffersList = async (req, res) => {
  try {

    let offerList = await vendorOfferListModel.getRedeemOffersList(req.vendor_id);
    if (offerList.length > 0) {
      return res.status(200).send({
        success: true,
        msg: "List of redeem offer by user",
        data: offerList
      })
    } else {
      return res.status(200).send({
        success: false,
        msg: "No Offer Found"
      })
    }

  } catch (error) {
    return res.status(200).send({
      success: false,
      msg: error.message
    })
  }
}


