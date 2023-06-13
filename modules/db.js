
const mysql = require("mysql2/promise");

async function connect() {

    if (global.connection && global.connection.state !== 'disconnected' ) //&& global.connection.state
        return global.connection;

    const connection = mysql.createPool({    // mysql.createPool   .createConnection
        host: '107.180.94.5',
        user: 'theagenda_chatbot',
        password: 'mQ+LNwBHKZG',
        database: 'theagenda_chatbot',
        port: '3306',
        keepAliveInitialDelay: 10000,
        enableKeepAlive: true
    });

    console.log("Conectou no MySQL!");
    global.connection = connection;

    return connection;
}

async function selectCustomers() {
    const client = await connect();
    const [rows] = await client.query('SELECT * FROM cadastros_insta');
    return rows;
}

async function insertCustomer(customer) {
    const client = await connect();
    const sql = 'INSERT INTO cadastros_insta(email,senha,boas_vindas) VALUES (?,?,?);';
    const values = [customer.email, customer.senha, customer.boas_vindas];
    return await client.query(sql, values);
}

async function updateCustomer(id, customer) {
    const client = await connect();
    const sql = 'UPDATE cadastros_insta SET email =?, senha=?, boas_vindas=? WHERE id=?';
    const values = [customer.email, customer.senha, customer.boas_vindas, id];
    return await client.query(sql, values);
}

async function deleteCustomer(id) {
    const client = await connect();
    const sql = 'DELETE FROM cadastros_insta where id=?;';
    return await client.query(sql, [id]);
}

async function last_insert() {
    const client = await connect();
    const [rows] = await client.query('SELECT * FROM cadastros_insta WHERE id = (SELECT MAX(id) FROM cadastros_insta)');
    return rows[0];
}

async function find(id) {
    const client = await connect();
    const sql = 'SELECT * FROM cadastros_insta WHERE id = ?';
    const [rows] = await client.query(sql, [id]);
    return rows[0];
}

async function find_bot(id_bot) {
    const client = await connect();
    const sql = 'SELECT * FROM cadastros_insta WHERE id_bot = ?';
    const [rows] = await client.query(sql, [id_bot]);
    return rows[0];
}

module.exports = { connect, selectCustomers, insertCustomer, updateCustomer, deleteCustomer, last_insert, find, find_bot }


// use theagenda_chatbot;

// ALTER TABLE cadastros CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin

// create TABLE cadastros(
//      id int auto_increment PRIMARY KEY,
//      id_bot VARCHAR(40)NOT NULL,
//      nome VARCHAR(255)NOT NULL,
//      whatsapp VARCHAR(20) NOT NULL,
//      boas_vindas TEXT
//  );