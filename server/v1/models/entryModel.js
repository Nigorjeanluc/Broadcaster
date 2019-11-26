import entries from './entries.db';

class Entry {
    constructor({ title, location, comment }, type, userId, images, videos) {
        this.id = entries.length + 1;
        this.createdOn = new Date();
        this.createdBy = userId;
        this.title = title;
        this.type = type;
        this.location = location;
        this.status = 'draft';
        this.images = images;
        this.videos = videos;
        this.comment = comment;
    }

    static entrySaved(entry) {
        return entries.push(entry);
    }
}

export default Entry;