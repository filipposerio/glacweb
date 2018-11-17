var
conf = require('./config.js'),
mdb = require('./datiMariaDb.js');
mssqldb = require('./datiMSSQL.js');
pgdb = require('./datiPgDb.js');
module.exports = {
  searchCognome: function  (user_map, socket,msg) {
    console.log("scattata la elecno pazienti lato server");
    console.log(user_map)
    const qry = "select * from anagrafica where upper(cognome) like '" + user_map.toUpperCase() + "%' order by cognome"
    console.log(qry)
    pgdb.read(qry,function (err,result) {
      if (err) {
        console.log("searchCognome: errore: " + err)
        socket.emit(msg, "")
      }
      else {
        console.log('ok ritorno read')
        //console.log(result)
        //console.log(result.length)
        //if (result.rowsAffected > 0) {
        console.log("searchCognome: " + result.rowCount)
        console.log("searchCognome: "+ result)
          if (result.rowCount > 0) {
              console.log("searchCognome: trovate righe. Le passo al client ")
              socket.emit(msg, result.rows)
            }
            else {
              console.log("searchCognome: non trovate righe. Passo al client elenco vuoto")
              socket.emit(msg,"")
            }
        }
    });

  },
  createPaziente: function  (user_map, socket) {

  console.log(user_map)
  //const param = JSON.parse(user_map);
  //console.log(param)

  console.log(user_map.nome)
  console.log(user_map.cognome)
  const qry = "insert into anagrafica (nome,cognome,sesso,cf,comunenascita,datanascita,indirizzoresidenza,comuneresidenza,telefono,email,ndocumento,distrettoasl) values ('" + user_map.nome+"','"+ user_map.cognome+"','"+ user_map.sesso+"','"+ user_map.cf+"','"+ user_map.comunenascita+"','"+ user_map.datanascita+"','"+user_map.indirizzoresidenza+"','"+user_map.comuneresidenza+"','"+user_map.telefono+"','"+user_map.email+"','"+user_map.ndocumento+"','"+user_map.distrettoasl+"')"
  console.log(qry)
  pgdb.write(qry,function (err,result) {
    if (err) {
      console.log(err)
      socket.emit("createpaziente", "KO")
    }
    else {
      console.log('ok ritorno insert')
      //console.log(result)
      if (result.hasOwnProperty('rowsAffected')) {
          if (result.rowsAffected > 0) {
           socket.emit("createpaziente", "OK")
         }
      }
      else {
        socket.emit("createpaziente","KO")
      }
    }
  });
},
updatePaziente: function  (user_map, socket) {

console.log(user_map)
//const param = JSON.parse(user_map);
//console.log(param)

console.log(user_map.nome)
console.log(user_map.cognome)
const qry = "update anagrafica set nome='"+user_map.nome+"', cognome='"+ user_map.cognome+"',cf='"+user_map.cf+"', comunenascita='"+user_map.comunenascita+"',comuneresidenza='"+user_map.comuneresidenza+"',indirizzoresidenza='"+user_map.indirizzoresidenza+"', telefono='"+user_map.telefono+"',email='"+user_map.email+"',datanascita='"+user_map.datanascita+"',NDOCUMENTO='"+user_map.ndocumento+"',DISTRETTOASL='"+user_map.distrettoasl+"' where idanagrafica="+user_map.idanagrafica;
console.log(qry)
pgdb.write(qry,function (err,result) {
  if (err) {
    console.log(err)
    socket.emit("updatepaziente", "KO")
  }
  else {
    console.log('ok ritorno insert')
    //console.log(result)
    if (result.hasOwnProperty('rowsAffected')) {
        if (result.rowsAffected > 0) {
         socket.emit("updatepaziente", "OK")
       }
    }
    else {
      socket.emit("updatepaziente","KO")
    }
  }
});
}
}
