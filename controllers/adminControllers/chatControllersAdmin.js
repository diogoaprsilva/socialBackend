const chatModelAdmin = require('../../models/adminModels/chatModelAdmin');
const { validationResult } = require("express-validator");

exports.getChatDataAdmin = async (req, res) => {
    try {
        let getChatDataAdmin = await chatModelAdmin.getChatDataAdmin();
        if (getChatDataAdmin.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Chat list",
                data: getChatDataAdmin
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "No chat data found"
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
}

exports.insertChatAdmin = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            });
        }


        let insertChatAdmin = await chatModelAdmin.insertChatAdmin(
            req.body.senderId,
            req.body.receiverId,
            req.body.message
        );
        if (insertChatAdmin) {
            return res.status(200).send({
                success: true,
                msg: "Message sent successfully"
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Error while sending message"
            })
        }

    } catch (error) {
        
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};

exports.getChat = async (req, res) => {
    try {
        
        let getChatDetail = await chatModelAdmin.getChat(req.body.senderId);

        if (getChatDetail.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Get Chat list",
                data: getChatDetail,
            });
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found !!",
            });
        }
    } catch (error) {

        return res.status(200).send({
            success: false,
            msg: "Internal server error",
        });
    }
}

