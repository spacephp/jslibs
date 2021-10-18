class Html {
  constructor() {

  }

  static options(el, data) {
    let html = "";
    data.forEach((item, index) => {
      html += '<option value="' + index + '">' + item + '</option>';
    });
    return html;
  }

}
