import { Router } from "express";
import { deleteReport, myReports, newReport, reports  } from "../controller/reportsController.js";

const router = Router()

router.get('/reports', reports)
router.post('/createReports', newReport )
router.get('/myreports', myReports)
router.delete('/deleteReport', deleteReport)

export {router as reports}
