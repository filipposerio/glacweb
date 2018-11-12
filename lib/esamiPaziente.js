var
conf = require('./config.js'),
mdb = require('./datiMariaDb.js');
mssqldb = require('./datiMSSQL.js');
module.exports = {
  searchEsamiPaziente: function  (user_map, socket) {
  const lconfig = conf.fnDatabase();
  console.log("scattata la searchEsamiPaziente lato server");
    console.log(user_map)
    const qry = "select a.idesamepaziente, b.descrizione,b.tariffaconvenzionato,b.tariffapricato,c.nricetta from EsamiPaziente a, prestazionilab b, ricette c where a.idaccettazione =  '" + user_map + "' and b.idprestazione=a.idprestazione and c.idricetta=a.idpresrizione;"
    mdb.read(qry,function (err,result) {
      if (err) {
        console.log(err)
        socket.emit("searchEsamiPaziente", "")
      }
      else {
        console.log('ok ritorno read searchEsamiPaziente')
        //console.log(result)
        if (result != undefined) {
          if (result.hasOwnProperty('rowsAffected')) {
            if (result.rowsAffected > 0) {
              socket.emit("searchEsamiPaziente", result)
            }
            else {
              socket.emit("searchEsamiPaziente","")
            }
          }
          else {
           socket.emit("searchEsamiPaziente", result)
          }
        }
        else {
          socket.emit("searchEsamiPaziente","")
        }
      }
    });
  },
  insertEsamiPaziente: function  (user_map, socket) {

                const lconfig = conf.fnDatabase();
                console.log(user_map)
                //const param = JSON.parse(user_map);
                //console.log(param)
                const qry = "insert into esamipaziente (idaccettazione,idanagrafica,idricetta,idprestazione) values ('" + user_map.idAccettazione+"','"+ user_map.idPaziente+"','"+ user_map.idRicetta+"','"+ user_map.idPrestazione+"')"
                console.log(qry)
                mdb.write(qry,function (err,result) {
                  if (err) {
                    console.log(err)
                    socket.emit("insertEsamiPaziente", "KO")
                  }
                  else {
                    console.log('ok ritorno insertEsamiPaziente')
                    //console.log(result)
                    if (result.rowsAffected > 0) {
                       socket.emit("insertEsamiPaziente", "OK")
                    }
                    else {
                      socket.emit("insertEsamiPaziente","KO")
                    }
                  }
                });
    }
}
