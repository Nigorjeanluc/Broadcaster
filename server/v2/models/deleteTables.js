import pool from '../config/dbConnect';
import queries from "./queries";


const deleteTables = async() => {
    await pool.query(queries.deleteAllTables);
    process.stdout.write('Two Tables (users and entries) tables was deleted successfully\n');
};

(async() => {
    await pool.query(deleteTables);
})().catch(error => process.stdout.write(`${error}\n`));

export default deleteTables;
