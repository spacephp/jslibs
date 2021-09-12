class Chart {
  constructor() {
    
  }
  
  async csv(url) {
    let data = await $.ajax({
      url: url,
      method: "GET"
    });
    let formatArr = [];
    data = data.split("\n");
    let fields = data.shift().split(",");
    console.log(data);
    data.forEach((update) => {
      let values = update.split(",");
      let json = {};
      values.forEach((value, index) => {
        json[fields[index]] = value;
      });
      formatArr.push(json);
    });
    return formatArr; 
  }

  async json(ủrl) {
    let data = await $.ajax({
      url: url,
      method: "GET"
    });
    return data;
  }
  
}
