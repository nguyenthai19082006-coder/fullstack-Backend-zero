const Task = require("../models/task");
const aqp = require("api-query-params").default;

module.exports = {
  postTaskService: async (data) => {
    if (data.type == "EMPTY-TASK") {
      let result = await Task.create(data);

      return result;
    }

    return null;
  },

  getTaskService: async (dataQuery) => {
    try {
      let page = dataQuery.page;
      let { filter, limit } = aqp(dataQuery);
      delete filter.page;

      let offset = (page - 1) * limit;

      let result = await Task.find(filter).skip(offset).limit(limit).exec();

      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateTaskService: async (data) => {
    try {
      let result = await Task.updateOne({ _id: data.id }, { ...data });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  deleteTaskService: async (id) => {
    try {
      let result = await Task.deleteById(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
