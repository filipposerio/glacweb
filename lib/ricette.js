var
conf = require('./config.js'),
mdb = require('./datiMariaDb.js'),
mssqldb = require('./datiMSSQL.js');
module.exports = {
  riepilogoContabileRicetta: function  (ricetta_map, socket) {
    const lconfig = conf.fnDatabase();
    console.log(ricetta_map)
    let qry="";
    qry = "update ricette set TASSISTITO="+ricetta_map.tassistito+", TRICETTA="+ricetta_map.tricetta+", tnetto="+ricetta_map.tnetto+" where idricetta="+ricetta_map.idRicetta
    console.log(qry)
    mdb.write(qry,function (err,result) {
      if (err) {
        console.log(err)
        socket.emit("riepilogoContabileRicetta", "KO")
      }
      else {
        console.log('ok riepilogoContabileRicetta update')
        console.log(result)
        if (result != undefined) {
           socket.emit("riepilogoContabileRicetta", "OK")
        }
        else {
          socket.emit("riepilogoContabileRicetta","KO")
        }
      }
    });
  },
  searchRicetteAccettazione: function  (user_map, socket) {
              const lconfig = conf.fnDatabase();
              console.log("scattata la searchRicetteAccettazione lato server");
              console.log(user_map)
              const qry = "select * from Ricette where idAccettazione =  '" + user_map + "'"
              mdb.read(qry,function (err,result) {
                if (err) {
                  console.log(err)
                  socket.emit("searchRicetteAccettazione", "")
                }
                else {
                  console.log('ok ritorno read searchRicetteAccettazione')
                  //console.log(result)
                  if (result != undefined) {
                    console.log(result[0])
                    console.log(result[0].DATACOMPILAZIONE)
                    if (result.hasOwnProperty('rowsAffected')) {
                      if (result.rowsAffected > 0) {
                        socket.emit("searchRicetteAccettazione", result)
                      }
                      else {
                        socket.emit("searchRicetteAccettazione","")
                      }
                    }
                    else {
                     socket.emit("searchRicetteAccettazione", result)
                    }
                  }
                  else {
                    socket.emit("searchRicetteAccettazione","")
                  }
                }
              });

  },
  createRicetta: function  (user_map, socket) {
    const lconfig = conf.fnDatabase();
    console.log(user_map)
    //const param = JSON.parse(user_map);
    //console.log(param)

    console.log(user_map.nome)
    console.log(user_map.cognome)
    const qry = "insert into ricette (NRICETTA,DATAFRUIZIONE,DATACOMPILAZIONE, idAccettazione,IDANAGRAFICA, CODESENZIONE,CODDIAGNOSI,SSN,ESENTE) values ('" + user_map.nRicetta+"','"+ user_map.dataFruizione+"','"+ user_map.dataRicetta+"','"+ user_map.idAccettazione+"','"+ user_map.idPaziente+"','"+user_map.codice_esenzione+"','"+user_map.diagnosi+"','"+user_map.ssn+"','"+user_map.esente+"')"

    console.log(qry)

    mdb.write(qry,function (err,result) {
      if (err) {
        console.log(err)
        socket.emit("createricetta", "KO")
      }
      else {
        console.log('ok ritorno insert')
        //console.log(result)
        if (result != undefined) {
           socket.emit("createricetta", "OK")
        }
        else {
          socket.emit("createricetta","KO")
        }
      }
    });

  },
  eliminaRicetta: function  (ricetta_map, socket) {

              const lconfig = conf.fnDatabase();
              console.log(ricetta_map.idRicetta)
              //const param = JSON.parse(user_map);
              //console.log(param)


              const qry = "delete from ricette where idRicetta ='" + ricetta_map.idRicetta+"'"

              console.log(qry)

              mdb.write(qry,function (err,result) {
                if (err) {
                  console.log(err)
                  socket.emit("deletericetta", "KO")
                }
                else {
                  console.log('ok ritorno delete')
                  console.log('stampo result')
                  console.log(result)
                  if (result.affectedRows > 0) {
                     socket.emit("deletericetta", "OK")
                  }
                  else {
                    socket.emit("deletericetta","KO")
                  }
                }
              });
  },
  esamiRicetta: function  (user_map, socket) {
    const lconfig = conf.fnDatabase();


    console.log("scattata la elenco esamiricetta lato server");
    console.log(user_map)
    const qry = "select * from EsamiPaziente a, prestazionilab b where idprescrizione =  '" + user_map + "' and b.idprestazione=a.idprestazione"
    mdb.read(qry,function (err,result) {
      if (err) {
        console.log(err)
        socket.emit("searchEsamiRicetta", "")
      }
      else {
        console.log('ok ritorno read searchEsamiRicetta')
        if (result != undefined) {
          if (result.hasOwnProperty('rowsAffected')) {
            if (result.rowsAffected > 0) {
              socket.emit("searchEsamiRicetta", result)
            }
            else {
              socket.emit("searchEsamiRicetta","")
            }
          }
          else {
           socket.emit("searchEsamiRicetta", result)
          }
        }
        else {
          socket.emit("searchEsamiRicetta","")
        }
      }
    });
},
aggiungiEsamiMulti: function  (user_map, socket,msg) {

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
      socket.emit("aggiungiEsameRicetta", "KO")
    }
    else {
      console.log('ok ritorno insertEsamiPaziente')
      //console.log(result)
      if (result.rowsAffected > 0) {
         socket.emit("aggiungiEsameRicetta", "OK")
      }
      else {
        socket.emit("aggiungiEsameRicetta","KO")
      }
    }
  });
},
aggiungiEsame: function  (user_map, socket) {
          const lconfig = conf.fnDatabase();
          console.log(user_map.idRicetta)
          //const param = JSON.parse(user_map);
          //console.log(param)


//          const qry = "insert into EsamiRicetta (idEsame,idRicetta, idAccettazione, num_esame,descrizione, codicePrestazione) values ('" + esame_map.idEsame+"','"+ esame_map.idRicetta+"','"+esame_map.idAccettazione+"','"+esame_map.num_esame+"','"+ esame_map.descrizione+"','"+ esame_map.codicePrestazione +"')"
          const qry = "insert into esamipaziente (idaccettazione,idprescrizione,idpaziente, idprestazione,tesame,ordine) values ('" + user_map.idAccettazione+"',"+ user_map.idRicetta+",'"+ user_map.idPaziente+"','"+ user_map.idPrestazione+"','"+ user_map.tEsame+"','1')"

          console.log(qry)

          mdb.write(qry,function (err,result) {
            if (err) {
              console.log(err)
              socket.emit("aggiungiEsameRicetta", "KO")
            }
            else {
              console.log('ok ritorno aggiungiEsameRicetta')
              //console.log(result)
              if (result.rowsAffected > 0) {
                 socket.emit("aggiungiEsameRicetta", "OK")
              }
              else {
                socket.emit("aggiungiEsameRicetta","KO")
              }
            }
          });
        },
  eliminaEsame: function  (esame_map, socket) {
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
        socket.emit("eliminaEsameRicetta", "KO")
      }
      else {
        console.log('ok ritorno eliminaEsameRicetta')
        //console.log(result)
        if (result.affectedRows > 0) {
           socket.emit("eliminaEsameRicetta", "OK")
        }
        else {
          socket.emit("eliminaEsameRicetta","KO")
        }
      }
    });
  },
  prestazioniRicetta: function  (prestazione_map, socket) {
                const lconfig = conf.fnDatabase();
                console.log("scattata la searchPrestazioniRicetta lato server");
                  //const qry = "select * from PrestazioniRicetta where idRicetta =  '" + prestazione_map.idRicetta + "'"
                  const qry = "select * from PrestazioniRicetta where idRicetta =  '" + prestazione_map + "'"
                  mdb.read(qry,function (err,result) {
                    if (err) {
                      console.log(err)
                      console.log("invio al client elenco VUOTO prestazioni")
                      socket.emit("searchPrestazioniRicetta", "")
                    }
                    else {
                      console.log('ok ritorno read searchPrestazioniRicetta')
                      if (result != undefined) {
                        if (result.hasOwnProperty('rowsAffected')) {
                          if (result.rowsAffected > 0) {
                            socket.emit("searchPrestazioniRicetta", result)
                          }
                          else {
                            socket.emit("searchPrestazioniRicetta","")
                          }
                        }
                        else {
                         socket.emit("searchPrestazioniRicetta", result)
                        }
                      }
                      else {
                        socket.emit("searchPrestazioniRicetta","")
                      }
                    }
                  });
                },
