exports.insertChatAdminValidator = async (req, res, next) => {
    try {
        let data = req.body;
        let errorMsg = "";

        switch (true) {
            case !data.senderId:
                errorMsg = "Sender id required";
                break;

            case !data.receiverId:
                errorMsg = "Receiver id required";
                break;

            case !data.message:
                errorMsg = "Message is required";
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
            msg: "error from validator",
        });
    }
};
