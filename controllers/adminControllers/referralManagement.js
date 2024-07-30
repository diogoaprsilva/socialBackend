const referralManagementModel = require('../../models/adminModels/referralManagement');

exports.getReferralAmt = async(req, res) => {
    try {
        
        let getReferralAmt = await referralManagementModel.getReferralAmt()
        if(getReferralAmt.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Refferal Data",
                data: getReferralAmt
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong"
            })
        }
    } catch (error) {
        return res.status(200).send({ success: false, msg: "Internal server error"})
    }
};

exports.updateReferralAmt = async(req, res) => {
    try {

        let referralAmt = await referralManagementModel.getRefferalAmtById(req.body.id);
        if(referralAmt.length > 0) {
            let updateReferralAmt = await referralManagementModel.updateReferralAmt(req.body.yourAmount, req.body.friendAmount, req.body.id);
            if(updateReferralAmt) {
                return res.status(200).send({
                    success: true,
                    msg: "Referral Amount updated"
                })
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Something went wrong"
                })
            }
        } else {
            return res.status(200).send({
                success: false,
                msg: "Referral Amount not found"
            })
        }
        
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "Internal server errror"
        })
    }
}