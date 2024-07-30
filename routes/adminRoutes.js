const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const {ensureWebTokenForAdmin} = require('../middleware/JWT/ensureWebTokenForAdmin');
const {profileUpload, offerCategoryImageUpload, wellBeingBlogImageUpload, eventsImageUpload, contractPdfUpload, howItWorksPdfUpload} = require('../multer/multer');
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

const adminController = require('../controllers/adminControllers/adminLoginController');
const dashboardController = require('../controllers/adminControllers/dashboardController');
const loginTypeController = require('../controllers/adminControllers/loginTypeController');
const getFiles = require('../controllers/getFiles');
const typeListController = require('../controllers/adminControllers/typeListController');
const eventListController = require('../controllers/eventListController');
const offerCategory = require('../controllers/adminControllers/offerCategory');
const wellBeingsBlog = require('../controllers/adminControllers/wellBeingsBlogController');
const wellBeingsCategoryController = require('../controllers/adminControllers/wellBeingsCategoryController');
const faqController = require('../controllers/adminControllers/faqController');
const privacyPolicyController = require('../controllers/adminControllers/privacyPolicyController'); 
const termAndConditionsController = require('../controllers/adminControllers/termAndConditionsController');
const eventsController= require('../controllers/adminControllers/eventsController');
const eventCategoryController = require('../controllers/adminControllers/eventCategoryController');
const offerListController = require('../controllers/adminControllers/offerListController');
const planSubscriptionController = require('../controllers/adminControllers/planSubscriptionController');
const menuPermissionsController = require('../controllers/adminControllers/menuPermissionController');
const contractController = require('../controllers/adminControllers/contractController');
const howItWorksController = require('../controllers/adminControllers/howItWorksController');
const pushNotificationsControllers = require('../controllers/adminControllers/pushNotificationsController');
const subscriptionDetailsController = require('../controllers/adminControllers/subscriptionDetails')
const helpAndSupportController = require('../controllers/adminControllers/helpAndSupport')
const referralManagementController = require('../controllers/adminControllers/referralManagement');
const chatControllersAdmin = require('../controllers/adminControllers/chatControllersAdmin');
const deleteController = require('../controllers/adminControllers/deleteController')
const deleteUserAccount = require('../controllers/adminControllers/accountDelete')

//--------------------------|| VALIDATION'S ||---------------------------

const {adminLoginValidator, adminChangePasswordValidator, blockByIdValidator} = require('../middleware/validators/adminValidators');
const {addUser, updateUser} = require('../middleware/validators/loginTypeValidator');
const {insertOfferCategoryValidator, updateOfferCategoryValidator, updateOfferListValidator, getOfferListByIdValidator} = require('../middleware/validators/offerCategory/offerCategoryValidators');
const {insertWellBeingsBlogValidator, updateWellBeingsBlogValidator, getWellBeingsBlogIdValidator} = require('../middleware/validators/wellBeingsBlogValidator/wellBeingsBlogValidator');
const {insertWellBeingsCategoryValidator, updateWellBeingsCategoryValidator} = require('../middleware/validators/wellBeingsCategoryValidator/wellBeingsCategoryValidator');
const {insertFaqValidator, updateFaqValidator, deleteFaq} = require('../middleware/validators/faqValidator/faqValidator');
const {insertEventsValidator, updateEventsValidator, insertEventsCategoryDetailsValidator, updateEventsCategoryByIdValidator, updateEventsCategoryStatusByIdValidator, getEventsIdValidator, getEventsValidatorByEventId} = require('../middleware/validators/eventsValidator/eventsValidator');
const { updateUserValidator, getUserListByIdValidator, getUserListByUserIdValidator} = require('../middleware/validators/loginTypeValidator');
const {insertMenuPermissionsValidator, updateMenuPermissionsValidator} = require('../middleware/validators/menuPermissionValidator/menuPermissionValidator');
const {getContractDetailsByUserId, howItWorksById} = require('../middleware/validators/contractValidator/contractValidator');
const {insertPushNotificationsValidator} = require('../middleware/validators/pushNotificationsValidator/pushNotificationsValidator');
const {insertSubsDetailValidator, updateSubsDetailValidator, updateSubscriptionStatusValidation} = require('../middleware/validators/subscriptionDetail/subDetail');
const {insertChatAdminValidator} = require('../middleware/validators/chatValidatorAdmin/chatValidatorAdmin');


//--------------------------|| REGISTER ROUTING ||---------------------------

