function dateToString(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;
  let y = date.getFullYear();
  return y + "-" + m + "-" + d;
}

let vnd = (amount) => {
  amount = parseInt(amount);
  let unit = amount % 1000;
  let thousand = parseInt((amount % 1000000)/1000);
  let mill = parseInt((amount % 1000000000)/1000000);
  let bill = parseInt(amount/1000000000);
  let format = "đ";
  if (amount < 1000) return unit + format;
  format = addZero(unit) + format
  if (amount < 1000000) return thousand + "." + format;
  format = addZero(thousand) + "." + format;
  if (amount < 1000000000) return mill + "." + format;
  format = addZero(mill) + "." + format;
  return bill + "." + format;
}

let addZero = (mod) => {
  if (mod >= 100) return mod;
  if (mod >= 10) return "0" + mod;
  return "00" + mod;
}

let percent = (amount) => {
  return parseFloat(amount).toFixed(2) + "%";
}
