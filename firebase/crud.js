class Crud {
  constructor() {
    this.orderBy = "created_at";
    this.orderByType = "desc
    this.lastedDoc = null;
    this.list = [];
    this.pagination = 10;
  }
  
  paginate(pagination) {
    this.pagination = pagination;
  }
  
  addListConfig(field, config = {}) {
    this.list.push({field: field, config: config});
  }
}
