const privacyPolicyModel = require('../../models/adminModels/privacyPolicyModel');

exports.getPrivacyPolicyData = async (req, res) => {
    try {

        let getPrivacyPolicyData = await privacyPolicyModel.getPrivacyPolicyData();
        if (getPrivacyPolicyData.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Privacy policy data is avaiable",
                data: getPrivacyPolicyData[0]
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

exports.updatePrivacyPolicyData = async (req, res) => {
    try {

        let getPrivacyPolicyDataById = await privacyPolicyModel.getPrivacyPolicyDataById(req.body.id);
        if (getPrivacyPolicyDataById.length > 0) {

            let updatePrivacyPolicyData = await privacyPolicyModel.updatePrivacyPolicyData(req.body.privacyPolicyData, req.body.id);
            if (updatePrivacyPolicyData) {
                return res.status(200).send({
                    success: true,
                    msg: "Privacy policy updated successfully"
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
                msg: "Privacy policy data not found"
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "Internal server error"
        })
    }
}



