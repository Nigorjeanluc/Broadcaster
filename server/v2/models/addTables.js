import pool from '../config/dbConnect';
import queries from "./queries";

const addTables = async() => {
    await pool.query(queries.createUserTable);
    await pool.query(queries.createEntryTable);
    process.stdout.write(
        "Two Tables (users and entries) created successfully\n"
    );
};

(async() => {
    await pool.query(addTables);
})().catch(error => process.stdout.write(`${error}\n`));

export default addTables;
