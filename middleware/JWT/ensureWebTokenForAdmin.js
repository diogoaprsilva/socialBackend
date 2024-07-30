const jwt = require('jsonwebtoken');
const config = require('../../config');



exports.ensureWebTokenForAdmin = async(req, res, next)=>{
    const x_access_token = req.headers['authorization'];
    if (typeof x_access_token !== undefined) {
        req.token = x_access_token;
        verifyJWTForAdmin(req, res, next);
    } else {
        res.sendStatus(403);
    }
}
async function verifyJWTForAdmin(req, res, next) {
   
    jwt.verify(req.token, config.JWT_SECRET_KEY, async function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            const _data = await jwt.decode(req.token, {
                complete: true,
                json: true
            });
            req.admin = _data['payload'];
            req.admin_id = req.admin.id
            if (req.admin.role != 'cpadmin') {
                return res.sendStatus(403);
            }
            next();
        }
    })
}