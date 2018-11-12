var
conf = require('./config.js'),
mdb = require('./datiMariaDb.js');
mssqldb = require('./datiMSSQL.js');
pgdb = require('./datiPgDb.js');
module.exports = {
  searchCognome: function  (user_map, socket,msg) {
    console.log("scattata la elecno pazienti lato server");
    console.log(user_map)
    const qry = "select * from anagrafica where cognome like '" + user_map + "%' order by cognome"
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
              console.log("searchCognome: trovate righe. Le passo al client "+ result.rows)
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
  const qry = "insert into anagrafica (nome,cognome,sesso,cf,comuneNascita,dataNascita,indirizzoresidenza,comuneresidenza,telefono,email,ndocumento,distrettoasl) values ('" + user_map.NOME+"','"+ user_map.COGNOME+"','"+ user_map.SESSO+"','"+ user_map.CF+"','"+ user_map.COMUNENASCITA+"','"+ user_map.DATANASCITA+"','"+user_map.INDIRIZZORESIDENZA+"','"+user_map.COMUNERESIDENZA+"','"+user_map.TELEFONO+"','"+user_map.EMAIL+"','"+user_map.NDOCUMENTO+"','"+user_map.DISTRETTOASL+"')"
  console.log(qry)
  mdb.write(qry,function (err,result) {
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
const qry = "update anagrafica set nome='"+user_map.NOME+"', cognome='"+ user_map.COGNOME+"',cf='"+user_map.CF+"', comunenascita='"+user_map.COMUNENASCITA+"',comuneresidenza='"+user_map.COMUNERESIDENZA+"',indirizzoresidenza='"+user_map.INDIRIZZORESIDENZA+"', telefono='"+user_map.TELEFONO+"',email='"+user_map.EMAIL+"',datanascita='"+user_map.DATANASCITA+"',NDOCUMENTO='"+user_map.NDOCUMENTO+"',DISTRETTOASL='"+user_map.DISTRETTOASL+"' where idanagrafica="+user_map.IDANAGRAFICA;
console.log(qry)
mdb.write(qry,function (err,result) {
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
