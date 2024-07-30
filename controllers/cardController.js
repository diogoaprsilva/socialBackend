const cardModel = require("../models/cardModel");

exports.addCard = async (req, res) => {
    try {
      let data = req.body;
      let userId = req.user_id
      let getCardDetails = await cardModel.getCardDetailsByNumber(req.user_id,data.cardNumber);
      if (getCardDetails.length > 0) {
        
        return res.status(200).send({
          success: true,
          msg: "Card Details Already Added!!",
        });
      }else{

 
      let user = {
        userId : userId,
        cardNumber : data.cardNumber,
        nameOnCard: data.nameOnCard,
        expiryMonth : data.expiryMonth,
        expiryYear: data.expiryYear,   
        postalCode: data.postalCode  
    };
        let insert = await cardModel.saveCardDetails(user);
        if (insert) {
          return res.status(200).send({
            success: true,
            msg: "Card Detail Added Successsfully!!",
         });
        
         
        }
      }
    } catch (err) {
      console.log({err});
      return res.status(200).send({
        success: false,
        msg: "Something went wrong please try again."
    });
    }
  };

exports.getCardDetails = async (req, res) => {
    try {
      let getCardDetails = await cardModel.getCardDetails(req.user_id);
      if (getCardDetails.length > 0) {
        
        return res.status(200).send({
          success: true,
          msg: "Get Card Details!!",
          data:getCardDetails
       });
      
    
      }else{
        return res.status(200).send({
          success: false,
          msg: "No Data Found"
      });
      }
    } catch (Err) {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong please try again."
    });
    }
  };
  
exports.deleteCardDetails = async (req, res) => {
    try {
        let data = req.body
      let getCardDetails = await cardModel.getCardDetailsById(data.id);
      if (getCardDetails.length > 0) {
      await cardModel.deleteCardDetailsById(data.id);
      return res.status(200).send({
        success: true,
        msg: "Card Delete Successfully!!",
     });
    
      }else{
        return res.status(200).send({
          success: false,
          msg: "No Request Available"
      });
      }
    } catch (Err) {
      return res.status(200).send({
        success: false,
        msg: "Something went wrong please try again."
    });   }
  };