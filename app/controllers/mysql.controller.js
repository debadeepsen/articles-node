const mysql = require('mysql');

// connect to the database
// Configuring the database
const dbConfig = require('../../config/mysql.config');

exports.query = (queryText) => {
    return new Promise((resolve, reject) => {
        let conn = mysql.createConnection(dbConfig);
        conn.connect(function (err) {
            if (err) {
                reject(err);
            }

            conn.query(queryText, function (err, res, fld) {
                if (err) {
                    console.error(err);
                    reject(err);
                }

                conn.end();

                resolve({ error: err, response: res, fields: fld });
            });
        });
    })
}