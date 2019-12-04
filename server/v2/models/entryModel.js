import pool from '../config/dbConnect';
import queries from "./queries";

class Entry {
    constructor({ title, location, comment }, type, userId, images, videos) {
        this.title = title;
        this.type = type;
        this.location = location;
        this.status = 'draft';
        this.images = images;
        this.videos = videos;
        this.comment = comment;
        this.createdBy = userId;
        this.createdOn = new Date();
        this.updatedOn = new Date();
    }

    static async createEntry(entry) {
        const addedEntry = await pool.query(queries.addEntry, [
            entry.title,
            entry.type,
            entry.location,
            entry.status,
            entry.images,
            entry.videos,
            entry.comment,
            entry.createdBy,
            entry.createdOn,
            entry.updatedOn
        ]);
        return addedEntry.rows[0];
    }

    static sameType(userId, type) {
        return pool.query(queries.findSameType, [userId, type]);
    }

    static findOneEntry(id, type) {
        return pool.query(queries.findOneEntry, [
            id, type
        ]);
    }
}

export default Entry;
