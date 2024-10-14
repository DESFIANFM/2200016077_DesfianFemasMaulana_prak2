// src/service.js
const Repository = require("./repository");
const SecondaryRepository = require("./secondaryRepository");

class Service {
  constructor() {
    this.primaryRepository = new Repository();
    this.secondaryRepository = new SecondaryRepository();
  }

  getAllItems() {
    return [
      ...this.primaryRepository.getAllItems(),
      ...this.secondaryRepository.data, // Include data from the secondary repository
    ];
  }

  getItemById(id) {
    let item = this.primaryRepository.getItemById(id);
    if (!item) {
      item = this.secondaryRepository.getItemById(id);
    }
    if (!item) {
      throw new Error("Item not found in both repositories");
    }
    return item;
  }

  addItem(name) {
    const newItem = { id: this.primaryRepository.data.length + this.secondaryRepository.data.length + 1, name };
    return this.primaryRepository.addItem(newItem);
  }

  deleteItem(id) {
    const deletedItem = this.primaryRepository.deleteItem(id);
    if (!deletedItem) {
      return this.secondaryRepository.deleteItem(id); // Try to delete from secondary repository if not found
    }
    return deletedItem; // Return the deleted item from primary repository
  }
}

module.exports = Service;
