class Model {
  constructor(tableName) {
    this.getOptions = {};
    this.table = tableName;
    this.ref = db.collection(tableName);
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

  async create(data, id = undefined) {
    if (id != undefined) {
      return await this.ref.doc(id).set(data);
    }
    return await this.ref.add(data);
  }

  async update(id, data) {
    return await this.ref.doc(id).update(data);
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

  async delete() {

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


class View {
  constructor() {
    
  }

  static async list(crud) {
    let ref = new Model(crud.collection);
    
    let data = await ref.orderBy(crud.orderByField, crud.orderByType)
             .startAfter(crud.lastedDoc || new Date())
             .limit(crud.pagination)
             .get();

    await crud.reference(data);
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
    console.log(crud.refData);
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
            
            let refType = configItem.config.reference.split(".");
            let id = itemData[configItem.field];
            console.log(refType); console.log(id); console.log(crud.refData[refType[0]]);
            console.log(crud.refData[refType[0]][id]);
            html += '<td>' + crud.refData[refType[0]][id] + '</td>';
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

class Crud {
  constructor(collection) {
    this.collection = collection;
    this.orderByField = "created_at";
    this.orderByType = "desc";
    this.lastedDoc = null;
    this.list = [];
    this.pagination = 10;
    this.refData = [];
  }

  orderBy(field, type="desc") {
    this.orderByField = field;
    this.orderByType = type;
  }
  
  paginate(pagination) {
    this.pagination = pagination;
  }
  
  addList(field, config = {}) {
    this.list.push({field: field, config: config});
  }

  async table() {
    return await View.list(this);
  }

  async reference(data) {
    this.list.forEach(item => {
      if (item.config.type != "reference") return;
      let info = item.config.reference.split(".");
      let collection = info[0];
      let field = info[1];

      if (this.refData[collection] == undefined) {
        this.refData[collection] = [];
      }
      
      data.forEach(async (doc) => {
        let id = doc.data()[item.field];
        if (this.refData[collection][id] == undefined) {
          let ref = new Model(info[0]);
          let data = await ref.findById(id);
          this.refData[collection][id] = data.data()[field];
        }
      });
    });
  }
}
