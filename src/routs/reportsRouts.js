import { Router } from "express";
import { myReports, newReport, reports  } from "../controller/reportsController.js";

const router = Router()

router.get('/reports', reports)
router.post('/createReports', newReport )
router.get('/myreports', myReports)

export {router as reports}
