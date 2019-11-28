import Router from 'express';
import multer from 'multer';

import EntryController from '../controllers/entryController';
import isLogged from '../middlewares/isLogged';
import isTypeAllowed from '../middlewares/isTypeAllowed';
import EntryValidator from '../middlewares/entryValidator';

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

router.post('/:type', isLogged, isTypeAllowed, uploader.fields([{ name: 'images', maxCount: 2 }, { name: 'videos', maxCount: 2 }]), EntryValidator.CreateValidator, EntryController.createEntry);
router.get('/:type', isLogged, isTypeAllowed, EntryController.allEntries);
router.get('/:type/:id', isLogged, isTypeAllowed, EntryController.singleEntry);
router.delete('/:type/:id', isLogged, isTypeAllowed, EntryController.deleteEntry);
router.patch('/:type/:id/location', isLogged, isTypeAllowed, EntryValidator.editLocationValidator, EntryController.editLocation);
router.patch('/:type/:id/comment', isLogged, isTypeAllowed, EntryValidator.editCommentValidator, EntryController.editComment);

export default router;
