const subscriptionDetailModel = require('../../models/adminModels/subscriptionDetailModel')



exports.addPlanDetail = async (req, res) => {
    try {
        let {name, description, subscriptionType, amount, validity} = req.body
        let insertPlan = await subscriptionDetailModel.insertPlanDetail(name, description, subscriptionType, amount, validity)
        if (insertPlan) {
            return res.status(200).send({
                success: true,
                msg: "Plan Details Added Successfully!",
            });
        } else {
            return res.status(404).send({
                success: false,
                msg: "Something went wrong! Please try again...",
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: "Internal Server Error"
        })
    }
}

exports.getSubscriptionList = async (req, res) =>{
    try {
        let subscriptionList = await subscriptionDetailModel.getSubscriptionList()
        if (subscriptionList.length > 0) {
            return res.status(200).send({
              success: true,
              msg: "Subscription Plan List",
              data: subscriptionList,
            });
          } else {
            return res.status(404).send({
              success: false,
              msg: "No data found",
            });
          }
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: "Internal Server Error"
        })
    }
}

exports.updateSubscriptionDetail = async (req, res) => {
    try {
        let {name, description, subscriptionType, amount, validity, id} = req.body
        let updateSubscription = await subscriptionDetailModel.updateSubscriptionDetail(name, description, subscriptionType, amount, validity, id)
        if (updateSubscription) {
            return res.status(200).send({
                success: true,
                msg: "Plan Details Updated Successfully!",
            });
        } else {
            return res.status(404).send({
                success: false,
                msg: "Something went wrong! Please try again...",
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: "Internal Server Error"
        })
    }
}


exports.updateSubscriptionStatus = async (req, res) => {
    try {
        let updateStatus = await subscriptionDetailModel.updateSubscriptionStatus(req.body)
        if (updateStatus) {
            return res.status(200).send({
                success: true,
                msg: "Success",
            });
        } else {
            return res.status(404).send({
                success: false,
                msg: "Something went wrong! Please try again...",
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: "Internal Server Error"
        })
    }
}