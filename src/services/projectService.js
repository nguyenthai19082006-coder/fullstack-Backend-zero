const Project = require("../models/project");
const aqp = require("api-query-params").default;

module.exports = {
  createProjectService: async (projectData) => {
    if (projectData.type == "EMPTY-PROJECT") {
      let result = await Project.create(projectData);
      return result;
    }

    if (projectData.type == "ADD-USERS") {
      console.log("check data: ", projectData);
      // find project by id
      let myProject = await Project.findById(projectData.projectId).exec();

      for (let i = 0; i < projectData.userArr.length; i++) {
        myProject.userInfo.push(projectData.userArr[i]);
      }
      let result = await myProject.save();
      return result;
    }

    if (projectData.type == "ADD-TASKS") {
      let myProject = await Project.findById(projectData.projectId).exec();

      for (let i = 0; i < projectData.taskArr.length; i++) {
        myProject.tasks.push(projectData.taskArr[i]);
      }
      let result = await myProject.save();
      return result;
    }

    if (projectData.type == "REMOVE-USERS") {
      let myProject = await Project.findById(projectData.projectId).exec();

      // Cách 1: đơn giản hơn và trả về dữ liệu
      for (let i = 0; i < projectData.userArr.length; i++) {
        myProject.userInfo.pull(projectData.userArr[i]);
      }
      let result = await myProject.save();

      // Cách 2: hay hơn nhưng cũng khó hơn và nó trả về báo cáo trạng thái
      // let result = await Project.updateOne(
      //   { _id: projectData.projectId },
      //   { $pull: { userInfo: { $in: projectData.userArr } } },
      // );

      return result;
    }

    return null;
  },

  getProjectService: async (dataQuery) => {
    try {
      const page = dataQuery.page;
      let { filter, limit, population } = aqp(dataQuery);
      delete filter.page;

      let offset = (page - 1) * limit;

      let result = await Project.find(filter)
        .populate(population) // vì nối bằng id nên khi lấy project thì chỉ lấy kèm được id của các collection đã nối
        .skip(offset) // muốn lấy được cả thông tin của collection nối kèm project thì phải dùng populate() và gọi đến đúng thằng cần lấ<y></y>
        .limit(limit)
        .exec();
      // này populate, hãy lấy cho t thông tin theo các id đã có của các collection được truyền vô từ population đi
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateProjectService: async (data) => {
    try {
      let result = await Project.updateOne({ _id: data.id }, { ...data });

      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  deleteProjectService: async (id) => {
    try {
      // để kích hoạt plugin trong thư viện mongoose-delete khi soft delete, cần dùng đúng method
      let result = await Project.deleteById(id);

      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

// lấy data thì auto phân trang, và vì phân trang nên cần thư viện aqp để bóc tách

// mission:
// 1. đọc lại luồng khi thêm user vào project dưới hình thức ref,
// - phải có user trong tay, phải xác định được dự án nào cần thêm user bằng cách xác định id
// muốn thêm nhân viên vào 1 dự án thì mình phải biết dự án đó là dự án nào  // XONG 1
// 2. làm thêm phần validate data, kiểm tra xem nếu dữ liệu user đã có trong project thì không thêm nữa,
// còn chưa có thì push vào project
