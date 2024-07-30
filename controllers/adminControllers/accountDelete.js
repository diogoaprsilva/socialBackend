const adminModel = require('../../models/adminModels/adminModels') 
const CryptoJS = require("crypto-js");


exports.userAccountDeletion = async (req, res) => {
  try {
    let data = req.body;

    let getAccountDetailsById = await adminModel.getAccountDetailsById(data);

    if (getAccountDetailsById.length > 0) {

      let hash = CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Hex);
      
      if (getAccountDetailsById[0].password !== hash) {
        return res.status(200).send({ success: false, msg: "Password does not match" });
      }

      let deleteAccount = await adminModel.deleteAccount(getAccountDetailsById[0].id);
      if (deleteAccount.affectedRows) {
        return res.status(200).send({ success: true, msg: "Your request for account deletion is successful" });
      } else {
        return res.status(200).send({ success: false, msg: "Something went wrong, please try again later" });
      }
    } else {
      return res.status(200).send({ success: false, msg: "No user found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

  