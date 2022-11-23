import express from "express";
import fetch from "node-fetch";
import {config} from "dotenv";

config();

const router = express.Router();

async function updateComment(newComment, catalogId, recordId) {
    let data = {
        values: {
            "3": newComment
        }
    }
    await fetch(`https://test-cca-borisov-ilya.bpium.ru/api/v1/catalogs/${catalogId}/records/${recordId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Basic " + process.env.AUTH_BASE64,
                "Content-Type": "application/json"
            }
        })
}

router.post("/status-change", async (req, res, next) => {
    let response = await fetch("https://test.bpium.ru/api/webrequest/request")
        .then((response) => response.json());
    let catalogId = req.body.payload.catalogId;
    let recordId = req.body.payload.recordId;
    await updateComment(response.value, catalogId, recordId)
    res.status(200);
})

export const statusRoute = router;