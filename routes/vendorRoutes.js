const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const {ensureWebTokenForVendor} = require('../middleware/JWT/ensureWebTokenForVendor');
const {imageArr, contractPdfUpload, howItWorksPdfUpload, profileUpload, eventsImageUpload, brandLogo, } = require('../multer/multer');
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//--------------------------|| controller's ||---------------------------

const vendorControllers = require('../controllers/vendorControllers/vendorLoginControllers');
const vendorOfferControllers = require('../controllers/vendorControllers/vendorOfferControllers');
const offerCategory = require('../controllers/adminControllers/offerCategory');
const getFiles = require('../controllers/getFiles');
const contractController = require('../controllers/adminControllers/contractController');
const howItWorksController = require('../controllers/adminControllers/howItWorksController');
const pushNotificationsControllers = require('../controllers/adminControllers/pushNotificationsController');
const termAndConditionsController = require('../controllers/adminControllers/termAndConditionsController');
const eventController = require('../controllers/vendorControllers/eventController')
const deleteController = require('../controllers/adminControllers/deleteController')

//--------------------------|| VALIDATION'S ||---------------------------

const {vendorLoginValidator, vendorChangePasswordValidator, getVendorProfilePicValidatorByEmail, insertEventsValidator, updateEventsValidator, getEventsValidatorByEventId} = require('../middleware/vendoreValidators/vendorValidators')
const {insertPushNotificationsValidator} = require('../middleware/validators/pushNotificationsValidator/pushNotificationsValidator');
const {offerListValidatorById} = require('../middleware/vendoreValidators/offerListValidator');

//--------------------------|| REGISTER ROUTING ||--------------------------

router.post('/vendorLogin', vendorLoginValidator, vendorControllers.vendorLogin);
router.post('/getVendorProfilePic', ensureWebTokenForVendor, getVendorProfilePicValidatorByEmail, vendorControllers.getVendorProfilePic);
router.post('/updateVendorProfile', ensureWebTokenForVendor, profileUpload, vendorControllers.updateVendorProfile)
router.post('/vendorChangePassword', ensureWebTokenForVendor, vendorChangePasswordValidator, vendorControllers.vendorChangePassword)

//--------------------------|| OFFER LISTS ||---------------------------

router.get('/getVendorOfferList', ensureWebTokenForVendor, vendorOfferControllers.getVendorOfferList);
router.post('/getOfferListByUseridandOfferid', ensureWebTokenForVendor, offerListValidatorById, vendorOfferControllers.getOfferListByUseridandOfferid);
router.post('/getOfferImageByUserIdandOfferId', ensureWebTokenForVendor,offerListValidatorById, vendorOfferControllers.getOfferImageByUserIdandOfferId)
router.post('/insertVendorOfferList',ensureWebTokenForVendor, brandLogo,
 vendorOfferControllers.insertVendorOfferList);
router.get('/getOfferCategoryById', ensureWebTokenForVendor, offerCategory.getOfferCategoryDetails);
router.post('/updateVendorOfferList', ensureWebTokenForVendor, brandLogo, vendorOfferControllers.updateVendorOfferList);
router.post('/updateOfferListStatusByVendor', ensureWebTokenForVendor, offerListValidatorById, vendorOfferControllers.updateOfferListStatusByVendor);
router.post('/getListOfRedeemOfferByUser', ensureWebTokenForVendor, offerListValidatorById, vendorOfferControllers.getListOfRedeemOfferByUser)
// router.post('/getContractDetailsForVendor', ensureWebTokenForVendor, eventController.getContractDetails);
router.get('/getRedeemOffersList', ensureWebTokenForVendor, vendorOfferControllers.getRedeemOffersList)


//--------------------------|| EVENT LISTS ||---------------------------

router.get('/getVenodrEventsListById', ensureWebTokenForVendor, eventController.getVenodrEventsListById);

router.post('/insertEventsDataByVendor', ensureWebTokenForVendor, eventsImageUpload, insertEventsValidator,eventController.insertEventsDataByVendor);

router.post('/updateVendorEventsDataById', ensureWebTokenForVendor, eventsImageUpload, updateEventsValidator,eventController.updateVendorEventsDataById);

router.post('/getEventsDataByEventId', ensureWebTokenForVendor, getEventsValidatorByEventId, eventController.getEventsDataByEventId)

//--------------------------|| CONTRACT ||---------------------------

router.post('/getContractDetailsforVendor', ensureWebTokenForVendor, contractController.getContractDetails);
router.post('/insertContractDetailsByVendor', ensureWebTokenForVendor, contractPdfUpload,contractController.insertContractDetails);
router.post('/updateContractDetailsByVendor', ensureWebTokenForVendor, contractPdfUpload, contractController.updateContractDetailsByVendor) 
router.post('/getContractTemplateById', ensureWebTokenForVendor, contractController.getContractTemplateById);
// router.post('/getContractDetailsForVenodr', ensureWebTokenForVendor, contractController.getContractDetails);

//--------------------------|| HOWITWORKS ||---------------------------

router.get('/getHowItWorksDetailsForVendor', ensureWebTokenForVendor, howItWorksController.getHowItWorksDetailsForVendor);
router.post('/insertHowItWorksPdf', ensureWebTokenForVendor, howItWorksPdfUpload, howItWorksController.insertHowItWorksPdf);


//--------------------------|| PUSHNOTIFICATIONS ||---------------------------

router.get('/getPushNotificatioons', ensureWebTokenForVendor, pushNotificationsControllers.getPushNotificationsDetails);
router.post('/insertPushNotifications', ensureWebTokenForVendor, insertPushNotificationsValidator, pushNotificationsControllers.insertPushNotifications);


//--------------------------|| TERMSANDCONDITION ||---------------------------

router.get('/getTermsAndConditionData', ensureWebTokenForVendor, termAndConditionsController.getTermAndConditionsData);
router.post('/updateTermsAndConditionDataById', ensureWebTokenForVendor, termAndConditionsController.updateTermsAndConditionDataById);

//--------------------------|| DELETE ||---------------------------

router.post('/deleteOffer', deleteController.deleteOffer)
router.post('/deleteEvent', deleteController.deleteEvent)

router.get("/newUplaods/:image", getFiles.getImage.bind());



//--------------------------|| VALIDATION FOR ENDPOINT ||---------------------------

router.all("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}",
    });
});


module.exports.vendorRoutes = router;

