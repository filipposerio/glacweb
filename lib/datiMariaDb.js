const mariadb = require('mariadb');
conf = require('./config.js');
const lconfig = conf.fnDatabaseMARIADB();
let pool={}
pool = mariadb.createPool(lconfig);
module.exports = {
  write: function  (qString, callback) {
      pool.getConnection()
      .then(conn => {
        console.log("ok connessione")
        console.log('eseguo la qry: ' +qString)
        conn.query(qString)
          .then((rows) => {
            console.log("ok write")
            console.log(rows); //[ {val: 1}, meta: ... ]
            conn.end();
            if (callback && typeof callback === "function") callback(false,rows);
          })
          .catch(err => {
            //handle error
            console.log("errore  funzione mariadb write")
            callback(err,"");
            conn.end();
          })
      }).catch(err => {
        console.log("errore mariadb write connect")
        callback(err,"");
      });
    },
  read: function  (qString, callback) {
    //pool = mariadb.createPool(vConfig);
    console.log(lconfig)
    pool.getConnection()
    .then(conn => {
      console.log("funzione read ok connessione")
      console.log('eseguo la qry: ' +qString)

      conn.query(qString)
        .then((rows) => {
          console.log("funzione read ok select")
          //console.log(rows); //[ {val: 1}, meta: ... ]
          conn.end();
          if (callback && typeof callback === "function") callback(false,rows);
        })
        .catch(err => {
          //handle error
          console.log("errore mariadb read")
          callback(err,"");
          conn.end();
        })
    }).catch(err => {
      console.log("errore mariadb read connect")
      callback(err,"");
    });
  }
};
