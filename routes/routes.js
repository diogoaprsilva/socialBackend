const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const {ensureWebToken} = require('../middleware/JWT/ensureWebToken')
const {profileUpload, documentUpload, imageArr,eventReciptUpload} = require('../multer/multer');
const app = express();
const cron = require('node-cron');

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
const registerController = require('../controllers/register.controller');
const loginController = require('../controllers/login.controller');
const userController = require('../controllers/userController');
const cardController = require('../controllers/cardController');
const subscriptionController = require('../controllers/subscription.controller');

const getFiles = require('../controllers/getFiles');
const offerController = require('../controllers/offerListController');
const wishListController = require('../controllers/wishListController');
const reviewRatingController = require('../controllers/reviewratingController');
const wellBeingsBlog = require('../controllers/adminControllers/wellBeingsBlogController');
const wellBeingsCategoryController = require('../controllers/adminControllers/wellBeingsCategoryController');
const faqController = require('../controllers/adminControllers/faqController');
const privacyPolicyController = require('../controllers/adminControllers/privacyPolicyController');
const termAndConditionsController = require('../controllers/adminControllers/termAndConditionsController');
const helpAndSupportController = require('../controllers/adminControllers/helpAndSupport');
const eventsController= require('../controllers/adminControllers/eventsController');
const eventsListController= require('../controllers/eventListController');
const expenseCalculatorController= require('../controllers/expenseCalculatorController');

cron.schedule("0 0 * * * ", async function () {
    console.log('Subscription cron');
    await subscriptionController.checkSubscription();
})
router.get("/uplaods/:image", getFiles.getImage.bind());
//--------------------------|| VALIDATION'S ||---------------------------

const { registerValidator, emailValidator,eventIdValidator, smsValidator,signUpValidator,OTPForLoginValidator,resetPasswordValidator, loginValidator, changePasswordValidator,checkOldPasswordValidator, cardDetailValidator,cardDetailByIdValidator,addOfferValidator,offerDetailByIdValidator,offerDetailByCategoryIdValidator, wishListValidator,reviewRatingValidator,getChatValidator,insertChatValidator,insertSupportValidator,smartPinValidator,redeemOfferValidator,insertEventParticipationValidator,insertEventParticipationThirdPartyValidator,addExpenseValidator,ExpenseByIdValidator} = require('../middleware/validators/userValidator.middleware');

//--------------------------|| REGISTER ROUTING ||---------------------------

router.post('/emailVerification', emailValidator, registerController.emailVerification.bind());
router.post('/smsVerification', smsValidator, registerController.smsVerification.bind());
router.post('/userRegister',documentUpload, registerValidator, registerController.userRegister.bind());
router.post('/signUpValidation',signUpValidator, registerController.singUpValidations.bind())
router.post("/googleLogin",emailValidator,userController.googleLogin.bind());

router.post('/updateDocument',ensureWebToken, documentUpload, registerController.updateDocument);


// -----------------------------|| Login Routing --------------------------------

router.post('/getOTPForLogin', OTPForLoginValidator, loginController.getOTPForLogin.bind());
router.post('/login', loginValidator, loginController.login.bind());
router.post('/smartPinLogin', smartPinValidator, loginController.smartPinlogin.bind());


router.post('/forgotPassword',OTPForLoginValidator,  loginController.ForgotPassword.bind());
router.post('/verifyForgotPassword',OTPForLoginValidator,  loginController.verifyForgotPassword.bind());


router.post('/resetpassword',resetPasswordValidator,  loginController.Resetpassword.bind());

router.get('/getCategory', offerController.getCategory);
// router.get('/getHomeOfferList', offerController.getHomeOffer);

//------------------------------|| WITHOUT AUTHOIRZATION ||------------------------------

router.post('/searchOffer', offerController.searchOffer);
router.get('/getHomeOfferList', offerController.getHomeOffer);
router.get('/getWellBeingsCategory', wellBeingsCategoryController.getWellBeingsCategoryData);
router.post('/getAllEventsDetail', userController.getAllEventsDetail.bind())
router.post('/getWellBeingsBlogByCategoryId',offerDetailByCategoryIdValidator, wellBeingsBlog.getWellBeingsBlogCategoryId);

router.get('/countryCodeList', userController.countryCodeList)

router.get('/getTermsAndConditionDetail',  termAndConditionsController.getTermAndConditionsData);
router.get('/getPrivacyPolicyDetail',  privacyPolicyController.getPrivacyPolicyData);

router.get('/getPushNotificationsList', eventsListController.getPushNotificationsList);

//------------------------------|| WITH AUTHOIRZATION ||------------------------------

router.use(ensureWebToken);

router.get('/accountDelete', userController.accountDelete);

