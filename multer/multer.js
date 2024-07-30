
let multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('file', file.originalname)
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
     
        let filetype = '';
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        if (file.mimetype === 'image/jpg') {
            filetype = 'jpg';
        }
        if (file.mimetype === 'video/mp4') {
            filetype = 'mp4';
        }
        if (file.mimetype == 'image/webp') {
            filetype = 'webp';
        }        
        if (file.mimetype === 'application/pdf') {
            filetype = 'pdf';
        }else{
            filetype = 'png';
        }
        cb(null, 'image-' + Date.now() + '.' + file.originalname + filetype);
    }
});

let upload = multer({ storage: storage });

exports.profileUpload = upload.fields([{ name: 'profilePic', maxCount: 1 }]);
exports.documentUpload = upload.fields([{name: 'document', maxCount: 1}]);
exports.offerCategoryImageUpload = upload.fields([{ name: 'image', maxCount: 1 },{ name: 'doc_front_photo', maxCount: 1 },{ name: 'doc_back_photo', maxCount: 1 }]);
exports.wellBeingBlogImageUpload = upload.fields([{name: 'image', maxCount: 1}, {name: 'backgroundImage', maxCount: 1}]);
exports.eventsImageUpload = upload.fields([{name: 'eventImages', maxCount: 1}]);
exports.eventReciptUpload = upload.fields([{name: 'eventRecipt', maxCount: 1}]);
exports.contractPdfUpload = upload.fields([{name: 'contractPdf', maxCount: 1}]);
exports.howItWorksPdfUpload = upload.fields([{name: 'howItWorksPdf', maxCount: 1}]);
exports.brandLogo = upload.fields([{name: 'image', maxCount: 5}, {name: 'brandLogo', maxCount: 5}]);


module.exports.imageArr = upload;
