var mysql = require("mysql");
const moment = require("moment");

async function GetRandomDrawFromDB(limit) {
  return new Promise((resolve, reject) => {
    conn = mysql.createConnection({
      host: "db-mysql-nyc3-92852-do-user-10388635-0.b.db.ondigitalocean.com",
      port: 25060,
      database: "cardbot",
      user: "doadmin",
      password: "0u8jWt7J8cWBaSZh",
      ssl: true,
    });

    conn.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
    });

    conn.query(
      `SELECT JSON_OBJECT('id', c.id , 'name', c.name, 'description', c.description, 'category', c.category, 'img', c.img, 'claimedBy', c.claimedBy) as 'card' FROM cards c ORDER BY RAND() LIMIT ${limit}`,
      (error, result, fields) => {
        if (error) {
          return console.error(error.message);
        }
        resolve(result);
      }
    );
  });
}
async function GetCardById(id) {
  return new Promise((resolve, reject) => {
    conn = mysql.createConnection({
      host: "db-mysql-nyc3-92852-do-user-10388635-0.b.db.ondigitalocean.com",
      port: 25060,
      database: "cardbot",
      user: "doadmin",
      password: "0u8jWt7J8cWBaSZh",
      ssl: true,
    });

    conn.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
    });

    conn.query(
      `SELECT JSON_OBJECT('id', c.id , 'name', c.name, 'description', c.description, 'category', c.category, 'img', c.img, 'claimedBy', c.claimedBy) as 'card' FROM cards c WHERE id = ${id}`,
      (error, result, fields) => {
        if (error) {
          return console.error(error.message);
        }
        resolve(result);
      }
    );
  });
}

async function GetUserInfo(username) {
  return new Promise((resolve, reject) => {
    conn = mysql.createConnection({
      host: "db-mysql-nyc3-92852-do-user-10388635-0.b.db.ondigitalocean.com",
      port: 25060,
      database: "cardbot",
      user: "doadmin",
      password: "0u8jWt7J8cWBaSZh",
      ssl: true,
    });

    conn.connect(function (err) {
      if (err) throw err;
      console.log("Connected");
    });

    let sql = `
    IF NOT EXISTS (SELECT 'y' from person where username = '${username}') INSERT INTO person (username, lastPull) values ('${username}', '${moment().format("YYYY-MM-DD HH:mm:ss.000")}') SELECT JSON_OBJECT('id', p.id, 'lastPull', p.lastPull) from person p where username = '${username}';`;
    conn.query(sql, (error, result, fields) => {
        console.log(sql);
        console.log(error);
      resolve(result);
    });
  });
}

module.exports = {
  GetRandomDrawFromDB,
  GetCardById,
  GetUserInfo,
};
