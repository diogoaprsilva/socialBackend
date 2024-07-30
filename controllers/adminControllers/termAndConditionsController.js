const termsAndConditonsModel = require('../../models/adminModels/termAndConditionsModel');

exports.getTermAndConditionsData = async(req, res) => {
    try {
        
        let getTermAndConditionsData = await termsAndConditonsModel.getTermAndConditionsData()
        if(getTermAndConditionsData.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Terms and conditions data is available",
                data: getTermAndConditionsData[0]
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong"
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "Internal server error"
        })
    }
};

exports.updateTermsAndConditionDataById = async(req, res) => {
    try {

        let getTermsAndConditionDataById = await termsAndConditonsModel.getTermAndConditionsDataById(req.body.id);
        if(getTermsAndConditionDataById.length > 0) {
            let updateTermsAndConditionDataById = await termsAndConditonsModel.updateTermsAndConditionDataById(req.body.termsAndConditonsData, req.body.id);
            if(updateTermsAndConditionDataById) {
                return res.status(200).send({
                    success: true,
                    msg: "Terms and conditions updated"
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
                msg: "Terms and condition not found"
            })
        }
        
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "Internal server errror"
        })
    }
}