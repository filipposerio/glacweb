var
conf = require('./config.js'),
pgdb = require('./datiPgDb.js');



module.exports = {
createRicettaWeb: function (lconfig,ricetta_map,socket) {
  
   let ric = ricetta_map.ric
    





    console.log("createRicettaWeb SIMULATA")
    console.log(ricetta_map)
    console.log(ric)
    console.log(ric.esami)
    console.log(ric.esami[0])
    console.log(ric.esami[1])
    console.log(ric.esami[2])
    const qry = "insert into ricette (nricetta,datacompilazione, datafruizione, idAccettazione,idAnagrafica,codesenzione) values ('" + ricetta_map.nricetta+"','"+ ric.dataCompilazione+"','"+ ricetta_map.dataFruizione+"','"+ ricetta_map.idAccettazione+"','"+ ricetta_map.idPaziente+"','"+ric.codEsenzione+"') returning idricetta insertId"
    console.log(qry)
    pgdb.write(qry,function (err,result) {
    if (err) {
        console.log('errore ritorno insert')
        console.log(err)
        socket.emit("createricetta", "KO")
    }
    else {
     console.log('ok ritorno insert della ricetta. AGGIUNGO LE PRESTAZIONI')
     console.log(result.rows[0].insertid);
     const idRic =result.rows[0].insertid
     console.log("insertID: " + idRic)
     console.log('ok ritorno insert ricetta. nuovo id ' + idRic)
     console.log('numero esami da inserire ' +ric.esami.length )
       let prest= "";
       for (let kk=0; kk<ric.esami.length; kk++) {
         if (kk>0 & kk!=ric.esami.length) {
             prest = prest + ","
            }
         prest = prest + "'"+ric.esami[kk]+"'"
        }
        console.log(prest)
        //inserire anche gli esiti in una tabella a parte.....se previsto. Dialisi no
       //const qry = "insert into PrestazioniRicetta (IdRicetta,nRicetta,codicePrestazione,descrizione) values ('" + result.insertId+"','"+ ricetta_map.nricetta+ "','"+prest+"','"+ prestazioniricetta[kk].descrProdPrest+"')"
        const qry = "insert into esamipaziente (idaccettazione, idpaziente,idprescrizione,idprestazione,tesame) SELECT  '" + ricetta_map.idAccettazione+"','"+ricetta_map.idPaziente+"','"+ idRic+"', idprestazione,tariffaconvenzionato from prestazionilab where codiceprestazionessn in ("+prest+");"
       console.log(qry)
       pgdb.write(qry,function (err,result) {
         if (err) {
           console.log('errore ritorno insert esamipaziente')
           console.log(err)
           socket.emit("createricetta", "KO")
         }
         else {
           console.log('ok ritorno insert esamipaziente')
           socket.emit("createricetta","OK")
           }
       });
     }
 });
}
}
