

const dataItaliana = (  dataInglese) => {

    return dataInglese.substring(8,10) + "-" + dataInglese.substring(5,7) + "-"+ dataInglese.substring(0,4); 
}

const dataInglese = (  dataItaliana) => {
    return dataItaliana.substring(6,10) + "-" + dataItaliana.substring(3,5) + "-"+ dataItaliana.substring(0,2); 
}

export { dataItaliana,dataInglese };
