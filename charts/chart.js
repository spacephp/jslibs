class Chart {
  constructor() {
    
  }
  
  async csv(url) {
    let data = await $.ajax({
      url: url,
      method: "GET"
    });
    let formatArr = [];
    data = data.split("\r\n");
    let fields = data.shift().split(",");
    data.forEach((update) => {
      if (update == "") return;
      let values = update.split(",");
      let json = {};
      values.forEach((value, index) => {
        json[fields[index].trim()] = value;
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
