import fetch from "node-fetch";
import {config} from "dotenv";
config();

const headersValue = {
    "Authorization": "Basic " + process.env.AUTH_BASE64,
    "Content-Type": "application/json"
}

async function updateRecord(update, catalogId, recordId) {
    await fetch(`https://test-cca-borisov-ilya.bpium.ru/api/v1/catalogs/${catalogId}/records/${recordId}`,
        {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: headersValue
        })
}

async function newRecord(record, catalogId){
    await fetch(`https://test-cca-borisov-ilya.bpium.ru/api/v1/catalogs/${catalogId}/records/`,
        {
            method: 'POST',
            body: JSON.stringify(record),
            headers: headersValue
        })
}

export {updateRecord, newRecord}