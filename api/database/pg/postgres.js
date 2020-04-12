const pg = require('pg');

const conexionPostgres = {
    user: process.env.USER_DATABASE,
    host: process.env.IP_DATABASE,
    database: process.env.DATABASE,
    password: process.env.PASS_DATABASE,
    port: 5432
}

const storePostgresql = async (query) => {
    const client = new pg.Client(conexionPostgres)
    // console.log(client);
    client.connect();
    return client.query(query)
        .then(response => {
            // console.log(response.rows)
            client.end()
            return response.rows[0]
        })
        .catch(err => {
            console.log(err);
            client.end()
            return err;
        })
}

module.exports = {
    storePostgresql
}
