var
conf = require('./config.js'),
mdb = require('./datiMariaDb.js');
mssqldb = require('./datiMSSQL.js');
pgdb = require('./datiPgDb.js');

module.exports = {
  eliminaTurno: function  (turno_map, socket) {

              const lconfig = conf.fnDatabase();
              console.log(turno_map.idturnopaziente)
              //const param = JSON.parse(user_map);
              //console.log(param)


              const qry = "delete from turnopazienti where idturnopaziente ='" + turno_map.idturnopaziente+"'"

              console.log(qry)

              pgdb.write(qry,function (err,result) {
                if (err) {
                  console.log(err)
                  socket.emit("eliminaTurno", "KO")
                }
                else {
                  console.log('ok ritorno delete')
                  console.log('stampo result')
                  console.log(result)
                  if (result.affectedRows > 0) {
                     socket.emit("eliminaTurno", "OK")
                  }
                  else {
                    socket.emit("eliminaTurno","KO")
                  }
                }
              });
  },
  assegnaTurno: function  (user_map, socket) {

                const lconfig = conf.fnDatabase();
                console.log(user_map)
                //const param = JSON.parse(user_map);
                //console.log(param)

                console.log(user_map.nome)
                console.log(user_map.cognome)
                const qry = "insert into turnopazienti (idpaziente, turno,stanza, letto) values ('" + user_map.idPaziente+"','"+ user_map.turno+"','"+ user_map.stanza+"','"+ user_map.letto+"')"

                console.log(qry)

                pgdb.write(qry,function (err,result) {
                  if (err) {
                    console.log(err)
                    socket.emit("assegnaTurno", "KO")
                  }
                  else {
                    console.log('ok ritorno insert')
                    console.log(result)
                    if (result.rowCount > 0) {
                       socket.emit("assegnaTurno", "OK")
                    }
                    else {
                      socket.emit("assegnaTurno","KO")
                    }
                  }
                });
    },
    elencoPazientiPerTurno: function  (user_map, socket) {
      console.log("scattata la elencoPazientiPerTurno lato server");
      console.log(user_map)
      //const qry = "select * from turnoPazienti a, pazienti b where a.turno = '" + user_map + "'"
      const qry = "select * from turnoPazienti a, anagrafica b where a.turno='"+user_map+"' and b.idAnagrafica = a.idPaziente"
      pgdb.read(qry,function (err,result) {
        if (err) {
          console.log(err)
          socket.emit("elencoPazientiPerTurno", "")
        }
        else {
          console.log('ok ritorno read elencoPazientiPerTurno')
          console.log("righe: " + result);
          if (result.rowCount > 0) {
            console.log("searchCognome: trovate righe. Le passo al client ")
            socket.emit("elencoPazientiPerTurno", result.rows)
          }
          else {
            console.log("searchCognome: non trovate righe. Passo al client elenco vuoto")
            socket.emit("elencoPazientiPerTurno","")
          }
        }
      });
    }
  }
