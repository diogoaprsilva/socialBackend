const offerReviewRatingModel = require('../models/reviewratingModel');
const config = require('../config');

exports.getReviewRating = async(req, res) => {
    try {
        let data = req.body;
        let getReviewRating = await offerReviewRatingModel.getReviewRating(req.user_id,data);
        if(getReviewRating.length>0) {
            return res.status(200).send({
                success: true,
                msg: "Offer Review & Rating",
                data: getReviewRating[0]
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found !!"
            })
        }
        
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};

exports.insertReviewRating = async(req, res) => {
    try {
        let data = req.body;
        
        let getReviewRating = await offerReviewRatingModel.getReviewRating(req.user_id,data)
        if(getReviewRating.length > 0) {
            return res.status(200).send({
                success: false,
                msg: "Already Added Review Rating"
            })
        } else {
            let insertReviewRating = await offerReviewRatingModel.insertReviewRating(req.user_id,data);
            if(insertReviewRating) {
                return res.status(200).send({
                    success: true,
                    msg: "Review Rating Added Successfully", 
                })
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "review rating not added"
                })
            }
        } 
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};

exports.updateReviewRating = async(req, res) => {
    try {
        let data = req.body;
        let getWishList = await offerReviewRatingModel.getReviewRating(req.user_id,data)
        if(getWishList.length > 0) {
             let insertWishList = await offerReviewRatingModel.updateReviewRating(req.user_id,data);
          
            return res.status(200).send({
                success: false,
                msg: "Review rating updated successfully"
            })
        } else {
                return res.status(200).send({
                    success: false,
                    msg: "No Request Available"
                })
           
        } 
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};