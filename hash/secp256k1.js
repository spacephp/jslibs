class Secp256k1 {
  constructor() {
    this.pcurve = 2**256 - 2**32 - 2**9 - 2**8 - 2**7 - 2**6 - 2**4 -1;
    this.N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141;
    let Gx = 55066263022277343669578718895168534326250603453777594175500187360389116729240;
    let Gy = 32670510020758816978083085130507043184471273380659243275938904335757337482424;
    this.GPoint = [Gx,Gy];
  }

  EccMultiply(ScalarHex) {
    if (ScalarHex < 1000000000000 or ScalarHex >= this.N) {
      return false;
    }
    let ScalarBin = str(bin(ScalarHex))[2:]
    let Q = this.GPoint
    for i in range (1, len(ScalarBin)): # This is invented EC multiplication.
        Q=ECdouble(Q); # print "DUB", Q[0]; print
        if ScalarBin[i] == "1":
            Q=ECadd(Q,GenPoint); # print "ADD", Q[0]; print
    return (Q)
  }
}
