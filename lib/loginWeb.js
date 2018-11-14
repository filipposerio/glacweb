var
conf = require('./config.js'),
mdb = require('./datiMariaDb.js');
mssqldb = require('./datiMSSQL.js');
pgdb = require('./datiPgDb.js');
module.exports = {
  login: function  (user_map, socket) {

          const param = JSON.parse(user_map);
          console.log(param)
          console.log(param.username)
          const qry = "select * from loginweb a,erogatori b where a.username = '" + param.username + "' and a.password ='" + param.password+"' and b.iderogatore=a.iderogatore"
          console.log("login:" + qry)
          pgdb.read(qry,function (err,result) {
            if (err) {
              console.log("ramo err")
              console.log(err)
              socket.emit("login", "")
            }
            else {
              console.log('login: ok ritorno read')
              console.log(result)
              //console.log(result.length)
              //if (result.rowsAffected > 0) {
              console.log(result.rowCount)
                if (result.rowCount > 0) {
                    socket.emit("login", result.rows)
                  }
                  else {
                    socket.emit("login","")
                  }
              }

          });
    }
}
