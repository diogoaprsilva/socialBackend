const helpAndSupportModel = require('../../models/adminModels/helpAndSupport');

exports.getHelpAndSupport = async(req, res) => {
    try {
        
        let getHelpAndSupport = await helpAndSupportModel.getHelpAndSupport()
        if(getHelpAndSupport.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Help and Support Data",
                data: getHelpAndSupport[0]
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

exports.updateHelpAndSupport = async(req, res) => {
    try {

        let helpAndSupport = await helpAndSupportModel.getHelpAndSupportById(req.body.id);
        if(helpAndSupport.length > 0) {
            let updateHelpAndSupport = await helpAndSupportModel.updateHelpAndSupport(req.body.helpAndSupportContent, req.body.id);
            if(updateHelpAndSupport) {
                return res.status(200).send({
                    success: true,
                    msg: "Help and Support updated"
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
                msg: "Help and Support not found"
            })
        }
        
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "Internal server errror"
        })
    }
}