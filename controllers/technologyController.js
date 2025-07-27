const Technology = require("../models/Technology");

// Obter tecnologias
exports.getTechnologies = async (request, reply) => {
  try {
    const technologies = await Technology.find({ isActive: true });
    return reply.code(200).send(technologies);
  } catch (error) {
    console.error("Erro ao obter tecnologias:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};

// Criar nova tecnologia
exports.createTechnology = async (request, reply) => {
  const { name, category, logo, proficiencyLevel, isActive = true } = request.body;

  try {
    const newTech = new Technology({ name, category, logo, proficiencyLevel, isActive });
    const tech = await newTech.save();
    return reply.code(201).send(tech);
  } catch (error) {
    console.error("Erro ao criar tecnologia:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};
