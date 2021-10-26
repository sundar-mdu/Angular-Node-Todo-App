import express from "express";

import {createPay, executePay} from '../controller/pay.js'

const router = express.Router();

router.get('/', createPay)

router.post('/', executePay)

export default router;