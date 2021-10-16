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
  
  startAt(lastDoc) {
    this.ref = this.ref.startAt(lastDoc);
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

  static async list(collection, config) {
    let ref = new Model(collection);
    if (config.orderBy == undefined) {
      ref = ref.orderBy("created_at");
    } else {
      ref = ref.orderBy(config.orderBy.field, config.orderBy.type); 
    }
    ref = ref.startAt(config.lastDoc || 0).limit(config.pagination || 10);
    let data = await ref.get();
    config.lastDoc = data[data.length - 1];
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

