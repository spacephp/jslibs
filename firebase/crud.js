class Crud {
  constructor(collection) {
    this.collection = collection;
    this.orderByField = "created_at";
    this.orderByType = "desc";
    this.lastedDoc = null;
    this.list = [];
    this.pagination = 10;
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
}
