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
}

export default EntryController;
