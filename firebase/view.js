class View {
  constructor() {

  }

  list() {
    let html = '<table class="table m-0">';
    html += '<thead>';
    html += '<tr>';
    html += '<th>Order ID</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    html += '<tr>';
    html += '<td><a href="pages/examples/invoice.html">OR9842</a></td>';                 
    html += '</tr>';
    html += '</tbody>';
    html += '</table>';
    return html;
  }
}
