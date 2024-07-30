const jwt = require('jsonwebtoken');
const config = require('../../config');
const userModel = require('../../models/userModel')


exports.ensureWebToken = async (req, res, next)=>{
    const x_access_token = req.headers['authorization'];
    if (typeof x_access_token !== undefined) {
        req.token = x_access_token;
        verifyJWT(req, res, next);
    } else {
        res.sendStatus(403);
    }
}

async function verifyJWT(req, res, next) {
    jwt.verify(req.token, config.JWTSECRETKEYUSER, async function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            const _data = await jwt.decode(req.token, {
                complete: true,
                json: true
            });
            req.user = _data['payload'];
            req.user_id = req.user.id;
            req.email = req.user.email;
            req.bnb_address = req.user.bnb_address;
            // check if user is active or not 
            // let userDetails = await userModel.getUsersDetails(req.user.email);
            // if (userDetails[0].isBlock == 1 || userDetails.length == 0) {
                // return res.sendStatus(403);
            // } else {
                next();
            // }
        }
    })
}