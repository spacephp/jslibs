class Crud {
  constructor(collection) {
    this.orderBy = "created_at";
    this.orderByType = "desc
    this.lastedDoc = null;
    this.list = [];
    this.pagination = 10;
  }

  orderBy(field, type="desc") {
    this.orderBy = field;
    this.orderByType = type;
  }
  
  paginate(pagination) {
    this.pagination = pagination;
  }
  
  addList(field, config = {}) {
    this.list.push({field: field, config: config});
  }

  async list() {
    return await View.list(this);
  }
}
