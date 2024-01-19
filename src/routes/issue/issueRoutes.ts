import express from 'express';
import { addIssueHandler } from './add-issue/add-issue-handler';

const router = express.Router();

router.post('/', addIssueHandler);

const issueRoutes = router;
export{issueRoutes as issueRoutes};