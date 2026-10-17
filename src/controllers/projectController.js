const {
  createProjectService,
  getProjectService,
  updateProjectService,
  deleteProjectService,
} = require("../services/projectService");

module.exports = {
  postCreateNewProject: async (req, res) => {
    console.log(req.body);
    let result = await createProjectService(req.body);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  getAllProject: async (req, res) => {
    let result = await getProjectService(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  updateAProject: async (req, res) => {
    let { id, name, endDate, description } = req.body;
    let data = { id, name, endDate, description };

    let result = await updateProjectService(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  deleteAProject: async (req, res) => {
    let id = req.body.id;

    let result = await deleteProjectService(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
