export default class Features {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObject = { ...this.queryString };
    const queryObjectAttributes = queryObject.attributes;
    delete queryObject["attributes"];

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach(element => delete queryObject[element]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => "$" + match);

    this.query.find(JSON.parse(queryStr));
    if (queryObjectAttributes) this.query.find({ attributes: { $all: queryObjectAttributes } });
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}