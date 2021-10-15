class View {
  constructor() {

  }

  list(data) {
    let html = '<table class="table m-0">';
    html += '<thead>';
    html += '<tr>';
    html += '<th>Order ID</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    data.forEach(item => {
      let itemData = item.data();
      html += '<tr id="' + item.id + '">';
      html += '<td>Item</td>';                 
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    return html;
  }
}
