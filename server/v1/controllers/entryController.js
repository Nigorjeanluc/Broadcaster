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
            data: [{
                id: entry.id,
                message: `Created ${entry.type} record`
            }]
        });
    }
}

export default EntryController;