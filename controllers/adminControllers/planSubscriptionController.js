const planSubscriptionModel = require('../../models/adminModels/planSubscriptionModel');

exports.getPlanSubscriptionDetailsByUser = async(req, res) => {
    try {

        let getPlanSubscriptionDetailsByUser = await planSubscriptionModel.getPlanSubscriptionDetailsByUser(req.body.userId)
        if(getPlanSubscriptionDetailsByUser.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Plan subscription details by particular user",
                data: getPlanSubscriptionDetailsByUser
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
            msg: "Internal error"
        })
    }
}