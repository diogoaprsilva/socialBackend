
 const adminModel = require('../../models/adminModels/adminModels');



// exports.sendNotification = async function (title, msg, route = 0) {

//     let getFCMToken = await adminModel.getFCMToken();
//     console.log(getFCMToken)
//     if (getFCMToken.length > 0) {
//         let message = {}
//         for (let i = 0; i < getFCMToken.length; i++) {
//             message = {
//                 to: getFCMToken[i].FCM_token,
//                 notification: {
//                     title: title,
//                     body: msg
//                 },
//                 data: {
//                     route: route
//                 }
//             };
//         }
//         fcm.send(message, function (err, response) {
//             if (err) {
//                 console.log("Something has gone wrong!", err);
//             } else {
//                 console.log("Successfully sent with response: ", response);
//             }
//         });
//     }
// }



const admin = require("firebase-admin");

const serviceAccount = require('../../the-socials-fd674-firebase-adminsdk-xckhs-87fcf4135e.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// const fcmtoken1 =
// "dNd3VYuWTGCvbDvXyQ29v6:APA91bFEkqz8CzQEAp-TBUjkY6rIa4lsklAfjprJTmMyy5yn9RS5ctsfRnBAJM-R5kDArw85uxocR3QC-8nuXog_U3Z_pStI2GnyJUvNgzTO1jgX8fjq_nb0aiKENq83b00uROy0LMP6";

exports.sendNotification = async function (title, msg) {
    try {
        let fcmtoken = await adminModel.getFCMToken();
        if (fcmtoken.length > 0) {
            for (let i = 0; i < fcmtoken.length; i++) {
                const message = {
                    notification: {
                        title: title,
                        body: msg,
                    },
                    token: fcmtoken[i].FCM_token,
                };

                try {
                    const response = await admin.messaging().send(message);
                    console.log("Successfully sent message", response);
                } catch (error) {
                    console.error("Error sending message", error);
                }
            }
            console.log("All tokens sent successfully");
        } else {
            console.log("No tokens found");
        }
    } catch (error) {
        console.error("Error fetching FCM tokens", error);
    }
};
