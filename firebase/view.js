class View {
  constructor() {

  }

  static async list(crud) {
    let ref = new Model(crud.collection);
    
    let data = await ref.orderBy(crud.orderByField, crud.orderByType)
             .startAfter(crud.lastedDoc || new Date())
             .limit(crud.pagination)
             .get();

    crud.lastDoc = data[data.length - 1];

    let html = '<table class="table m-0">';
    html += '<thead>';
    html += '<tr>';
    crud.list.forEach(item => {
      html += '<th>' + item.config.header + '</th>';
    });
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    data.forEach(item => {
      let itemData = item.data();
      html += '<tr id="' + item.id + '">';
      crud.list.forEach(configItem => {
        html += '<td>' + itemData[configItem.field] +'</td>';
      });
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    return html;
  }
}