aggiungiPrestazioneRicetta: function  (prestazione_map, socket) {
  const lconfig = conf.fnDatabase();
  console.log("aggiungiPrestazioneRicetta:"+ prestazione_map.idRicetta)
  //const param = JSON.parse(user_map);
  //console.log(param)

  const qry = "insert into PrestazioniRicetta (IdRicetta,nRicetta,codicePrestazione,descrizione) values ('" + prestazione_map.idRicetta+"','"+ prestazione_map.nRicetta+ "','"+prestazione_map.codicePrestazione+"','"+ prestazione_map.descrizione+"')"


  console.log(qry)

  mdb.write(qry,function (err,result) {
    if (err) {
      console.log(err)
      socket.emit("aggiungiPrestazioneRicetta", "KO")
    }
    else {
      console.log('ok ritorno aggiungiPrestazioneRicetta')
      //console.log(result)
      if (result.rowsAffected > 0) {
         socket.emit("aggiungiPrestazioneRicetta", "OK")
      }
      else {
        socket.emit("aggiungiPrestazioneRicetta","KO")
      }
    }
  });

},
eliminaPrestazioneRicetta: function  (prestazione_map, socket) {
  const lconfig = conf.fnDatabase();
  console.log(prestazione_map)
  //const param = JSON.parse(user_map);
  //console.log(param)


  const qry = "delete from PrestazioniRicetta where idPrestazioneRicetta ='" + prestazione_map+"'"

  console.log(qry)

  mdb.write(qry,function (err,result) {
    if (err) {
      console.log(err)
      socket.emit("eliminaPrestazioneRicetta", "KO")
    }
    else {
      console.log('ok ritorno eliminaPrestazioneRicetta')
      //console.log(result)
      if (result.affectedRows > 0) {
         socket.emit("eliminaPrestazioneRicetta", "OK")
      }
      else {
        socket.emit("eliminaPrestazioneRicetta","KO")
      }
    }
  });
},
createRicettaWebMSSQL: function (lconfig,ricetta_map,result,socket) {
  console.log('stampo ElencoDettagliPrescrVisualErogato')
  console.log(result.ElencoDettagliPrescrVisualErogato)
  console.log(result.ElencoDettagliPrescrVisualErogato.DettaglioPrescrizioneVisualErogato[0]);
  let prestazioniricetta=[...result.ElencoDettagliPrescrVisualErogato.DettaglioPrescrizioneVisualErogato]

 const qry = "insert into ricette (nRicetta,datacompilazione, idAccettazione,idanagrafica,SSN,codesenzione,coddiagnosi) values ('" + ricetta_map.nRicetta+"','"+ result.dataCompilazione+"','"+ ricetta_map.idAccettazione+"','"+ ricetta_map.idPaziente+"','S','"+result.codEsenzione+"','"+result.descrizioneDiagnosi+"') SELECT SCOPE_IDENTITY() as insertId"
 //const qry = "insert into ricette (nRicetta,dataRicetta, idAccettazione,idPaziente) values ('" + ricetta_map.nRicetta+"','"+ result.dataCompilazione+"','"+ ricetta_map.idAccettazione+"','"+ ricetta_map.idPaziente+"')"

 console.log(qry)

 mdb.write(qry,function (err,result) {
   if (err) {
     console.log('errore ritorno insert')
     console.log(err)
     socket.emit("createricetta", "KO")
   }
   else {
     console.log('ok ritorno insert della ricetta. AGGIUNGO LE PRESTAZIONI')
     //console.log(result)
     console.log(result.recordset[0].insertId);
     const idRic = result.recordset[0].insertId

     console.log("insertID: " + idRic)
     if (result.rowsAffected[0] > 0) {
       console.log('ok ritorno insert emit OK')
       for (let kk=0; kk<prestazioniricetta.length; kk++) {
         const prest = prestazioniricetta[kk].codProdPrest
       //const qry = "insert into esamipaziente (IdRicetta,nRicetta,codicePrestazione,descrizione) values ('" + result.recordset[0].insertId+"','"+ nricetta+ "','"+prest+"','"+ prestazioniricetta[kk].descrProdPrest+"')"
       const qry = "insert into esamipaziente (IDACCETTAZIONE, IDPAZIENTE,IDPRESCRIZIONE,IDPRESTAZIONE,TESAME) SELECT  '" + ricetta_map.idAccettazione+"','"+ricetta_map.idPaziente+"','"+ result.recordset[0].insertId+", idprestazione,tariffaconvenzionato from prestazionilab where codiceprestazionessn='"+prest+"';"
       console.log(qry)
       mdb.write(qry,function (err,result) {
         if (err) {
           console.log('errore ritorno insert')
           console.log(err)
           socket.emit("createricetta", "KO")
         }
         else {
           console.log('ok ritorno insert')
           //console.log(result)
           if (result.rowsAffected > 0) {
             console.log('ok ritorno insert emit OK')
             const qry="insert into esamiricetta (idesame,idricetta,idaccettazione,num_esame,descrizione,codicePrestazione)  select '0','"+idRic+"','"+ricetta_map.idAccettazione+"',esami.num_esame,esami.descrizioneEsame,PrestazioniSSN.codicePrestazione from prestazioniSSN,EsamiPrestazioniSSN,esami where prestazioniSSN.codicePrestazione='"+ prest+"'and EsamiPrestazioniSSN.codicePrestazioneSSN =PrestazioniSSN.codicePrestazione and esami.num_esame=EsamiPrestazioniSSN.num_Esame"
                   mdb.write(qry,function (err,result) {
                     if (err) {
                       console.log('errore ritorno insert')
                       console.log(err)
                       socket.emit("createricetta", "KO")
                     }
                     else {
                       console.log('ok ritorno insert')
                       //console.log(result)
                       if (result.rowsAffected > 0) {
                         console.log('ok ritorno insert esami prestazioni e ricetta DEM emit OK')
                         socket.emit("createricetta", "OK")
                       }
                       else {
                         console.log('ok ritorno insert emit KO')
                         socket.emit("createricetta","KO")
                       }
                     }
                   });
           }
           else {
             console.log('ok ritorno insert emit KO')
             socket.emit("createricetta","KO")
           }
         }
       });
     }
       socket.emit("createricetta", "OK")
     }
     else {
       console.log('ok ritorno insert emit KO')
       socket.emit("createricetta","KO")
     }
   }
 });

},
createRicettaWebMariaDB: function (lconfig,ricetta_map,result,socket) {

  console.log('stampo ElencoDettagliPrescrVisualErogato')
  console.log(result.ElencoDettagliPrescrVisualErogato)
  console.log(result.ElencoDettagliPrescrVisualErogato.DettaglioPrescrizioneVisualErogato[0]);
  let prestazioniricetta=[...result.ElencoDettagliPrescrVisualErogato.DettaglioPrescrizioneVisualErogato]

 //const qry = "insert into ricette (nRicetta,dataRicetta, idAccettazione,idPaziente) values ('" + ricetta_map.nRicetta+"','"+ result.dataCompilazione+"','"+ ricetta_map.idAccettazione+"','"+ ricetta_map.idPaziente+"') SELECT SCOPE_IDENTITY() as insertId"

 const qry = "insert into ricette (nRicetta,datacompilazione, idAccettazione,idAnagrafica,codesenzione) values ('" + ricetta_map.nricetta+"','"+ result.dataCompilazione+"','"+ ricetta_map.idAccettazione+"','"+ ricetta_map.idPaziente+"','"+result.codEsenzione+"')"

 console.log(qry)

 mdb.write(qry,function (err,result) {
   if (err) {
     console.log('errore ritorno insert')
     console.log(err)
     socket.emit("createricetta", "KO")
   }
   else {
     console.log('ok ritorno insert della ricetta. AGGIUNGO LE PRESTAZIONI')
     console.log(result)
     console.log(result.insertId);
     const idRic = result.insertId

     console.log("insertID: " + idRic)
     if (result != 'undefined') {
       console.log('ok ritorno insert emit OK')
       for (let kk=0; kk<prestazioniricetta.length; kk++) {
         const prest = prestazioniricetta[kk].codProdPrest
       //const qry = "insert into PrestazioniRicetta (IdRicetta,nRicetta,codicePrestazione,descrizione) values ('" + result.insertId+"','"+ ricetta_map.nricetta+ "','"+prest+"','"+ prestazioniricetta[kk].descrProdPrest+"')"
        const qry = "insert into esamipaziente (IDACCETTAZIONE, IDPAZIENTE,IDPRESCRIZIONE,IDPRESTAZIONE,TESAME) SELECT  '" + ricetta_map.idAccettazione+"','"+ricetta_map.idPaziente+"','"+ idRic+"', idprestazione,tariffaconvenzionato from prestazionilab where codiceprestazionessn='"+prest+"';"
       console.log(qry)
       mdb.write(qry,function (err,result) {
         if (err) {
           console.log('errore ritorno insert')
           console.log(err)
           socket.emit("createricetta", "KO")
         }
         else {
           console.log('ok ritorno insert')

           //console.log(result)
           if (result != 'undefined') {
             console.log('ok ritorno insert emit OK')
             socket.emit("createricetta", "OK")
             // DOPO AVERE INSERITO LE PRESTAZIONI INSERISCO  GLI ESAMI....
             const qry="insert into esamiricetta (idesame,idricetta,idaccettazione,num_esame,descrizione,codicePrestazione)  select '0','"+idRic+"','"+ricetta_map.idAccettazione+"',esami.num_esame,esami.descrizioneEsame,PrestazioniSSN.codicePrestazione from prestazioniSSN,EsamiPrestazioniSSN,esami where prestazioniSSN.codicePrestazione='"+ prest+"'and EsamiPrestazioniSSN.codicePrestazioneSSN =PrestazioniSSN.codicePrestazione and esami.num_esame=EsamiPrestazioniSSN.num_Esame"
                  /* mdb.write(qry,function (err,result) {
                     if (err) {
                       console.log('errore ritorno insert')
                       console.log(err)
                       socket.emit("createricetta", "KO")
                     }
                     else {
                       console.log('ok ritorno insert')
                       //console.log(result)
                       if (result != 'undefined') {
                         console.log('ok ritorno insert esami prestazioni e ricetta DEM emit OK')
                         socket.emit("createricetta", "OK")
                       }
                       else {
                         console.log('ok ritorno insert emit KO')
                         socket.emit("createricetta","KO")
                       }
                     }
                   });*/
           }
           else {
             console.log('ok ritorno insert emit KO')
             socket.emit("createricetta","KO")
           }
         }
       });
     }
       socket.emit("createricetta", "OK")
     }
     else {
       console.log('ok ritorno insert emit KO')
       socket.emit("createricetta","KO")
     }
   }
 });
}
}
