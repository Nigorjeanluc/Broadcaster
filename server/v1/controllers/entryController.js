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
}

export default EntryController;
