exports.insertFaqValidator = async(req, res, next) => {
    try {

        let data = req.body;
        let errorMsg = ""
        
        switch (true) {
            case !data.question:
                errorMsg = "Question data is required"
                break;

            case !data.answer:
                errorMsg = "Answer data is required"
                break;
        
            default:
                break;
        }

        if(errorMsg == "") {
            next();
        } else {
            return res.status(200).send({
                success: false,
                msg: errorMsg
            })
        }

    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: errorMsg
        })
    }
}

exports.updateFaqValidator = async(req, res, next) => {
    try {

        let data = req.body;
        let errorMsg = ""
        
        switch (true) {

            case !data.id:
                errorMsg = "Id is required"
                break;

            case !data.question:
                errorMsg = "Question data is required"
                break;

            case !data.answer:
                errorMsg = "Answer data is required"
                break;
        
            default:
                break;
        }

        if(errorMsg == "") {
            next();
        } else {
            return res.status(200).send({
                success: false,
                msg: errorMsg
            })
        }

    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: errorMsg
        })
    }
};

exports.deleteFaq = async(req, res, next) => {
    try {

        let data = req.body;
        let errorMsg = ""
        
        switch (true) {

            case !data.id:
                errorMsg = "Id is required"
                break;


        
            default:
                break;
        }

        if(errorMsg == "") {
            next();
        } else {
            return res.status(200).send({
                success: false,
                msg: errorMsg
            })
        }

    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: errorMsg
        })
    }
};

