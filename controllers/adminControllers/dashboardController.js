const dashboardModel = require('../../models/adminModels/dashboardModel')
const { validationResult } = require("express-validator");
const config = require("../../config");

exports.getDashboardStatistics = async(req, res) => {
    try {

        let getDashboardStatistics = await dashboardModel.getDashboardStatistics()
        if(getDashboardStatistics.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Dashboard list",
                data: getDashboardStatistics
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
            msg: "Internal server error"
        })
    }
};


