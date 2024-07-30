const expenseCalculatorModel = require('../models/expenseCalculatorModel');
const config = require('../config');

exports.getexpenseCalculatorList = async (req, res) => {
    try {
        let data = req.body;

        let newDate = `${data.year}-${data.month}-01`;
        let lastDate = new Date(data.year, data.month, 0).getDate();
        let newDate1 = `${data.year}-${data.month}-${lastDate}`;

        let getexpenseCalculatorList = await expenseCalculatorModel.getexpenseCalculatorList(req.user_id, newDate, newDate1);
        if (getexpenseCalculatorList.result.length > 0 || getexpenseCalculatorList.result1.length > 0) {
            let totalPortfolio = 0;
            if (getexpenseCalculatorList) {
                totalPortfolio = getexpenseCalculatorList.resultFortotalPortfolio[0].totalPortfolio
            }

            return res.status(200).send({
                success: true,
                msg: "All Expense Calculator list",
                income: getexpenseCalculatorList.result,
                expense: getexpenseCalculatorList.result1,
                totalPortfolio: totalPortfolio
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

exports.insertExpenseCalculator = async (req, res) => {
    try {
        let data = req.body;
        let newamount = data.type == 1 ? data.amount : data.type == 2 ? data.amount * -1 : ''

        const date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let year = date.getFullYear();
        let todayDate = `${year}-${req.body.month}-${day}`

        let newData = {
            userId: req.user_id,
            title: data.title,
            amount: newamount,
            type: data.type,
            datetime : todayDate
        }
        console.log(newData);
        let insert = await expenseCalculatorModel.insertexpenseCalculator(newData);
        if (insert) {
            return res.status(200).send({
                success: true,
                msg: "Details Added",
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Detail not Added"
            })
        }

    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};


exports.getExpenseCalculatorById = async (req, res) => {
    try {
        let data = req.body;
        let newData = {
            id: data.id,
            userId: req.user_id
        }
        let getDetailById = await expenseCalculatorModel.getExpenseCalculatorbyId(newData);
        if (getDetailById.length > 0) {
            return res.status(200).send({
                success: true,
                msg: "Expense Details",
                data: getDetailById[0]
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "No Data Found"
            })
        }

    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};


exports.updateExpenseCalculatorById = async (req, res) => {
    try {
        let data = req.body;
        let newData = {
            id: data.id,
            userId: req.user_id
        }
        let getDetailById = await expenseCalculatorModel.getExpenseCalculatorbyId(newData);
        if (getDetailById.length > 0) {
            let newamount = data.type == 1 ? data.amount : data.type == 2 ? data.amount * -1 : ''

            let newData = {
                title: data.title,
                // description: data.description,
                amount: newamount,
                // type   : data.type,
                id: data.id,
                userId: req.user_id
            }
            let updateDetail = await expenseCalculatorModel.updateExpenseCalculatorbyId(newData);
            if (updateDetail) {
                return res.status(200).send({
                    success: true,
                    msg: "Expense Details updated successfully",

                })
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Detail not update"
                })
            }
        } else {
            return res.status(200).send({
                success: false,
                msg: "No request Available !!"
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};


exports.deleteExpenseCalculator = async (req, res) => {
    try {
        let data = req.body;
        let newData = {
            id: data.id,
            userId: req.user_id
        }
        let getDetailById = await expenseCalculatorModel.getExpenseCalculatorbyId(newData);
        if (getDetailById.length > 0) {

            let deleteDetail = await expenseCalculatorModel.deleteExpenseCalculatorbyId(newData);
            if (deleteDetail) {
                return res.status(200).send({
                    success: true,
                    msg: "Expense Details Deleted !!",

                })
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Detail not deleted !!",
                })
            }
        } else {
            return res.status(200).send({
                success: false,
                msg: "No request Available !!"
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: error.message
        })
    }
};