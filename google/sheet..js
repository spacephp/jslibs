class Sheet {
  constructor (key) {
    this.key = key;
  }

  async read(url) {
    return await $.ajax({
      url: url,
      error: function (err) {
        console.log(err);
      }
    });
  }
  async write(data) {
    return await $.ajax({
      url: "https://script.google.com/macros/s/AKfycbx1Qf5v8faZTPSUgv07ee-bL3OKuVUYD4REpWN53X7S88Xh8lfO/exec",
      type: "post",
      data: data.serialize(),
      error: function (err) {
        console.log(err);
      }
    });
  }
}
