class View {
  constructor() {

  }

  list(data) {
    let config = {
      fullname: {
        header: "Full Name
      },
      equity: {
        header: "Equity"
      },
      ccq: {
        header: "CCQ"
      },
      created_at: {
        header: "Created At"
      }
    }
    let html = '<table class="table m-0">';
    html += '<thead>';
    html += '<tr>';
    config.forEach(item => {
      html += '<th>' + item.header + '</th>';
    });
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    data.forEach(item => {
      let itemData = item.data();
      html += '<tr id="' + item.id + '">';
      config.forEach((configItem, field) => {
        html += '<td>' + itemData[field] +'</td>';    
      });
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    return html;
  }
}
