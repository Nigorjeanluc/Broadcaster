const createUserTable = `
    CREATE TABLE IF NOT EXISTS
        users (
            id  SERIAL PRIMARY KEY,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            username VARCHAR(50) NOT NULL,
            is_admin boolean NOT NULL,
            password VARCHAR(255) NOT NULL,
            createdOn timestamp without time zone
)`;

const createEntryTable = `
    CREATE TABLE IF NOT EXISTS
        entries(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          location VARCHAR(255) NOT NULL,
          status VARCHAR(255) NOT NULL,
          images TEXT[] NOT NULL,
          videos TEXT[] NOT NULL,
          comment TEXT NOT NULL,
          createdBy INT NOT NULL,
          createdOn timestamp without time zone,
          updatedOn timestamp without time zone,
          FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE
)`;

const deleteAllTables = `
    DROP TABLE IF EXISTS
        users, entries`;

const addUser = `
    INSERT INTO
        users (firstname, lastname, email, phone_number, username, is_admin, password, createdOn)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;

const addEntry = `
    INSERT INTO
        entries (title, type, location, status, images, videos, comment, createdBy, createdOn, updatedOn)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`;

const findOneUser = `select * from users where email= $1`;

const findUserById = `select * from users where id= $1`;

const findOneUsername = `select * from users where username= $1`;

const findSameType = `select * from entries where createdBy = $1 and type= $2 order by updatedOn desc`;

const findOneEntry = `select * from entries where id= $1 and type= $2`;

const updateLocation = `UPDATE entries
                        SET location = $2, updatedOn = $5 WHERE id = $1 and type = $3 and createdBy = $4
                        RETURNING * `;

const updateComment = `UPDATE entries
                        SET comment = $2, updatedOn = $5 WHERE id = $1 and type = $3 and createdBy = $4
                        RETURNING * `;

const updateStatus = `UPDATE entries
                        SET status = $2, updatedOn = $4 WHERE id = $1 and type = $3
                        RETURNING * `;

const deleteEntry = `DELETE FROM entries WHERE id = $1 and type = $2 and createdBy = $3`;

export default {
    createUserTable,
    createEntryTable,
    deleteAllTables,
    findOneUser,
    findUserById,
    findOneUsername,
    findSameType,
    findOneEntry,
    addUser,
    addEntry,
    updateLocation,
    updateComment,
    updateStatus,
    deleteEntry
};
