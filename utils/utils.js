var debug = _get("debug", false);

if (debug != false)
{
  //console.everything = [];
  console.defaultLog = console.log.bind(console);
  console.log = function(){
    debugMess({"type":"log", "datetime":Date().toLocaleString(), "value":Array.from(arguments)}); 
    //console.everything.push({"type":"log", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
    console.defaultLog.apply(console, arguments);
  }
  console.defaultError = console.error.bind(console);
  console.error = function(){
    debugMess({"type":"error", "datetime":Date().toLocaleString(), "value":Array.from(arguments)}); 
    //console.everything.push({"type":"error", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
    console.defaultError.apply(console, arguments);
  }
  console.defaultWarn = console.warn.bind(console);
  console.warn = function(){
    debugMess({"type":"warn", "datetime":Date().toLocaleString(), "value":Array.from(arguments)}); 
    //console.everything.push({"type":"warn", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
    console.defaultWarn.apply(console, arguments);
  }
  console.defaultDebug = console.debug.bind(console);
  console.debug = function(){
    debugMess({"type":"debug", "datetime":Date().toLocaleString(), "value":Array.from(arguments)}); 
    //console.everything.push({"type":"debug", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
    console.defaultDebug.apply(console, arguments);
  }

  $("body").ready(function () {
    $("body").append("<code id=\"debug\"></code>");
  })
}

function debugMess(mes) {
  if (typeof mes == 'object' ) {
    mes = JSON.stringify(mes);
  }
  if ($("#debug").length) {
    $("#debug").append("<br/><hr/><br/>");
    $("#debug").append(mes + "<br />");
  } else {
    alert(mes);
  }
}

function _get(parameterName, def = "") {
  var result = null,
      tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  if (result == undefined) {
    return def;
  }
  return result;
}

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
