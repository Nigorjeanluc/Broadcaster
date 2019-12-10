import nodemailer from 'nodemailer';

import Entry from '../models/entryModel';
import User from '../models/userModel';
import checkId from '../helpers/idChecker';

class EntryController {
    static async createEntry(req, res) {
        const userId = parseInt(req.userData.id, 10);
        const type = req.params.type.split('s')[0];
        const images = req.files.images.map(img => img.path.replace(/\\/g, '/'));
        const videos = req.files.videos.map(vid => vid.path.replace(/\\/g, '/'));
        const entry = new Entry(req.body, type, userId, images, videos);

        const addedEntry = await Entry.createEntry(entry);

        const user = await User.idExists(addedEntry.createdby);

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "bihireb1@gmail.com",
                pass: "bobo12345"
            }
        });
        const mailOptio = {
            from: "bihireb1@gmail.com",
            to: `${user.rows[0].email}`,
            subject: "Status update",
            text: `This is to inform you that the status of your ${addedEntry.type} about "${addedEntry.title}" was updated  to ${addedEntry.status}`
        };
        await transport.sendMail(mailOptio, (err, json) => {
            // if (err)
            //     return responseMsg.errorMsg(
            //         res,
            //         400,
            //         "there was an error while sending the email to user"
            //     );
        });

        return res.status(201).json({
            status: 201,
            message: `Created ${addedEntry.type} record`,
            data: {
                id: addedEntry.id,
                title: addedEntry.title,
                status: addedEntry.status,
                type: addedEntry.type,
                images: addedEntry.images,
                videos: addedEntry.videos,
                comment: addedEntry.comment,
                createdBy: user.rows[0].username,
                createdOn: addedEntry.createdon
            }
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
        if (isNaN(id) || !checkId(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = await Entry.findOneEntry(id, type);

        if (data.rowCount === 1) {
            const user = await User.idExists(data.rows[0].createdby);
            return res.status(200).json({
                status: 200,
                data: {
                    id: data.rows[0].id,
                    title: data.rows[0].title,
                    status: data.rows[0].status,
                    type: data.rows[0].type,
                    images: data.rows[0].images,
                    videos: data.rows[0].videos,
                    comment: data.rows[0].comment,
                    createdBy: user.rows[0].username,
                    createdOn: data.rows[0].createdon
                }
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
        if (isNaN(id) || !checkId(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = await Entry.updateLocation(id, req.body.location, type, req.userData.id);

        if (data.rowCount === 1) {
            const user = await User.idExists(data.rows[0].createdby);
            return res.status(200).json({
                status: 200,
                message: `Updated ${type} record's location`,
                data: {
                    id: data.rows[0].id,
                    title: data.rows[0].title,
                    type: data.rows[0].type,
                    location: data.rows[0].location,
                    status: data.rows[0].status,
                    images: data.rows[0].images,
                    videos: data.rows[0].videos,
                    comment: data.rows[0].comment,
                    createdBy: user.rows[0].username,
                    createdOn: data.rows[0].createdon,
                    updatedOn: data.rows[0].updatedon
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
        if (isNaN(id) || !checkId(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = await Entry.updateComment(id, req.body.comment, type, req.userData.id);

        if (data.rowCount === 1) {

            const user = await User.idExists(data.rows[0].createdby);
            return res.status(200).json({
                status: 200,
                message: `Updated ${type} record's comment`,
                data: {
                    id: data.rows[0].id,
                    title: data.rows[0].title,
                    type: data.rows[0].type,
                    location: data.rows[0].location,
                    status: data.rows[0].status,
                    images: data.rows[0].images,
                    videos: data.rows[0].videos,
                    comment: data.rows[0].comment,
                    createdBy: user.rows[0].username,
                    createdOn: data.rows[0].createdon,
                    updatedOn: data.rows[0].updatedon
                }
            });
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }

    static async deleteEntry(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        if (isNaN(id) || !checkId(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = await Entry.findOneEntry(id, type);

        if (data.rowCount === 1) {
            await Entry.deleteEntry(id, type, req.userData.id);

            return res.sendStatus(204);
        }
        return res.status(404).json({
            status: 404,
            error: `No ${type} entry with id: ${id} found`
        });
    }

    static async editStatus(req, res) {
        const type = req.params.type.split('s')[0];
        const { id } = req.params;
        const { isAdmin } = req.userData;

        if (isNaN(id) || !checkId(id)) {
            return res.status(404).json({
                status: 404,
                error: 'Endpoint not found'
            });
        }

        const data = await Entry.findOneEntry(id, type);

        if (data.rowCount === 1) {
            if (isAdmin) {
                const change = await Entry.updateStatus(id, req.body.status, type);
                const user = await User.idExists(data.rows[0].createdby);

                return res.status(200).json({
                    status: 200,
                    message: `Updated ${type} record's status`,
                    data: {
                        id: change.rows[0].id,
                        title: change.rows[0].title,
                        type: change.rows[0].type,
                        location: change.rows[0].location,
                        status: change.rows[0].status,
                        images: change.rows[0].images,
                        videos: change.rows[0].videos,
                        comment: change.rows[0].comment,
                        createdBy: user.rows[0].username,
                        createdOn: change.rows[0].createdon,
                        updatedOn: change.rows[0].updatedon
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