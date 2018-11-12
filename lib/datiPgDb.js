const { Pool, Client } = require('pg')

/*const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345678',
  port: 5432,
})*/

const pool = new Pool({
  user: 'ipwcbowgiosjmj',
  host: 'ec2-54-247-111-19.eu-west-1.compute.amazonaws.com',
  database: 'd9ca76hljd7aa2',
  password: '2b1630ee4221dafc2f07db26425e08a1baeff16b7a42b3d153013d783031f4af',
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
