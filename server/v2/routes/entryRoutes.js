import Router from 'express';
import multer from 'multer';

import EntryController from '../controllers/entryController';
import isLogged from '../middlewares/isLogged';
import isTypeAllowed from '../middlewares/isTypeAllowed';
import EntryValidator from '../middlewares/entryValidator';
import asyncErrorHandler from '../helpers/asyncErrorHandler';

const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploader = multer({
    storage: storage,
    limits: 1024 * 1024 * 5
});

router.post('/:type', isLogged, isTypeAllowed, uploader.fields([{ name: 'images', maxCount: 2 }, { name: 'videos', maxCount: 2 }]), EntryValidator.CreateValidator, asyncErrorHandler(EntryController.createEntry));
router.get('/:type', isLogged, isTypeAllowed, asyncErrorHandler(EntryController.allEntries));
router.get('/:type/:id', isTypeAllowed, asyncErrorHandler(EntryController.singleEntry));
router.patch('/:type/:id/location', isLogged, isTypeAllowed, EntryValidator.editLocationValidator, asyncErrorHandler(EntryController.editLocation));
router.patch('/:type/:id/comment', isLogged, isTypeAllowed, EntryValidator.editCommentValidator, asyncErrorHandler(EntryController.editComment));
router.delete('/:type/:id', isLogged, isTypeAllowed, asyncErrorHandler(EntryController.deleteEntry));
router.patch('/:type/:id/status', isLogged, isTypeAllowed, EntryValidator.editStatusValidator, asyncErrorHandler(EntryController.editStatus));

export default router;
