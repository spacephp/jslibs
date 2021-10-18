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
      html += '<th class="text-center">' + item.config.header + '</th>';
    });
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    data.forEach((item) => {
      let itemData = item.data();
      html += '<tr id="' + item.id + '">';
      crud.list.forEach(async (configItem) => {
        switch (configItem.config.type) {
          case "datetime":
            html += '<td class="text-center">' + dateToString(itemData[configItem.field].toDate()) +'</td>';
            break;
          case "vnd":
            html += '<td class="text-right">' + vnd(itemData[configItem.field]) +'</td>';
            break;
          case "float":
            html += '<td class="text-right">' + itemData[configItem.field] +'</td>';
            break;
          case "percent":
            html += '<td class="text-right">' + percent(itemData[configItem.field]) +'</td>';
            break;
          case "reference":
            let id = itemData[configItem.field];
            html += '<td>' + crud[configItem.config.reference][id] + '</td>';
            break;
          default:
            html += '<td>' + itemData[configItem.field] +'</td>';
        }
      });
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    return html;
  }
}