router.post("/adminlogin", adminLoginValidator, adminController.adminLogin);
router.get('/getAdminData',ensureWebTokenForAdmin, adminController.getAdminData);
router.post('/adminChangePassword', ensureWebTokenForAdmin, adminChangePasswordValidator, adminController.adminChangePassword);
router.post('/updateProfilePic', ensureWebTokenForAdmin, profileUpload,  adminController.updateProfilePic);
router.post('/getAdminProfilePic', ensureWebTokenForAdmin, adminController.getAdminProfilePic);
router.get('/getDashboardStatistics', ensureWebTokenForAdmin, dashboardController.getDashboardStatistics);
router.get('/getSuperAdminList', ensureWebTokenForAdmin, adminController.getSuperAdminList);
router.post('/addUser',ensureWebTokenForAdmin, addUser, loginTypeController.addUser);
router.post('/updateUser', ensureWebTokenForAdmin, updateUser, loginTypeController.updateUser);
router.post('/userBlockByAdmin', ensureWebTokenForAdmin, blockByIdValidator, adminController.userBlockByAdmin);
router.post('/updateIsOfferFree', ensureWebTokenForAdmin, adminController.updateIsOfferFree);

router.post('/getLoginTypeList', ensureWebTokenForAdmin, typeListController.loginTypeListDetails);
router.post('/getSubAdminDetails', ensureWebTokenForAdmin, loginTypeController.getSubAdminDetails);
router.post('/updateUserDetails', ensureWebTokenForAdmin, profileUpload, updateUserValidator,  loginTypeController.updateUserDetails);
router.post('/getUserListById', ensureWebTokenForAdmin, getUserListByUserIdValidator, loginTypeController.getUserListById);
router.post('/verifiedUserById', ensureWebTokenForAdmin, getUserListByUserIdValidator, loginTypeController.verifiedUserById);
router.post('/getReferralListByUser', ensureWebTokenForAdmin, getUserListByIdValidator, loginTypeController.getReferralListByUser);
router.post('/getEventsParticipantsByUser', ensureWebTokenForAdmin, getUserListByIdValidator, loginTypeController.getEventsParticipantsByUser);

//--------------------------|| TEACHER ||---------------------------
router.get('/getTeachersList', ensureWebTokenForAdmin, loginTypeController.getTeacherListDetails);
router.get('/getTeacherFeedBack', ensureWebTokenForAdmin, loginTypeController.getTeacherFeedBack);

//--------------------------|| VENDOR ||---------------------------
router.get('/getVenderDetails', ensureWebTokenForAdmin, loginTypeController.getVenderDetails);
router.get('/getVendorFeedBack', ensureWebTokenForAdmin, loginTypeController.getVendorFeedBack)

//--------------------------|| OFFER ||---------------------------

router.get('/getOfferList', ensureWebTokenForAdmin, offerListController.getOfferListDetails);
router.get('/getOfferCategory', ensureWebTokenForAdmin, offerCategory.getOfferCategoryDetails);
router.post('/getOfferListById', ensureWebTokenForAdmin, getOfferListByIdValidator, offerCategory.getOfferListById)
router.post('/inserOfferCategory', ensureWebTokenForAdmin, offerCategoryImageUpload, insertOfferCategoryValidator, offerCategory.insertOfferCategory);
router.post('/updateOfferCategoryById', ensureWebTokenForAdmin, offerCategoryImageUpload, updateOfferCategoryValidator, offerCategory.updateOfferCategory);
router.post('/offerCategoryStatusChangeById', ensureWebTokenForAdmin, offerCategory.offerCategoryStatusChangeById);
router.post('/getOfferListDetailsByUser', ensureWebTokenForAdmin, offerListController.getOfferListDetailsByUser);
router.get('/getUnapprovedOffers', ensureWebTokenForAdmin, offerListController.getUnapprovedOffers);
router.post('/updateOfferList', ensureWebTokenForAdmin, updateOfferListValidator, offerListController.updateOfferList);
router.post('/getRedeemOfferByUser', ensureWebTokenForAdmin, getUserListByIdValidator, offerListController.getRedeemOfferByUser);
router.post('/updateStatusForApproved', ensureWebTokenForAdmin, getOfferListByIdValidator, offerListController.updateStatusForApproved);

router.get('/getCountryCodeList', ensureWebTokenForAdmin, offerListController.getCountryCodeList);

router.post('/updateIsOfferFreeInOfferList', ensureWebTokenForAdmin, offerListController.updateIsOfferFreeInOfferList);



//--------------------------|| WELLBEINGS BLOG ||---------------------------

router.get('/getWellBeingsBlogData', ensureWebTokenForAdmin, wellBeingsBlog.getWellBeingsBlogData);

router.post('/getWellBeingsBlogDataById', ensureWebTokenForAdmin, getWellBeingsBlogIdValidator, wellBeingsBlog.getWellBeingsBlogDataById)

