
var os = require("os");
var fs = require('fs');
conf = require('./config.js');

const nomiMesi = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO",
    "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"
  ];
  
module.exports = {

 stampaStringaInChiaro: function (pFrame ) {
	var strDecode = "";
	
	//console.log("stampaStringaInChiaro: Inizio");
	//console.log(pFrame);
	
	for (j=0; j<pFrame.length; j++) {
		//console.log("ciclo for " +pFrame[j].charCodeAt(0));
		switch(pFrame[j].charCodeAt(0)) {
			case 2: 
				strDecode = strDecode + "<STX>";				
				break;
			case 3: 
				strDecode = strDecode + "<ETX>";
				break;				
			case 4: 
				strDecode = strDecode + "<EOT>";
				break;				
			case 5: 
				strDecode = strDecode + "<ENQ>";
				break;				
			case 10: 
				strDecode = strDecode + "<LF>";
				break;				
			case 13: 
				strDecode = strDecode + "<CR>";
				break;				
			default:
				strDecode = strDecode + pFrame[j];
				break; 
		}
	}
		//console.log("..."+ strDecode+ "...");
		//console.log("stampaStringaInChiaro: fine");
		return(strDecode);
},
	calcoloChecksum: function (pFrame ) {
	var byteval;
	var sumOfChars;
	var checksum;
	var j;

	sumOfChars =0;
		for (j=0; j< pFrame.length; j++) {
		// case STX non considerare....
		// case ETX completato e non considerare STX e ETX nel calcolo
		//console.log(j);
		carattere = pFrame.substring(j,j+1);
		byteval = carattere.charCodeAt(0);
		switch(byteval) {
			case 2:
				sumOfChars = 0;
				break;
			case 3:
				sumOfChars += byteval;
				break;
			default:
				sumOfChars += byteval;
				break;
		}
		//console.log(sumOfChars);
	}
	if (sumOfChars > 0 ) {
		sumOfChars = sumOfChars % 256;
		//console.log("sumofChars: " + sumOfChars);
			checksum = sumOfChars.toString(16).toUpperCase();
	}
//	console.log("calcolo checksum: " + checksum);
	return checksum;
},
 estraiBarcode: function (pFrame) {
 	var barcode;
 	console.log("estrai barcode inizio");
 	for (k=0; k< pFrame.length; k++) {
 		console.log(pFrame[k]);
 		if (pFrame[k].indexOf(String('Q|'))) {
 			barcode =  pFrame[k];
 			console.log(barcode);
 		}
	}
	console.log("estrai barcode fine");
	return barcode;
 },
 
 prova: function (res) {
	console.log("scattata callback. stampo res " + res )
	console.log(res);
	console.log(res.recordset.length);
	for (k=0; k<res.recordset.length; k++) {
		console.log(res.recordset[k].delta1 + " "+  res.recordset[k].esame + " "+ res.recordset[k].risultato);
	}

	},
	
    fnNomeMese: function(pMese){
        return(nomiMesi[pMese])
    },
    fnNomeMesePrecedente: function(pMese){
        var vMese;

        if (pMese == 1) {
            vMese = 12
        }
        else {
            vMese = pMese -1
        }

        return(nomiMesi[vMese]);
    },
    fnDataGiorno: function(){
        const d = new Date();
        var a = d.getMonth()+1;
        var ret;
        if (a<10 ) a= "0"+a;
        //console.log(a);
        ret= d.getDate().toString() +a+ d.getFullYear().toString();
        return ret;
    },
    fnDataOra: function(){
        const d = new Date();
        var a = d.getMonth()+1;
        var ret;
        if (a<10 ) a= "0"+a;
        console.log(a);
        ret= d.getDate().toString() +a+ d.getFullYear().toString()+ '-'+ d.getHours().toString()+":"+d.getMinutes().toString()+":"+d.getSeconds().toString()+":"+d.getMilliseconds().toString()
        return ret;
	},
	fnSendMsg2: function(pFile, messaggio) {
		console.log(messaggio)
		fs.appendFileSync('fSyslogDati.txt', messaggio+ os.EOL);
		fs.appendFileSync("./barcode/"+pFile,messaggio+ os.EOL);
	},
	fnGetElencoBarcode: function getLogile(){
		var m;
		var str="";
		var elenco;
		var i=0;
		const testFolder = './barcode/';
		const fs = require('fs');
		fs.readdirSync(testFolder).forEach(file => {
			console.log(file);
			str=str+file+'@';
		 });
		 elenco = str.split('@')
		 return elenco;
	},
	fnDeleteElencoBarcode: function deleteLogFiles(){
		var m;
		var str="";
		var elenco;
		var i=0;
		const testFolder = 'barcode/';
		const fs = require('fs');
		fs.readdirSync(testFolder).forEach(file => {
			console.log("rimuovo il fil2:" + file);
			fs.unlink(testFolder +file)
			str=str+file+'@';
		 });
		 elenco = str.split('@')
		 return elenco;
	},
	fnDeleteBarcode: function deleteLogFileBarcode(vFile){
		var m;
		var str="";
		var elenco;
		var i=0;
		const testFolder = './barcode/';
		const fs = require('fs');
		console.log("elimino il file :" +testFolder + vFile );
		fs.unlink(testFolder +vFile)
	},
	escapeRegExp: function(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, " $&"); // $& means the whole matched string
	},
	 getDatabase: function(pBarcode) {
		var listadatabase= conf.fnBarcodeDb();
		var ldatabase="";
		var kk;
		checkDb = pBarcode.substring(0,3);
		console.log("cerco db corrispondente al barcode che inizia per ["+ checkDb + "]")
		for ( kk = 0; kk < listadatabase.length; kk++) {
			objDatabase = listadatabase[kk];
			if (objDatabase.idBarcode == checkDb) {
				console.log("Ok corrispondeza per " + pBarcode + ". database: "+  objDatabase.dbname)
				ldatabase = objDatabase.dbname;
				dbtrovato=1;
			}
		}
		return ldatabase;
	},
	dataItaliana: function(dataInglese) {
		//2018-02-23
		return dataInglese.substring(8,10) + "-" + dataInglese.substring(5,7) + "-"+ dataInglese.substring(0,4); 
	},
	dataInglese: function(dataItaliana) {
		//2018-02-23
		return dataItaliana.substring(6,10) + "-" + dataItaliana.substring(3,5) + "-"+ dataItaliana.substring(0,2); 
	},
};