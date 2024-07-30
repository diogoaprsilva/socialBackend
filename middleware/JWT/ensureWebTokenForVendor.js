const jwt = require('jsonwebtoken');
const config = require('../../config');



exports.ensureWebTokenForVendor = async(req, res, next)=>{
    const x_access_token = req.headers['authorization'];
    if (typeof x_access_token !== undefined) {
        req.token = x_access_token;
        verifyJWTForVendor(req, res, next);
    } else {
        res.sendStatus(403);
    }
}
async function verifyJWTForVendor(req, res, next) {
   
    jwt.verify(req.token, config.JWTSECRETKEYVENDORE, async function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            const _data = await jwt.decode(req.token, {
                complete: true,
                json: true
            });
            req.vendor = _data['payload'];
            req.vendor_id = req.vendor.id
            if (req.vendor.role != 'vendor') {
                return res.sendStatus(403);
            }
            next();
        }
    })
}