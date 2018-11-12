var
conf = require('./config.js'),
mdb = require('./datiMariaDb.js');
mssqldb = require('./datiMSSQL.js');
module.exports = {
  totaleRicetteAccettazione: function  (accettazione_map, socket) {
    const lconfig = conf.fnDatabase();
    console.log(accettazione_map)

    const qry = "select sum(tricetta) TRICETTE,sum(tassistito) TASSITITO from ricette where idaccettazione = " + accettazione_map.idAccettazione
    mdb.read(qry,function (err,result) {
      if (err) {
        console.log(err)
        socket.emit("totaleRicetteAccettazione", "")
      }
      else {
        console.log('ok ritorno read totaleRicetteAccettazione')
        //console.log(result)
        if (result != undefined) {
          console.log(result.length)
          if (result.hasOwnProperty('rowsAffected')) {
            if (result.rowsAffected > 0) {
              socket.emit("totaleRicetteAccettazione", result)
            }
            else {
              socket.emit("totaleRicetteAccettazione","")
            }
          }
          else {
           socket.emit("totaleRicetteAccettazione", result)
          }
        }
        else {
          socket.emit("totaleRicetteAccettazione","")
        }
      }
    });
  },
  totalePrivatoAccettazione: function  (accettazione_map, socket) {
    const lconfig = conf.fnDatabase();
    console.log(accettazione_map)

    const qry = "select sum(tesame) TPRIVATO from esamiPaziente where idaccettazione =  '" + accettazione_map.idAccettazione + "' and idPrescrizione is null order by idaccettazione"
    mdb.read(qry,function (err,result) {
      if (err) {
        console.log(err)
        socket.emit("totalePrivatoAccettazione", "")
      }
      else {
        console.log('ok ritorno read totalePrivatoAccettazione')
        //console.log(result)
        if (result != undefined) {
          console.log(result.length)
          if (result.hasOwnProperty('rowsAffected')) {
            if (result.rowsAffected > 0) {
              socket.emit("totalePrivatoAccettazione", result)
            }
            else {
              socket.emit("totalePrivatoAccettazione","")
            }
          }
          else {
           socket.emit("totalePrivatoAccettazione", result)
          }
        }
        else {
          socket.emit("totalePrivatoAccettazione","")
        }
      }
    });

  },


  riepilogoContabileAccettazione: function  (accettazione_map, socket) {
    const lconfig = conf.fnDatabase();
    console.log(accettazione_map)

    const qry = "update accettazioni set TOTALELORDO="+accettazione_map.totaleLordo+", TOTALENETTO=0 where idaccettazione="+accettazione_map.idAccettazione
    //const qry = "update accettazioni set TOTALELORDO=( select sum(tesame) from esamipaziente where idaccettazione="+accettazione_map.idAccettazione+"), TOTALENETTO=0 where idaccettazione="+accettazione_map.idAccettazione;

    console.log(qry)

    mdb.write(qry,function (err,result) {
      if (err) {
        console.log(err)
        socket.emit("riepilogoContabileAccettazione", "KO")
      }
      else {
        console.log('ok riepilogoContabileAccettazione update')
        console.log(result)
        if (result != undefined) {
           socket.emit("riepilogoContabileAccettazione", "OK")
        }
        else {
          socket.emit("riepilogoContabileAccettazione","KO")
        }
      }
    });

  },
  searchAccettazioniPaziente: function  (user_map, socket) {
  const lconfig = conf.fnDatabase();
  console.log("scattata la searchAccettazioniPaziente lato server");
    console.log(user_map)
    const qry = "select * from Accettazioni where idanagrafica =  '" + user_map + "' order by idaccettazione"
    mdb.read(qry,function (err,result) {
      if (err) {
        console.log(err)
        socket.emit("searchAccettazioniPaziente", "")
      }
      else {
        console.log('ok ritorno read searchAccettazioniPaziente')
        //console.log(result)
        if (result != undefined) {
          console.log(result.length)
          for (let jj=0; jj<result.length; jj++){
            console.log(result[jj].DATAACCETTAZIONE);
          }
          if (result.hasOwnProperty('rowsAffected')) {
            if (result.rowsAffected > 0) {
              socket.emit("searchAccettazioniPaziente", result)
            }
            else {
              socket.emit("searchAccettazioniPaziente","")
            }
          }
          else {
           socket.emit("searchAccettazioniPaziente", result)
          }
        }
        else {
          socket.emit("searchAccettazioniPaziente","")
        }
      }
    });
  },
  createAccettazione: function  (user_map, socket) {

                const lconfig = conf.fnDatabase();
                console.log(user_map)
                //const param = JSON.parse(user_map);
                //console.log(param)

                console.log(user_map.nome)
                console.log(user_map.cognome)
                const qry = "insert into accettazioni (dataAccettazione, idanagrafica, idErogatore) values ('" + user_map.dataAccettazione+"','"+ user_map.idPaziente+"','"+ user_map.idErogatore+"')"

                console.log(qry)

                mdb.write(qry,function (err,result) {
                  if (err) {
                    console.log(err)
                    socket.emit("createaccettazione", "KO")
                  }
                  else {
                    console.log('ok ritorno insert')
                    //console.log(result)
                    if (result.rowsAffected > 0) {
                       socket.emit("createaccettazione", "OK")
                    }
                    else {
                      socket.emit("createaccettazione","KO")
                    }
                  }
                });
    },
    searchEsamiPrivato: function  (user_map, socket) {
      const lconfig = conf.fnDatabase();
      console.log("scattata la searchEsamiPrivato lato server");
        console.log(user_map)
        const qry = "select *,IFNULL(c.NRICETTA,'SENZA RICETTA') NRICETTA from  prestazionilab b, EsamiPaziente a left join ricette c on c.idricetta=a.idprescrizione where  a.idprestazione = b.idprestazione and  a.idaccettazione =  '" + user_map + "'  and a.idprescrizione is null order by nricetta;"
        mdb.read(qry,function (err,result) {
          if (err) {
            console.log(err)
            socket.emit("searchEsamiPrivato", "")
          }
          else {
            console.log('ok ritorno read searchEsamiPrivato')
            //console.log(result)
            if (result != undefined) {
              if (result.hasOwnProperty('rowsAffected')) {
                if (result.rowsAffected > 0) {
                  socket.emit("searchEsamiPrivato", result)
                }
                else {
                  socket.emit("searchEsamiPrivato","")
                }
              }
              else {
               socket.emit("searchEsamiPrivato", result)
              }
            }
            else {
              socket.emit("searchEsamiPrivato","")
            }
          }
        });
      },
    searchEsamiPaziente: function  (user_map, socket) {
      const lconfig = conf.fnDatabase();
      console.log("scattata la searchEsamiPaziente lato server");
        console.log(user_map)
        const qry = "select *,IFNULL(c.NRICETTA,'SENZA RICETTA') NRICETTA from  prestazionilab b, EsamiPaziente a left join ricette c on c.idricetta=a.idprescrizione where  a.idprestazione = b.idprestazione and  a.idaccettazione =  '" + user_map + "' order by nricetta;"
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
      insertEsamiPazienteMulti: function  (user_map, socket,msg) {

        const lconfig = conf.fnDatabase();
        console.log("insertEsamiPazienteMulti")
        console.log(user_map)
        //const param = JSON.parse(user_map);
        //console.log(param)
        //const qry = "insert into esamipaziente (idaccettazione,idanagrafica,idricetta,idprestazione) values ('" + user_map.idAccettazione+"','"+ user_map.idPaziente+"','"+ user_map.idRicetta+"','"+ user_map.idPrestazione+"')"

        let qry = "insert into esamipaziente (idaccettazione,idprescrizione,idpaziente, idprestazione,tesame,ordine) values ";

        let qryp2  =""
        for (let j=0; j<user_map.length; j++) {
          console.log("elemento "+ j +" - "+user_map[j])
          qryp2 = qryp2 + "('"+user_map[j].idAccettazione+"',"+ (user_map[j].idRicetta === '' ? null : "'"+user_map[j].idRicetta+"'") +",'"+ user_map[j].idPaziente+"','"+ user_map[j].idPrestazione+"','"+ user_map[j].tEsame+"','1')"
          if (j != user_map.length -1) {
            qryp2 = qryp2+','
          }

        }
        qry = qry+qryp2;
        console.log(qry)
        mdb.write(qry,function (err,result) {
          if (err) {
            console.log(err)
            socket.emit(msg, "KO")
          }
          else {
            console.log('ok ritorno insertEsamiPaziente')
            //console.log(result)
            if (result.rowsAffected > 0) {
               socket.emit(msg, "OK")
            }
            else {
              socket.emit(msg,"KO")
            }
          }
        });
},
      insertEsamiPaziente: function  (user_map, socket,msg) {

                    const lconfig = conf.fnDatabase();
                    console.log(user_map)
                    //const param = JSON.parse(user_map);
                    //console.log(param)
                    //const qry = "insert into esamipaziente (idaccettazione,idanagrafica,idricetta,idprestazione) values ('" + user_map.idAccettazione+"','"+ user_map.idPaziente+"','"+ user_map.idRicetta+"','"+ user_map.idPrestazione+"')"
                    const qry = "insert into esamipaziente (idaccettazione,idprescrizione,idpaziente, idprestazione,tesame,ordine) values ('" + user_map.idAccettazione+"',"+ (user_map.idRicetta === '' ? null : "'"+user_map.idRicetta+"'") +",'"+ user_map.idPaziente+"','"+ user_map.idPrestazione+"','"+ user_map.tEsame+"','1')"
                    console.log(qry)
                    mdb.write(qry,function (err,result) {
                      if (err) {
                        console.log(err)
                        socket.emit(msg, "KO")
                      }
                      else {
                        console.log('ok ritorno insertEsamiPaziente')
                        //console.log(result)
                        if (result.rowsAffected > 0) {
                           socket.emit(msg, "OK")
                        }
                        else {
                          socket.emit(msg,"KO")
                        }
                      }
                    });
        },
        eliminaEsameAccettazione: function  (esame_map, socket) {
          const lconfig = conf.fnDatabase();
          console.log(esame_map.idRicetta)
          //const param = JSON.parse(user_map);
          //console.log(param)

          // per SQLSERVER non vuuole DELETE FROM
          //const qry = "delete from EsamiRicetta where idEsameRicetta ='" + esame_map.idEsameRicetta+"'"
          const qry = "delete from EsamiPaziente where idEsamePaziente ='" + esame_map.idEsamePaziente+"'"

          console.log(qry)

          mdb.write(qry,function (err,result) {
            if (err) {
              console.log(err)
              socket.emit("eliminaEsameAccettazione", "KO")
            }
            else {
              console.log('ok ritorno eliminaEsameAccettazione')
              //console.log(result)
              if (result.affectedRows > 0) {
                 socket.emit("eliminaEsameAccettazione", "OK")
              }
              else {
                socket.emit("eliminaEsameAccettazione","KO")
              }
            }
          });
        }
}
