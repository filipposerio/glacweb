
var  sql = require('mssql')  


module.exports = {
	
write: function  (vConfig,qString, callback) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("funzione write");
    console.log(vConfig);
    console.log(qString);
    console.log("##############################################");  

    new sql.ConnectionPool(vConfig).connect().then(pool => {
        return pool.request().query(qString)
        }).then(result => {
            console.log('funzione write OK write: ' +result );
            
            console.log(result.rowsAffected );
            sql.close();
            if (callback && typeof callback === "function") callback(result);
        }).catch(err => {
            console.dir("funzione write errore SQL.ON error: " + err);
            console.log(vConfig);
            if (callback && typeof callback === "function") callback("",err);
          sql.close();
        });
  },

  read: function  (vConfig,qString, callback) {
    //console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("           funzione read");
    console.log(vConfig);
    console.log("           "+ qString);
    //console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
    new sql.ConnectionPool(vConfig).connect().then(pool => {
        return pool.request().query(qString)
        }).then(result => {
            console.log('funzione read OK read: ' +result );
            
            //console.log(result);        
            //console.log(result.recordset[0].Numero_ric);
            //console.log(result.rowsAffected );
            sql.close();
            if (callback && typeof callback === "function") callback(result);
        }).catch(err => {
            console.dir("funzione read errore SQL.ON error READ: "  + err);
            console.log(vConfig);
            if (callback && typeof callback === "function") callback("",err);
          sql.close();
        });
  }

};