router.post('/insertWellBeingsBlogData', ensureWebTokenForAdmin, wellBeingBlogImageUpload, insertWellBeingsBlogValidator, wellBeingsBlog.insertWellBeingsBlogData);

router.post('/updateWellBeingBlogById', ensureWebTokenForAdmin,  wellBeingBlogImageUpload,updateWellBeingsBlogValidator, wellBeingsBlog.updateWellBeingsBlogData);

router.post('/wellBeingsBlogStatusChangeById', ensureWebTokenForAdmin, wellBeingsBlog.wellBeingsBlodStatusChangeById);

router.get('/getWellBeingsCategoryData', ensureWebTokenForAdmin, wellBeingsCategoryController.getWellBeingsCategoryData);

router.post('/getWellBeingsCategoryDataById', ensureWebTokenForAdmin, wellBeingsCategoryController.getWellBeingsCategoryDataById)

router.post('/insertWellBeingsCategory', ensureWebTokenForAdmin, insertWellBeingsCategoryValidator, wellBeingsCategoryController.insertWellBeingsCategory);

router.post('/updatetWellBeingsCategory', ensureWebTokenForAdmin, wellBeingsCategoryController.updatetWellBeingsCategory);

router.post('/wellBeingsCategoryStatusChange', ensureWebTokenForAdmin, updateWellBeingsCategoryValidator, wellBeingsCategoryController.wellBeingsCategoryStatusChange);

router.post('/deleteWellBeingBlogData', ensureWebTokenForAdmin, getWellBeingsBlogIdValidator, wellBeingsCategoryController.deleteWellBeingBlodData)

//--------------------------|| CMS DATA ||---------------------------

router.get('/getFaqData', ensureWebTokenForAdmin, faqController.getFaqData);
router.post('/insertFaqData', ensureWebTokenForAdmin, insertFaqValidator, faqController.insertFaqData);
router.post('/updateFaqDataById', ensureWebTokenForAdmin, updateFaqValidator, faqController.updateFaqDataById);
router.post('/deleteFaq', ensureWebTokenForAdmin, deleteFaq, faqController.deleteFaq)
router.get('/getPrivacyPolicyData', ensureWebTokenForAdmin, privacyPolicyController.getPrivacyPolicyData);
router.post('/updatePrivacyPolicyData', ensureWebTokenForAdmin, privacyPolicyController.updatePrivacyPolicyData);

router.get('/getTermsAndConditionData', ensureWebTokenForAdmin, termAndConditionsController.getTermAndConditionsData);
router.post('/updateTermsAndConditionDataById', ensureWebTokenForAdmin, termAndConditionsController.updateTermsAndConditionDataById);

//--------------------------|| EVENTS ||---------------------------

router.get('/getEventListDetails', ensureWebTokenForAdmin, eventListController.getEventListDetails);
router.get('/getEventsData', ensureWebTokenForAdmin, eventsController.getEventsData);
router.post('/getEventsById', ensureWebTokenForAdmin, eventsController.getEventsDataById);
router.post('/getEventsDataByEventId', ensureWebTokenForAdmin, getEventsValidatorByEventId, eventsController.getEventsDataByEventId)
router.post('/insertEventsData', ensureWebTokenForAdmin, eventsImageUpload, insertEventsValidator,eventsController.insertEventsData);
router.post('/updateEventsDataById', ensureWebTokenForAdmin, eventsImageUpload, updateEventsValidator,eventsController.updateEventsDataById);
router.post('/updateEventsStatusById', ensureWebTokenForAdmin, eventsController.updateEventsStatusById);
router.get('/getEventsCategoryDetails', ensureWebTokenForAdmin, eventCategoryController.getEventsCategoryDetails),
router.post('/getEventsCategoryDetailsById', ensureWebTokenForAdmin, getEventsIdValidator, eventCategoryController.getEventsCategoryDetailsById);
router.post('/insertEventsCategoryDetails', ensureWebTokenForAdmin, insertEventsCategoryDetailsValidator, eventCategoryController.insertEventsCategoryDetails);
router.post('/updateEventsCategoryById', ensureWebTokenForAdmin, updateEventsCategoryByIdValidator, eventCategoryController.updateEventsCategoryById);
router.post('/updateEventCategoryStatusByID', ensureWebTokenForAdmin, updateEventsCategoryStatusByIdValidator, eventCategoryController.updateEventsCategoryStatusById);

//--------------------------|| MENU ||---------------------------

router.post('/getMenuPermissionsDetailsByUserId', ensureWebTokenForAdmin, menuPermissionsController.getMenuPermissionsDetailsByUserId);
router.post('/insertMenuPermissions', ensureWebTokenForAdmin, insertMenuPermissionsValidator, menuPermissionsController.insertMenuPermissions);
router.post('/updateMenuPermissions', ensureWebTokenForAdmin, updateMenuPermissionsValidator, menuPermissionsController.updateMenuPermissions);

