const Project = require("../models/Project");

// Obter todos os projetos ativos
exports.getProjects = async (request, reply) => {
  try {
    const projects = await Project.find({ isActive: true });
    return reply.code(200).send(projects);
  } catch (error) {
    console.error("Erro ao obter projetos:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};

// Obter projeto por ID
exports.getProjectById = async (request, reply) => {
  try {
    const project = await Project.findById(request.params.id);
    if (!project) {
      return reply.code(404).send({ error: "Projeto não encontrado." });
    }
    return reply.code(200).send(project);
  } catch (error) {
    console.error("Erro ao obter projeto:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};

// Obter projetos por categoria
exports.getProjectsByCategory = async (request, reply) => {
  try {
    const projects = await Project.find({
      category: request.params.category,
      isActive: true
    });
    return reply.code(200).send(projects);
  } catch (error) {
    console.error("Erro ao obter projetos por categoria:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};

// Criar novo projeto
exports.createProject = async (request, reply) => {
  const { title, description, category, imageUrl, projectUrl, isActive = true } = request.body;

  try {
    const newProject = new Project({ title, description, category, imageUrl, projectUrl, isActive });
    const saved = await newProject.save();
    return reply.code(201).send(saved);
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};

// Atualizar projeto
exports.updateProject = async (request, reply) => {
  const { title, description, category, imageUrl, projectUrl, isActive } = request.body;

  try {
    const project = await Project.findByIdAndUpdate(
      request.params.id,
      { title, description, category, imageUrl, projectUrl, isActive },
      { new: true }
    );
    if (!project) {
      return reply.code(404).send({ error: "Projeto não encontrado." });
    }
    return reply.code(200).send(project);
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};

// Remover projeto
exports.deleteProject = async (request, reply) => {
  try {
    const project = await Project.findByIdAndDelete(request.params.id);
    if (!project) {
      return reply.code(404).send({ error: "Projeto não encontrado." });
    }
    return reply.code(200).send({ message: "Projeto removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover projeto:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};
