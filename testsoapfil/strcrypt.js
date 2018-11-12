var crypto = require("crypto");
var path = require("path");
var fs = require("fs");

var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    const vPadding = crypto.constants.RSA_PKCS1_PADDING;
    /*let buffer =[]*/
    let buffer = new Buffer.from(toEncrypt,'utf8');

/*    let buffer = new ArrayBuffer(8);*/
    var encrypted = crypto.publicEncrypt({key: publicKey, padding: vPadding}, buffer);
    console.log('**************************************************************************************************************************************************************')
    console.log(publicKey)
    console.log(encrypted)
    console.log(encrypted[0])
    console.log(encrypted.toString('base64'))
    console.log('*************************************************************************************************************************************************************')
    
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

module.exports = {
    encryptStringWithRsaPublicKey: encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey: decryptStringWithRsaPrivateKey
}
/*const a = encryptStringWithRsaPublicKey('1302170925','.\\cert\\server\\SanitelCF.cer');
console.log(a);*/
