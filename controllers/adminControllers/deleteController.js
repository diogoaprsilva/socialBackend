const deleteModel = require('../../models/adminModels/deleteModel')

exports.deleteSuperAdmin = async (req, res) => {
    try {
        let deleteItem = await deleteModel.deleteSuperAdmin(req.body)
        if (deleteItem) {
            return res.status(200).send({ success: true, msg: "Success" });
        } else {
            return res.status(200).send({ success: false, msg: "Unable to delete super admin" })
        }
    } catch (error) {
        return res.status(500).send(response(false, message.catchMessage));
    }
}

exports.deleteSubAdmin = async (req, res) => {
    try {
        let deleteItem = await deleteModel.deleteSubAdmin(req.body)
        if (deleteItem) {
            return res.status(200).send({ success: true, msg: "Success" });
        } else {
            return res.status(200).send({ success: false, msg: "Unable to delete sub admin" })
        }
    } catch (error) {
        return res.status(500).send(response(false, message.catchMessage));
    }
}

exports.deleteTeacher = async (req, res) => {
    try {
        let deleteItem = await deleteModel.deleteTeacher(req.body)
        if (deleteItem) {
            return res.status(200).send({ success: true, msg: "Success" });
        } else {
            return res.status(200).send({ success: false, msg: "Unable to delete teacher" })
        }
    } catch (error) {
        return res.status(500).send(response(false, message.catchMessage));
    }
}

exports.deleteVendor = async (req, res) => {
    try {
        let deleteItem = await deleteModel.deleteVendor(req.body)
        if (deleteItem) {
            return res.status(200).send({ success: true, msg: "Success" });
        } else {
            return res.status(200).send({ success: false, msg: "Unable to delete vendor" })
        }
    } catch (error) {
        return res.status(500).send(response(false, message.catchMessage));
    }
}


exports.deleteOffer = async (req, res) => {
    try {
        let deleteItem = await deleteModel.deleteOffer(req.body)
        if (deleteItem) {
            return res.status(200).send({ success: true, msg: "Success" });
        } else {
            return res.status(200).send({ success: false, msg: "Unable to delete vendor" })
        }
    } catch (error) {
        return res.status(500).send(response(false, message.catchMessage));
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        let deleteItem = await deleteModel.deleteEvent(req.body)
        if (deleteItem) {
            return res.status(200).send({ success: true, msg: "Success" });
        } else {
            return res.status(200).send({ success: false, msg: "Unable to delete vendor" })
        }
    } catch (error) {
        return res.status(500).send(response(false, message.catchMessage));
    }
}


exports.deleteOfferCategory = async (req, res) => {
    try {
        let deleteItem = await deleteModel.deleteOfferCategory(req.body)
        if (deleteItem) {
            return res.status(200).send({ success: true, msg: "Success" });
        } else {
            return res.status(200).send({ success: false, msg: "Unable to delete vendor" })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(response(false, message.catchMessage));
    }
}


exports.deleteWellbeingCategory = async (req, res) => {
    try {
        let deleteItem = await deleteModel.deleteWellbeingCategory(req.body)
        if (deleteItem) {
            return res.status(200).send({ success: true, msg: "Success" });
        } else {
            return res.status(200).send({ success: false, msg: "Unable to delete vendor" })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(response(false, message.catchMessage));
    }
}