//--------------------------|| CONTRACT ||---------------------------

router.post('/getContractDetailsForAdmin', ensureWebTokenForAdmin, getContractDetailsByUserId, contractController.getContractDetails);
router.post('/getContractTemplateById', ensureWebTokenForAdmin, contractController.getContractTemplateById);
router.post('/insertContractDetailsByAdmin', ensureWebTokenForAdmin, contractPdfUpload,contractController.insertContractDetails);
router.post('/updateContractDetailsByAdmin', ensureWebTokenForAdmin, contractPdfUpload, contractController.updateContractDetails)



//--------------------------|| HOWITWORKS ||---------------------------

router.get('/getHowItWorksDetails', ensureWebTokenForAdmin, howItWorksController.getHowItWorksDetails);
router.post('/insertHowItWorksPdf', ensureWebTokenForAdmin, howItWorksPdfUpload, howItWorksController.insertHowItWorksPdf);
router.post('/uploadHowItWorksPdf', ensureWebTokenForAdmin, howItWorksPdfUpload, howItWorksById, howItWorksController.uploadHowItWorksPdf);

//--------------------------|| PUSHNOTIFICATIONS ||---------------------------

router.get('/getPushNotificatioons', ensureWebTokenForAdmin, pushNotificationsControllers.getPushNotificationsDetails);
router.post('/insertPushNotifications', ensureWebTokenForAdmin, insertPushNotificationsValidator, pushNotificationsControllers.insertPushNotifications);

router.post('/getPlanSubscriptionDetailsByUser', ensureWebTokenForAdmin, planSubscriptionController.getPlanSubscriptionDetailsByUser);

router.get("/newUplaods/:image", getFiles.getImage.bind());

//-------------------------|| Subscription Plan Detail ||--------------------------

router.post('/addPlanDetail', ensureWebTokenForAdmin, insertSubsDetailValidator, subscriptionDetailsController.addPlanDetail )
router.get('/getSubscriptionList', ensureWebTokenForAdmin, subscriptionDetailsController.getSubscriptionList)
router.post('/updateSubscriptionDetail', ensureWebTokenForAdmin, updateSubsDetailValidator,subscriptionDetailsController.updateSubscriptionDetail)
router.post('/updateSubscriptionStatus', ensureWebTokenForAdmin, updateSubscriptionStatusValidation, subscriptionDetailsController.updateSubscriptionStatus)


//-------------------------|| HELP AND SUPPORT ||--------------------------

router.get('/getHelpAndSupport', ensureWebTokenForAdmin, helpAndSupportController.getHelpAndSupport);
router.post('/updateHelpAndSupport', ensureWebTokenForAdmin, helpAndSupportController.updateHelpAndSupport);

//-------------------------|| CHAT ||--------------------------

router.get('/getChatDataAdmin', ensureWebTokenForAdmin, chatControllersAdmin.getChatDataAdmin);
router.post('/getChat', ensureWebTokenForAdmin, chatControllersAdmin.getChat);
router.post('/insertChatAdmin', ensureWebTokenForAdmin, insertChatAdminValidator, chatControllersAdmin.insertChatAdmin);

//-------------------------|| REFERRAL ||--------------------------

router.get('/getReferralAmt', ensureWebTokenForAdmin, referralManagementController.getReferralAmt);
router.post('/updateReferralAmt', ensureWebTokenForAdmin, referralManagementController.updateReferralAmt);

//-------------------------|| DELETE ||--------------------------

router.post('/deleteSuperAdmin', deleteController.deleteSuperAdmin)
router.post('/deleteSubAdmin', deleteController.deleteSubAdmin)
router.post('/deleteTeacher', deleteController.deleteTeacher)
router.post('/deleteVendor', deleteController.deleteVendor)
router.post('/deleteOffer', deleteController.deleteOffer)
router.post('/deleteEvent', deleteController.deleteEvent)
router.post('/deleteOfferCategory', deleteController.deleteOfferCategory)
router.post('/deleteWellbeingCategory', deleteController.deleteWellbeingCategory)


//-------------------------|| USER ACCOUNT DELETE ||--------------------------


router.post('/userAccountDeletion', deleteUserAccount.userAccountDeletion)



//--------------------------|| VALIDATION FOR ENDPOINT ||---------------------------

router.all("*", function (req, res) {
    return res.status(200).json({
        code: 404,
        data: null,
        msg: "Invalid Request {URL Not Found}",
    });
});


module.exports.adminRoutes = router;