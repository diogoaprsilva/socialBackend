const faqModel = require('../../models/adminModels/faqModel');
const { validationResult } = require("express-validator");

exports.getFaqData = async(req, res) => {
    try {
        
        let getFaqData = await faqModel.getFaqData();
        if(getFaqData.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Faq data is available",
                data: getFaqData
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

exports.insertFaqData = async(req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(200).send({
            success: false,
            msg: `${errors.errors[0].msg}`,
          });
        }

        let getFaqDataById = await faqModel.getFaqDataById(req.body.id);
        if(getFaqDataById.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Faq data already exit"
            })
        } else {
            let insertFaqData = await faqModel.insertFaqData(req.body.question, req.body.answer);
            if(insertFaqData) {
                return res.status(200).send({
                    success: true,
                    msg: "Faq data added successfully",
                })
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Something went wrong"
                })
            }
        }

        
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "Internal server error"
        })
    }
};

exports.updateFaqDataById = async(req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(200).send({
            success: false,
            msg: `${errors.errors[0].msg}`,
          });
        }

        let getFaqDataById = await faqModel.getFaqDataById(req.body.id);
        if(getFaqDataById.length > 0) {
            let updateFaqDataById = await faqModel.updateFaqData(req.body.question, req.body.answer, req.body.id);
            if(updateFaqDataById) {
                return res.status(200).send({
                    success: true,
                    msg: "Faq data updated successfully",
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
                msg: "Faq data not present"
            })
        }
        
    } catch (error) {
       
        return res.status(200).send({
            success: false,
            msg: "Internal server error"
        })
    }
};

exports.deleteFaq = async(req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(200).send({
            success: false,
            msg: `${errors.errors[0].msg}`,
          });
        }

        let deleteFaq = await faqModel.deleteFaq(req.body.id);
        if(deleteFaq) {
            return res.status(200).send({
                success: true,
                msg: "Faq delete"
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