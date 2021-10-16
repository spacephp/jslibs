class View {
  constructor() {

  }

  static async list(crud) {
    let ref = new Model(crud.collection);
    let config = crud.config;
    
    let data = await ref.orderBy(config.orderByField, config.orderByType)
             .startAfter(config.lastedDoc || new Date())
             .limit(config.pagination)
             .get();

    config.lastDoc = data[data.length - 1];

    let html = '<table class="table m-0">';
    html += '<thead>';
    html += '<tr>';
    config.table.forEach(item => {
      html += '<th>' + item.header + '</th>';
    });
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    data.forEach(item => {
      let itemData = item.data();
      html += '<tr id="' + item.id + '">';
      config.table.forEach(configItem => {
        html += '<td>' + itemData[configItem.field] +'</td>';
      });
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    return html;
  }
}
