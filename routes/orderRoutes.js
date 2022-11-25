import express from "express";
import fetch from "node-fetch";
import {updateRecord, newRecord} from "../helpers/apihelpers.js";

const router = express.Router();
const catalogIdStock = 12;
const catalogIdOrder = 11;

router.post("/status-change", async (req, res, next) => {
    let response = await fetch("https://test.bpium.ru/api/webrequest/request")
        .then((response) => response.json());
    let recordId = req.body.payload.recordId;
    let data = {
        values: {
            "3": response.value
        }
    }
    await updateRecord(data, catalogIdOrder, recordId)
    res.status(200).end();
})

router.post("/new-order", async (req,res,next)=>{
    let comment = req.body.payload.values["3"];
    let orderId = req.body.payload.recordId;
    let newRecordInStock = {
        values: {
            "2": Date.now(),
            "3": [
                {
                    "catalogId": 11,
                    "recordId": orderId
                }
            ],
            "4": comment
        }
    }
    await newRecord(newRecordInStock, catalogIdStock);
    res.status(200).end();
})

export const statusRoute = router;