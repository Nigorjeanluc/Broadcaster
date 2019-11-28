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

    static sameType(userId, type) {
        return entries.filter(entry => entry.type === type).filter(entry => entry.createdBy === parseInt(userId, 10));
    }

    static entryExists(id, type) {
        return entries.filter(entry => entry.type === type).find(entry => entry.id === parseInt(id, 10));
    }

    static entryOwner(id, type, userId) {
        return entries.filter(entry => entry.type === type).find(entry => entry.id === parseInt(id, 10) && entry.createdBy === parseInt(userId, 10));
    }

    static destroyEntry(entry) {
        return entries.splice(entries.indexOf(entry), 1);
    }
}

export default Entry;
