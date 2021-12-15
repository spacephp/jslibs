class Model {
  constructor(tableName) {
    this.getOptions = {};
    this.table = tableName;
    this.ref = db.collection(tableName);
  }

  static collection(name) {
    let model = new Model(name);
    return model;
  }

  source(from) {
    this.getOptions = {
      source: 'cache'
    };
    return this;
  }

  orderBy(field, type = "asc") {
    this.ref = this.ref.orderBy(field, type);
    return this;
  }

  startAfter(lastDoc) {
    this.ref = this.ref.startAfter(lastDoc);
    return this;
  }

  limit(pagination) {
    this.ref = this.ref.limit(pagination);
    return this;
  }

  where(field, operator, value) {
    this.ref = this.ref.where(field, operator, value);
    return this;
  }

  async findById(id) {
    return await this.ref.doc(id).get();
  }

  async get() {
    let docs;
    try {
      docs = await this.ref.get(this.getOptions);
    } catch (err) {console.log(err);}
    if (docs.empty) {
      docs = await this.ref.get();
    }
    return docs.docs;
  }

  async all() {
    return this.get();
  }

  async create(data) {
    try {
      return await this.ref.add(data);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async update(id, data) {
    try {
      await this.ref.doc(id).update(data);
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }
  
  async sum(field) {
    let docs = await this.get();
    let total = 0;
    docs.forEach(doc => {
      let data = doc.data();
      total += data[field];
    });
    return total;
  }

  async delete(id) {
    try {
      await this.ref.doc(id).delete();
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}

$( document ).ready(function() {
  const loginForm = document.querySelector('#login-form');
  const logout = document.querySelector('#logout');
  const signupForm = document.querySelector('#signup-form');

  // login
  if (loginForm != undefined) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // get user info
      const email = loginForm['login-email'].value;
      const password = loginForm['login-password'].value;
      // log the user in
      auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        $("#modal-login").modal("hide");
        loginForm.reset();
      });
    });
  }

  // logout
  if (logout != undefined) {
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      auth.signOut();
    });
  }

  // signup
  if (signupForm != undefined) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // get user info
      const email = signupForm['signup-email'].value;
      const password = signupForm['signup-password'].value;
      // sign up the user & add firestore data
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
        if (additionalData == undefined) return;
        return db.collection('users').doc(cred.user.uid).set(additionalData());
      }).then(() => {
        // close the signup modal & reset form
        $("#modal-signup").modal("hide");
        signupForm.reset();
      });
    });
  }

  // listen for auth status changes
  auth.onAuthStateChanged(async user => {
    if (!user) {
      if (loggedOut == undefined) location.reload();
      loggedOut();
    } else {
      loggedIn(user);
    }
  });
});

class Crud1 {
    constructor() {
      // variables
      this.formId = "crudForm";
      this.tableId = "crudTable";
      this.centerTextClass = "text-center";
      // model
      this.collection = this._get("ref");
      this.model = new Model(this.collection);
      // actions
      let _this = this;
      $("#" + this.tableId ).on('click', ".deleteBtn" ,async function() {
        if (confirm('Are you sure?')) {
          let id = $(this).closest('tr').attr('id');
          await _this.delete(id);
          _this.message(id + ' deleted!!!');
          _this.reset();
        }
      });
      $("#" + this.tableId ).on('click', ".editBtn" ,function() {
        let id = $(this).closest('tr').attr('id');
        _this.edit(id);
      });
    }

