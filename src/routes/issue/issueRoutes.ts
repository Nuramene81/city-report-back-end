import express from 'express';
import multer from 'multer';
import { addIssueHandler } from './add-issue/add-issue-handler';

const router = express.Router();

const upload = multer();
router.post('/', upload.array('images'), addIssueHandler);

const issueRoutes = router;
export{issueRoutes as issueRoutes};