class Crypto {
  constructor() {
    
  }
  
  static getPublicKeyFromPrivate(priKey, type = "BTC") {
    let bnPriKey = new BN($priKey, 16);

    // Generating public key
    const publicKey = Secp256k1.generatePublicKeyFromPrivateKeyData(bnPriKey);
    
    let pubKeyStr = publicKey.x + "" + publicKey.y;
    if (type == "BTC") {
      pubKeyStr = "04" + pubKeyStr;
    }
    if (type = "ETH") {
      
    }
    return pubKeyStr;
  }
  
  static getAddressFromPublicKey(pubKey, type = "BTC") {
    if (type == "BTC") {
      return this.getBTCAddress(pubKey);
    }
    if (type == "ETH") {
      return this.getETHAddress(pubKey);
    }
    return false;
  }
  
  static getBTCAddress(pubKey) {
    return false;
  }
  
  static getETHAddress(pubKey) {
    return false;
  }
}
