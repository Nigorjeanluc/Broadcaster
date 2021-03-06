import Entry from '../models/entryModel';

class EntryController {
    static createEntry(req, res) {
        const userId = parseInt(req.userData.id, 10);
        const type = req.params.type.split('s')[0];
        const images = req.files.images.map(img => img.path.replace(/\\/g, '/'));
        const videos = req.files.videos.map(vid => vid.path.replace(/\\/g, '/'));
        const entry = new Entry(req.body, type, userId, images, videos);

        Entry.entrySaved(entry);

        res.status(201).json({
            status: 201,
            data: {
                id: entry.id,
                message: `New ${entry.type} record was created successfully`
            }
        });
    }

    static allEntries(req, res) {
        const userId = req.userData.id;
        const type = req.params.type.split('s')[0];

        const data = Entry.sameType(userId, type);

        if (data.length > 0) {
            return res.status(200).json({
                status: 200,
                data
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entries found`
        });
    }

    static singleEntry(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = Entry.entryExists(id, type);

        if (data) {
            return res.status(200).json({
                status: 200,
                data
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }

    static deleteEntry(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = Entry.entryOwner(id, type, req.userData.id);

        if (data) {
            Entry.destroyEntry(data);
            return res.status(200).json({
                status: 200,
                message: `${type} record has been deleted`
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }

    static editLocation(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = Entry.entryOwner(id, type, req.userData.id);

        if (data) {
            if (data.status === 'draft') {
                data.location = req.body.location;
                return res.status(200).json({
                    status: 200,
                    data: {
                        id: data.id,
                        message: `Updated ${type} record's location`
                    }
                });
            }
            return res.status(403).json({
                status: 403,
                error: `You are not allowed to change this location`
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }

    static editComment(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = Entry.entryOwner(id, type, req.userData.id);

        if (data) {
            if (data.status === 'draft') {
                data.comment = req.body.comment;
                return res.status(200).json({
                    status: 200,
                    data: {
                        id: data.id,
                        message: `Updated ${type} record's comment`
                    }
                });
            }
            return res.status(403).json({
                status: 403,
                error: `You are not allowed to change this comment`
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }

    static editStatus(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        const { isAdmin } = req.userData;

        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = Entry.entryExists(id, type);

        if (data) {
            if (isAdmin) {
                data.status = req.body.status;
                return res.status(200).json({
                    status: 200,
                    data: {
                        id: data.id,
                        message: `Updated ${type} record's status`
                    }
                });
            }

            return res.status(403).json({
                status: 403,
                error: `You are not allowed to change this status`
            });
        }

        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }
}

export default EntryController;
