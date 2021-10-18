class Crud {
  constructor(collection) {
    this.collection = collection;
    this.orderByField = "created_at";
    this.orderByType = "desc";
    this.lastedDoc = null;
    this.list = [];
    this.pagination = 25;
    this.refData = {};
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

  async create() {

  }

  store() {

  }

  async edit() {

  }

  update() {

  }

  delete() {

  }

  async reference(collection, field) {
    let ref = new Model(collection);
    let data = await ref.all();
    this[collection] = [];
    data.forEach(doc => {
      this[collection][doc.id] = doc.data()[field];
    });
  }
}
