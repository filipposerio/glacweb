var
conf = require('./config.js'),
mdb = require('./datiMariaDb.js'),
mssqldb = require('./datiMSSQL.js');
module.exports = {

  searchEsamiConPrestazioni: function  (user_map, socket) {


    const lconfig = conf.fnDatabase();


    console.log("scattata la elecno esami lato server");
    console.log(user_map)
    //const qry = "select esamilab.num_esame NUM_INTERNO,esamilab.descrizione DESCRIZIONE, prestazionilab.num_interno NUM_PREST,prestazionilab.descrizione DESCRIZIONEPREST  from esamilab, prestazionilab where esamilab.descrizione like '%' and prestazionilab.num_interno = esamilab.num_prest order by num_esame;"
    const qry = "select a.*,b.*  from esamilab a , prestazionilab b where (a.descrizione like '%"+ user_map +"' or NUM_PREST like '%"+user_map+"' and b.num_prest = a.num_prest order by b.num_prest;"
    mdb.read(qry,function (err,result) {
      if (err) {
        console.log(err)
        socket.emit("searchEsamiConPrestazioni", "")
      }
      else {
        console.log('ok ritorno read searchEsamiConPrestazioni')
        //console.log(result)
        if (result != undefined) {
          if (result.hasOwnProperty('rowsAffected')) {
            if (result.rowsAffected > 0) {
              console.log('ok ritorno read searchEsamiConPrestazioni ritorno result')
              socket.emit("searchEsamiConPrestazioni", result)
            }
            else {
              socket.emit("searchEsamiConPrestazioni","")
            }
          }
          else {
           socket.emit("searchEsamiConPrestazioni", result)
          }
        }
      }
    });
},

searchEsamiDescrizione: function  (user_map, socket) {


            const lconfig = conf.fnDatabase();


            console.log("scattata la elecno esami lato server");
            console.log(user_map)
            //const qry = "select esamilab.num_esame NUM_INTERNO,esamilab.descrizione DESCRIZIONE, prestazionilab.num_interno NUM_PREST,prestazionilab.descrizione DESCRIZIONEPREST  from esamilab, prestazionilab where esamilab.descrizione like '%' and prestazionilab.num_interno = esamilab.num_prest order by num_esame;"
            const qry = "select a.*  from esamilab a where a.descrizione like '%' order by a.descrizione,a.num_esame;"
            mdb.read(qry,function (err,result) {
              if (err) {
                console.log(err)
                socket.emit("searchEsamiDescrizione", "")
              }
              else {
                console.log('ok ritorno read searchEsamiDescrizione')
                //console.log(result)
                if (result != undefined) {
                  if (result.hasOwnProperty('rowsAffected')) {
                    if (result.rowsAffected > 0) {
                      console.log('ok ritorno read searchCognome ritorno result')
                      socket.emit("searchEsamiDescrizione", result)
                    }
                    else {
                      socket.emit("searchEsamiDescrizione","")
                    }
                  }
                  else {
                   socket.emit("searchEsamiDescrizione", result)
                  }
                }
              }
            });
},

searchEsamiPrestazione: function  (user_map, socket) {


  const lconfig = conf.fnDatabase();


  console.log("scattata la elecno esami lato server");
  console.log(user_map)
  const qry = "select a.* from esamilab a, esamiprestazioni b where a.idesame=b.idesame and b.idprestazione = " + user_map +";"
  mdb.read(qry,function (err,result) {
    if (err) {
      console.log(err)
      socket.emit("searchEsamiPrestazione", "")
    }
    else {
      console.log('ok ritorno read searchEsamiPrestazione')
      //console.log(result)
      if (result != undefined) {
        if (result.hasOwnProperty('rowsAffected')) {
          if (result.rowsAffected > 0) {
            console.log('ok ritorno read searchEsamiPrestazione ritorno result')
            socket.emit("searchEsamiPrestazione", result)
          }
          else {
            socket.emit("searchEsamiPrestazione","")
          }
        }
        else {
         socket.emit("searchEsamiPrestazione", result)
        }
      }
    }
  });
}

}