router.post('/changeUserPassword', changePasswordValidator,  userController.changeUserPassword.bind())
router.post('/checkUserOldPassword', checkOldPasswordValidator,  userController.checkUserOldPassword.bind())

router.get('/getUserProfile',  userController.getUserProfile.bind());
router.post('/updateUserProfile',profileUpload, userController.UpdateUserProfile.bind());
router.post('/updateFCMToken',userController.updateFCMToken.bind())
router.get("/getReferralUsersList",userController.getReferralUsersList.bind());
router.get("/getUserOfferList",userController.getUserOfferList.bind());
router.get("/getPlanList",userController.getPlanList.bind());
router.get("/getReferralDetail",userController.getReferralDetail.bind());

router.post('/addCard', cardDetailValidator,  cardController.addCard.bind())
router.get("/getCardDetails", cardController.getCardDetails);
router.post("/deleteCardDetails", cardDetailByIdValidator, cardController.deleteCardDetails);

router.post('/addOffer',imageArr.array("offerImage",5),addOfferValidator, offerController.addOffer);
router.get('/getOfferList', offerController.getOfferList);
router.post('/getOfferListById',offerDetailByIdValidator, offerController.getOfferListById);
router.post('/deleteOfferListById',offerDetailByIdValidator, offerController.deleteOfferListById);
router.post('/getOfferListByCategoryId',offerDetailByCategoryIdValidator, offerController.getOfferListByCategoryId);
router.post('/redeemOffer',redeemOfferValidator, offerController.redeemOffer);
router.get('/redeemOfferHistory', offerController.redeemOfferHistory);
router.post('/redeemOfferCheck',redeemOfferValidator, offerController.redeemOfferCheck);


router.post('/addWishList', wishListValidator,  wishListController.insertWishList.bind())
router.get("/getWishListDetails", wishListController.getWishList);
router.post("/deleteWishList", wishListValidator, wishListController.deleteWishList);

//--------------------------|| Rating  FOR ENDPOINT ||---------------------------
router.post('/addReviewRating', reviewRatingValidator, reviewRatingController.insertReviewRating.bind())
router.post("/getReviewRatingDetails",wishListValidator,reviewRatingController.getReviewRating);
router.post("/updateReviewRating", reviewRatingValidator,reviewRatingController.updateReviewRating);

router.post('/buySubscriptionPlan',subscriptionController.buySubscription.bind());
router.post('/paymentIntent', subscriptionController.paymentIntent.bind());
router.post('/paymentHistory', subscriptionController.paymentHistory.bind());
router.post('/paymentIntentForEvent',eventIdValidator, subscriptionController.paymentIntentForEvent.bind());

router.get('/getSubsubscriptionDetail', subscriptionController.getSubsubscriptionDetail.bind())

router.get('/checkIsPlanSubscribe', subscriptionController.checkIsPlanSubscribe)
//--------------------------|| Support Request FOR ENDPOINT ||---------------------------

router.get('/getSupportRequest',registerController.getSupportRequest.bind());
router.post('/insertSupportRequest',insertSupportValidator, registerController.insertSupportRequest.bind());
router.post('/insertChat',insertChatValidator,registerController.insertChat.bind());
router.post('/getChat', registerController.getChat.bind());
router.post('/getWellBeingsBlogById',cardDetailByIdValidator, wellBeingsBlog.getWellBeingsBlogDataById);
router.get('/getFaqDetail',  faqController.getFaqData);
router.get('/getHelpAndSupportDetail',  helpAndSupportController.getHelpAndSupport);
router.post('/getEventsDetailById', eventsController.getEventsDataById);
router.post('/insertEventParticipation',insertEventParticipationValidator, eventsListController.eventParticipation);
router.post('/updateReceipt',eventReciptUpload, eventsListController.updateReceipt);
router.post('/insertEventParticipationWithThirdParties',insertEventParticipationThirdPartyValidator, eventsListController.ThirdPartyEvent);
router.post('/addExpenseCalculator', addExpenseValidator,  expenseCalculatorController.insertExpenseCalculator)
router.post("/getExpenseCalculator",expenseCalculatorController.getexpenseCalculatorList);
router.post("/getExpenseCalculatorById",ExpenseByIdValidator, expenseCalculatorController.getExpenseCalculatorById);
router.post("/updateExpenseCalculatorById",addExpenseValidator, expenseCalculatorController.updateExpenseCalculatorById);
router.post("/deleteExpenseCalculator", ExpenseByIdValidator, expenseCalculatorController.deleteExpenseCalculator);


//--------------------------|| VALIDATION FOR ENDPOINT ||---------------------------

router.all("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}",
    });
});


module.exports.routes = router;