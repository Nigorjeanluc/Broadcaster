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

    static updateLocation(id, location, type, userId) {
        return pool.query(queries.updateLocation, [
            parseInt(id, 10),
            location, type,
            parseInt(userId, 10),
            new Date()
        ]);
    }

    static updateComment(id, comment, type, userId) {
        return pool.query(queries.updateComment, [
            parseInt(id, 10),
            comment, type,
            parseInt(userId, 10),
            new Date()
        ]);
    }

    static updateStatus(id, status, type) {
        return pool.query(queries.updateStatus, [
            parseInt(id, 10),
            status, type,
            new Date()
        ]);
    }

    static deleteEntry(id, type, userId) {
        return pool.query(queries.deleteEntry, [
            parseInt(id, 10),
            type,
            parseInt(userId, 10)
        ]);
    }
}

export default Entry;
