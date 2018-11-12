
var  sql = require('mssql');
const lconfig = conf.fnDatabaseMSSQL();


module.exports = {

write: function  (qString, callback) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("funzione write");
    console.log(lconfig);
    console.log(qString);
    console.log("##############################################");

    new sql.ConnectionPool(lconfig).connect().then(pool => {
        return pool.request().query(qString)
        }).then(result => {
            console.log('funzione write OK write: ' +result );

            console.log(result.rowsAffected );
            sql.close();
            if (callback && typeof callback === "function") callback(false,result);
        }).catch(err => {
            console.dir("funzione write errore SQL.ON error: " + err);

            if (callback && typeof callback === "function") callback(err,"");
          sql.close();
        });
  },

  read: function  (qString, callback) {
    //console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("           funzione read");
    console.log(lconfig);
    console.log("           "+ qString);
    //console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
    new sql.ConnectionPool(lconfig).connect().then(pool => {
        return pool.request().query(qString)
        }).then(result => {
            console.log('funzione read OK read: ')// +result );
            //console.log(result);
            //console.log(result.recordset[0].Numero_ric);
            //console.log(result.rowsAffected );
            sql.close();
            if (callback && typeof callback === "function") callback("",result);
        }).catch(err => {
            console.dir("funzione read errore SQL.ON error READ: "  + err);

            if (callback && typeof callback === "function") callback(err);
          sql.close();
        });
  },
  storedUpd: function  (vBarcode,vEsame, vRisultato, callback) {
    //console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("           funzione storedUpd");
    //console.log(vConfig);
    console.log("           "+ vEsame);
    console.log("           "+ vRisultato);
    //console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
    new sql.ConnectionPool(lconfig).connect().then(pool => {
        return pool.request().input('barcode', sql.NVarChar, vBarcode)
                            .input('num_esame', sql.NVarChar, vEsame)
                            .input('risultato', sql.NVarChar, vRisultato)
                            .output('stato', sql.NVarChar)
                            .output('msgout', sql.NVarChar)
                            .execute('UpdEsaApparecchiatura')
        }).then(result => {
            console.log('funzione OK stored procedure UPD: ' +result );
            console.log(result.recordsets.length) // count of recordsets returned by the procedure
            //console.log(result.recordsets[0].length) // count of rows contained in first recordset
            console.log(result.recordset) // first recordset from result.recordsets
            console.log(result.returnValue) // procedure return value
            console.log(result.output) // key/value collection of output values
            console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens



            console.log("ritorno della STORED UPDATE "+ result.output.msgout);
            sql.close();
            if (callback && typeof callback === "function") callback(result);
        }).catch(err => {
            console.dir("funzione  errore SQL.ON error STORED PROCEDURE UPD: "  + err);

            if (callback && typeof callback === "function") callback("",err);
          sql.close();
        });
  },
  storedQry: function  (vStored,vBarcode, callback) {
    console.log("           funzione storedQry1");
    console.log(vBarcode);


    new sql.ConnectionPool(lconfig).connect().then(pool => {
        return pool.request().input('barcode', sql.NVarChar, vBarcode)
                            .output('MSGOUT', sql.NVarChar)
                            .output('NOMINATIVO', sql.NVarChar)
                            .execute(vStored)
        }).then(result => {
            console.log('ATTENZIONE funzione OK stored procedure QRY: ' +result );
            console.log('funzione OK stored procedure: ' +result );
            /*console.log(result.recordsets.length) // count of recordsets returned by the procedure
            console.log(result.recordsets[0].length) // count of rows contained in first recordset
            console.log(result.recordset) // first recordset from result.recordsets
            console.log(result.returnValue) // procedure return value
            console.log(result.output) // key/value collection of output values
            console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
            */
            sql.close();

            if (callback && typeof callback === "function") callback(result);
        }).catch(err => {
            console.dir("ATTENZIONE funzione  errore SQL.ON error STORED PROCEDURE QRY: "  + err);
            //console.log(vConfig);
            if (callback && typeof callback === "function") callback("",err);
          sql.close();
        });
  }

};
