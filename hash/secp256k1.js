class Secp256k1 {
  constructor() {
    this.pcurve = 2**256 - 2**32 - 2**9 - 2**8 - 2**7 - 2**6 - 2**4 -1;
    this.N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141;
    let Gx = 55066263022277343669578718895168534326250603453777594175500187360389116729240;
    let Gy = 32670510020758816978083085130507043184471273380659243275938904335757337482424;
    this.GPoint = [Gx,Gy];
  }

  EccMultiply(ScalarHex) {
    if (ScalarHex < 1000000000000 || ScalarHex >= this.N) {
      return false;
    }
    let ScalarBin = ScalarHex.toString(2);
    let Q = this.GPoint
    for (var i = 0; i < ScalarBin.length; i++) {
      let n = ScalarBin[i];
      Q = this.ECDouble(Q);
      if (n == "1") {
        Q = this.ECAdd(Q,This.GPoint); 
      }
    }
    return (Q)
  }

  ECDouble(Q) {
    let Lam = ((3*Q[0]*Q[0]+0) * this.modinv((2*Q[1]), this.Pcurve)) % this.Pcurve;
    let x = (Lam*Lam-2*Q[0]) % this.Pcurve;
    let y = (Lam*(Q[0]-x)-Q[1]) % this.Pcurve;
    return [x,y];
  }

  ECAdd(a, b) {
    let LamAdd = ((b[1]-a[1]) * this.modinv(b[0]-a[0], this.Pcurve)) % this.Pcurve;
    let x = (LamAdd*LamAdd-a[0]-b[0]) % this.Pcurve;
    let y = (LamAdd*(a[0]-x)-a[1]) % this.Pcurve;
    return [x,y];
  }

  modinv(a, n = this.Pcurve) {
    let lm = 1;
    let hm = 0;
    let low = a%n;
    let high = n;
    while (low > 1) {
      let ratio = high/low;
      let nm = hm-lm*ratio;
      let _new = high-low*ratio;
      lm = nm;
      low = _new;
      hm = lm;
      high = low;
    }
    return lm % n;
  }
}
