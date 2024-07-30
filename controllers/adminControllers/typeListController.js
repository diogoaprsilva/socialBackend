const typeListModel = require('../../models/adminModels/typeListModel');

exports.loginTypeListDetails = async(req, res) => {
    try {

        let loginTypeListDetails = await typeListModel.loginTypeListDetails();
        if(loginTypeListDetails.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "List of type",
                data: loginTypeListDetails

            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "No data found"
            })
        }
        
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "Internal server error"
        })
    }
}