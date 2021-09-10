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

  async delete() {

  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}
