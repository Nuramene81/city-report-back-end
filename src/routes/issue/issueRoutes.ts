import express from 'express';
import multer from 'multer';
import { addIssueHandler } from './add-issue/add-issue-handler';
import { getIssuesHandler } from './get-issues/get-issues-handler';
import { deleteIssueHandler } from './delete-issue/delete-issue-handler';

const router = express.Router();

const upload = multer();
router.route('/')
  .post(upload.array('images'), addIssueHandler)
  .get(getIssuesHandler);

router.route('/:issueUUID')
  .delete(deleteIssueHandler);

const issueRoutes = router;
export{ issueRoutes as issueRoutes };