import Joi from '@hapi/joi';

import Entry from '../models/entryModel';

class EntryValidation {
    static CreateValidator(req, res, next) {
        const Schema = Joi.object().keys({
            id: Joi.number().integer().required(),
            createdOn: Joi.date().required(),
            createdBy: Joi.number().integer().required(),
            title: Joi.string().min(3).max(100).label('Title').required(),
            type: Joi.string().min(3).max(20).label('Type').trim().required(),
            location: Joi.string().min(3).max(40).label('Location').trim().required(),
            status: Joi.string().min(3).max(20).label('Status').trim().required(),
            images: Joi.array().label('Images').required(),
            videos: Joi.array().label('Videos').required(),
            comment: Joi.string().min(10).max(1000).label('Comment').trim().required(),
        });

        if (req.files.images && req.files.videos) {
            const userId = parseInt(req.userData.id, 10);
            const type = req.params.type.split('s')[0];
            const images = req.files.images.map(img => img.path.replace(/\\/g, '/'));
            const videos = req.files.videos.map(vid => vid.path.replace(/\\/g, '/'));
            const entry = new Entry(req.body, type, userId, images, videos);

            const result = Schema.validate(entry, {
                abortEarly: false
            });
            const valid = result.error == null;

            if (valid) {
                return next();
            }
            const { details } = result.error;
            const message = details.map(i => i.message.replace(/"/g, '')).join(', ');

            return res.status(400).json({
                status: 400,
                error: message,
            });
        }

        return res.status(400).json({
            status: 400,
            error: 'Image(s) or Video(s) is required',
        });
    }

}

export default EntryValidation;
