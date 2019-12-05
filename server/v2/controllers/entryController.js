import Entry from '../models/entryModel';

class EntryController {
    static async createEntry(req, res) {
        const userId = parseInt(req.userData.id, 10);
        const type = req.params.type.split('s')[0];
        const images = req.files.images.map(img => img.path.replace(/\\/g, '/'));
        const videos = req.files.videos.map(vid => vid.path.replace(/\\/g, '/'));
        const entry = new Entry(req.body, type, userId, images, videos);

        const addedEntry = await Entry.createEntry(entry);

        return res.status(201).json({
            status: 201,
            data: [{
                id: addedEntry.id,
                message: `Created ${addedEntry.type} record`
            }]
        });
    }

    static async allEntries(req, res) {
        const { id } = req.userData;
        const type = req.params.type.split('s')[0];

        const data = await Entry.sameType(id, type);

        if (data.rowCount > 0) {
            return res.status(200).json({
                status: 200,
                data: data.rows
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entries found`
        });
    }

    static async singleEntry(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = await Entry.findOneEntry(id, type);

        if (data.rowCount === 1) {
            return res.status(200).json({
                status: 200,
                data: data.rows[0]
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }

    static async editLocation(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = await Entry.updateLocation(id, req.body.location, type, req.userData.id);

        if (data.rowCount === 1) {
            return res.status(201).json({
                status: 201,
                data: {
                    id: data.rows[0].id,
                    title: data.rows[0].title,
                    createdOn: data.rows[0].createdon,
                    updatedOn: data.rows[0].updatedon,
                    location: data.rows[0].location,
                    message: `Updated ${type} record's location`
                }
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }

    static async editComment(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = await Entry.updateComment(id, req.body.comment, type, req.userData.id);

        if (data.rowCount === 1) {
            return res.status(201).json({
                status: 201,
                data: {
                    id: data.rows[0].id,
                    title: data.rows[0].title,
                    createdOn: data.rows[0].createdon,
                    updatedOn: data.rows[0].updatedon,
                    comment: data.rows[0].comment,
                    message: `Updated ${type} record's comment`
                }
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }
}

export default EntryController;
