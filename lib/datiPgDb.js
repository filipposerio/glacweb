const { Pool, Client } = require('pg')

/*const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345678',
  port: 5432,
})*/

const pool = new Pool({
  user: 'mupppdpjdcpvcu',
  host: 'ec2-54-228-212-134.eu-west-1.compute.amazonaws.com',
  database: 'd7259uuvlafjq0',
  password: '575919750c3b005760d24c25872d0d1c2c19e69f89a770faaac9a4df135168a0',
  port: 5432,
  ssl: true
})

module.exports = {
read: function  (qString, callback) {
    //pool = mariadb.createPool(vConfig);
    //console.log(lconfig)
    
    pool.query(qString, (err, res) => {
      console.log("pg read errore se presente: " + err)      
      if (callback && typeof callback === "function") callback(err,res)
      //pool.end()
    });
  },
  write: function  (qString, callback) {
    pool.query(qString, (err, res) => {
      console.log("pg write errore se presente: " + err)
      if (callback && typeof callback === "function") callback(err,res)
      //pool.end()
    });
  }
};