    _get(parameterName, def = "") {
      var result = null,
              tmp = [];
      var items = location.search.substr(1).split("&");
      for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      }
      if (result == undefined) {
        return def;
      }
      return result;
    }

    async init(config) {
      this.config = config[this.collection];
      await this.getReference();
    }

    setCenterTextClass(className) {
      this.centerTextClass = className;
    }

    async load() {
      this.create();
      this.table();
    }

    async getReference() {
      if (this.config.reference != undefined) {
        let ref = [];
        let model = new Model(this.config.reference.collection)
        let docs = await model.all();
        let options = "";
        docs.forEach(doc => {
          //this.message(doc.id + " " + doc.data()[this.config.reference.field]);
          ref[doc.id] = doc.data()[this.config.reference.field];
          options += "<option value=\"" + doc.id + "\">" + doc.data()[this.config.reference.field] + "</option>";
        });
        this.options = options;
        this.reference = ref;
      }
    }

    async create() {
      let _this = this;
      let html = "<div class=\"modal-body\">";
      html += "<input type=\"hidden\" class=\"form-control\" id=\"docId\" value=\'\'>";
      $.each(this.config.fields, function(i, field) {
        html += "<div class=\"form-group\">";
        html += "<label for=\"" + field.name + "\" class=\"control-label\">" + field.name + ":</label>";
        switch (field.type) {
          case "reference":
            html += "<select class=\"form-control\" name=\"" + field.name + "\" id=\"" + field.name + "\">";
            html += "<option disabled selected>Select...</option>";
            html += _this.options;
            html += "</select>";
            break;
          default:
            html += "<input type=\"text\" class=\"form-control\" name=\"" + field.name + "\" id=\"" + field.name + "\" required=\"\">";
        }
        html += "</div>";
      });
      html +=  "</div>";
      html +=  "<div class=\"modal-footer\">";

      html +=  "<button type=\"submit\" class=\"btn btn-primary\">Save</button>";
      html +=  "</div>";
      $("#" + this.formId).html(html);

      let createForm = document.querySelector('#crudForm');
      createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let values = $("#crudForm").serializeArray();
        let data = {};
        $.each(values, (i, val) => {
          data[val.name] = val.value;
        });
        $.each(this.config.fields, (i, field) => {
          switch (field.type) {
            case "number":
              data[field.name] = Number(data[field.name]);
              break;
            case "boolean":
              data[field.name] = (data[field.name] == "true");
              break;
            case "datetime":
              data[field.name] = new Date(data[field.name]);
          }
        });

        let id = $("#docId").val();
        if (id) {
          _this.update(id, data).then(() => {
            $("#docId").val("");
            _this.reset();
          });;
        } else {
          _this.store(data).then(() => {
            _this.reset();
          });
        }
      });
    }

    async edit(id) {
      let model = new Model(this.collection);
      let data = await model.findById(id);
      $("#docId").val(data.id);
      data = data.data();
      $.each(this.config.fields, (i, field) => {
        let value = data[field.name];
        switch (typeof(value)) {
          case "string":
            break;
          case "number":
            break;
          case "object":
            if (value.constructor.name == "ei") {
              value = dateToString(value.toDate())
            }
            break;
        }
        $("#" + field.name).val(value);
      });
    }

    async update(id, data) {
      console.log("save");
      let model = new Model(this.collection);
      let result = await model.update(id, data);
      console.log(result);
      if (! result) return false;
      console.log(data);
      this.callback("update", data);
      console.log("Save success");
      this.message("Saved success!!!");

      return result;
    }

    async store(data) {
      console.log("create");
      let model = new Model(this.collection);

      let result = await model.create(data);

      if (! result) return false;

      this.callback("update", data);
      console.log("create success");
      this.message("Added success!!!");
      
      return result;
    }

    callback(type, params) {
      if (this.config.callback != undefined && this.config.callback[type] != undefined) {
        this.config.callback[type](params);
      }
    }

    message(str) {
      if (typeof toastr !== 'undefined') {
        toastr.success(str);
      } else {
        alert(str);
      }
    }

    reset() {
      $('#crudForm').trigger("reset");
      this.table();
    }

    async delete(id) {
      let model = new Model(this.collection);
      let doc = await model.findById(id);
      let result = await model.delete(id);
      if (! result) return false;

      this.callback("delete", doc.data());

      return result;
    }

    async table() {
      let model = new Model(this.collection);
      model.orderBy(this.config.orderBy.field, this.config.orderBy.type);
      let data = await model.all();
      let html = "<tbody>";
      let title = this.titleHtml();
      $.each(data, (index, val) => {
        let doc = val.data();

        html += "<tr id=\'" + val.id + "\'>";
        $.each(this.config.fields, (i, field) => {
          let value = doc[field.name];
          switch (typeof(value)) {
            case "undefined":
              value = "...";
              break;
            case "string":
              break;
            case "number":
              break;
            case "object":
              if (value.constructor.name == "ei") {
                value = dateToString(value.toDate())
              }
              break;
          }
          switch (field.type) {
            case "reference":

              html += "<td>" + this.reference[value] + "</td>";
              break;
            default:
              html += "<td>" + value + "</td>";
          }
        });
        html += "<td><a href=\"javascript:void(0)\" class=\"editBtn\">Edit</a> | <a href=\"javascript:void(0)\" class=\"deleteBtn\">Delete</a></td>";
        html += "</tr>";
      });

      html += "</tbody>";
      html = title + html;

      $("#crudTable").html(html);
    }

    titleHtml() {
      let title = "<thead><tr>";
      $.each(this.config.fields, (i, field) => {
        title += "<th class=\"" + this.centerTextClass + "\">" + field.name + "</th>";
      });
      title += "<td class=\"" + this.centerTextClass + "\">Action</td>";
      title += "</tr></thead>";
      return title;
    }
  }

  class Crud2 extends Crud1 {
    titleHtml() {
      let title = "<thead><tr>";
      $.each(this.config.fields, (i, field) => {
        if (field.title != undefined) {
          title += "<th class=\"" + this.centerTextClass + "\">" + field.title + "</th>";
        } else {
          title += "<th class=\"" + this.centerTextClass + "\">" + field.name + "</th>";
        }
      });
      title += "</tr></thead>";
      return title;
    }
  }

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

class Html {
  constructor() {

  }

  static options(el, data) {
    let html = "";
    data.forEach((item, index) => {
      html += '<option value="' + index + '">' + item + '</option>';
    });
    $(el).html(html);
  }

}



