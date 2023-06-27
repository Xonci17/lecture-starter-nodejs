import { dbAdapter } from "../config/db.js";
import { v4 } from "uuid";

class BaseRepository {
  constructor(collectionName) {
    this.dbContext = dbAdapter.get(collectionName);
    this.collectionName = collectionName;
  }

  generateId() {
    return v4();
  }

  getAll() {
    return this.dbContext.value();
  }

  getOne(search) {
    console.log(search);
    return this.dbContext.find({ id: search }).value();
  }

  findByFields(searchBy) {
    for (const key of Object.keys(searchBy)) {
      let result;
      if (key === "name") {
        const searchValue = searchBy[key].toLowerCase();
        result = this.dbContext
          .find((item) => item[key].toLowerCase() === searchValue)
          .value();
      } else {
        result = this.dbContext.find({ [key]: searchBy[key] }).value();
      }
      if (result) {
        return true;
      }
    }
    return false;
  }

  create(data) {
    data.id = this.generateId();
    data.createdAt = new Date();
    const list = this.dbContext.push(data).write();
    return list.find((it) => it.id === data.id);
  }

  update(id, dataToUpdate) {
    dataToUpdate.updatedAt = new Date();
    return this.dbContext.find({ id }).assign(dataToUpdate).write();
  }

  delete(id) {
    return this.dbContext.remove({ id }).write();
  }
}

export { BaseRepository };
