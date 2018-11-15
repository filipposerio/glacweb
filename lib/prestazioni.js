var
conf = require('./config.js'),
mdb = require('./datiMariaDb.js'),
mssqldb = require('./datiMSSQL.js');
pgdb = require('./datiPgDb.js'),
module.exports = {

searchPrestazioniDescrizione: function  (user_map, socket,msg) {


            const lconfig = conf.fnDatabase();


            console.log("scattata la elecno prestazioni lato server");
            console.log(msg);
            console.log(user_map)
            //const qry = "select * from prestazionilab where descrizione like '%" + user_map + "%' order by codiceprestazionessn;"
            //const qry = "select a.*,count(0) NUMEROESAMI from prestazionilab a, esamiprestazioni b where a.descrizione like '%" + user_map + "%'  and b.idprestazione(+) = a.idprestazione group by a.idprestazione order by a.descrizione;"
            const qry = "select a.*,count(b.idprestazione) NUMEROESAMI from prestazionilab a  left join esamiprestazioni b ON a.idprestazione = b.idprestazione  where a.descrizione like '%"+ user_map +"%' group by a.idprestazione order by a.descrizione"
            console.log("searchPrestazioniDescrizione " + qry)
            pgdb.read(qry,function (err,result) {
              if (err) {
                console.log(err)
                socket.emit(msg, "")
              }
              else {
                  socket.emit(msg, result)
                }
            });
}

}
