class View {
  constructor() {

  }

  static list(collection, config) {
    let ref = new Model(collection);
    let data = await ref.all();

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
      config.forEach(configItem => {
        html += '<td>' + itemData[configItem.field] +'</td>';
      });
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    return html;
  }
}
