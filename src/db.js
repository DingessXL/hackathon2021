var mysql = require("mysql");
const moment = require("moment");

var conn;

function initDb() {
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
      if (err){
        reject(err);
      } else {
        console.log("Connected");
        resolve("connected")
      }
    });

  });
}

async function GetRandomDrawFromDB(limit) {
  return new Promise((resolve, reject) => {
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

async function GetAll() {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT JSON_OBJECT('id', c.id , 'name', c.name, 'description', c.description, 'category', c.category, 'img', c.img, 'claimedBy', c.claimedBy) as 'card' FROM cards c`,
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

    let sql1 = `INSERT INTO person (username, lastPull) VALUES ('${username}', NOW()) ON DUPLICATE KEY UPDATE lastPull = NOW()`;
    conn.query(sql1, (error, result, fields) => {
      if (error) console.log(error);
    });

    let sql2 = `SELECT JSON_OBJECT('id', p.id, 'username', p.username, 'lastPull', p.lastPull) from person p where username = '${username}'`;
    conn.query(sql2, (error, result, fields) => {
      if (error) console.log(error);
      resolve(result);
    });
  });
}

async function ClaimCard(username, id) {
  conn = mysql.createConnection({
    host: "db-mysql-nyc3-92852-do-user-10388635-0.b.db.ondigitalocean.com",
    port: 25060,
    database: "cardbot",
    user: "doadmin",
    password: "0u8jWt7J8cWBaSZh",
    ssl: true,
  });

  let sql = `UPDATE cards set claimedBy = if(claimedBy is null, '${username}', claimedBy) where id = ${id}`;
  conn.query(sql, (error, result, fields) => {
    console.log(sql);
    console.log(error);
  });
}

module.exports = {
  GetAll,
  initDb,
  GetRandomDrawFromDB,
  GetCardById,
  GetUserInfo,
  ClaimCard,
};
