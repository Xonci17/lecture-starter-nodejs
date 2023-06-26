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
    for (const i of Object.keys(searchBy)) {
      const result = this.dbContext.find({ [i]: searchBy[i] }).value();
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
