const wishListModel = require('../models/wishListModel');
const config = require('../config');
exports.getWishList = async(req, res) => {
    try {
        let data = req.body;
        let getWishList = await wishListModel.getOfferWishList(req.user_id);
        if(getWishList.length>0) {
            getWishList.filter(item=> {
              item.imageArr = JSON.parse(item.imageArr)
              item.imageArr =item.imageArr ? item.imageArr[0].image :null 
               })
            return res.status(200).send({
                success: true,
                msg: "All Wish list",
                data: getWishList
            })
        } else {
            return res.status(200).send({
                success: true,
                msg: "No Data Found !!",
                data :[]
            })
        }
        
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};

exports.insertWishList = async(req, res) => {
    try {
        let data = req.body;
        
        let getWishList = await wishListModel.getWishList(req.user_id,data)
        if(getWishList.length > 0) {

            let insertWishList = await wishListModel.deletewishList(req.user_id,data);
          
            return res.status(200).send({
                success: true,
                msg: "Offer is removed from the favourites"
            })
           
            } else {
            let insertWishList = await wishListModel.insertWishList(req.user_id,data);
            if(insertWishList) {
                return res.status(200).send({
                    success: true,
                    msg: "Offer is  added to the favourites", 
                })
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "wish list not added"
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

exports.deleteWishList = async(req, res) => {
    try {
        let data = req.body;
        let getWishList = await wishListModel.getWishList(req.user_id,data)
        if(getWishList.length > 0) {
             let insertWishList = await wishListModel.deletewishList(req.user_id,data);
          
            return res.status(200).send({
                success: false,
                msg: "Offer removed from wishlist"
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