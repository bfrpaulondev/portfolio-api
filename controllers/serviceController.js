const Service = require("../models/Service");

// Listar serviços ativos
exports.getServices = async (request, reply) => {
  try {
    const services = await Service.find({ isActive: true });
    return reply.code(200).send(services);
  } catch (error) {
    console.error("Erro ao obter serviços:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};

// Criar novo serviço
exports.createService = async (request, reply) => {
  const { title, description, price, icon, link, isActive = true } = request.body;

  try {
    const newService = new Service({ title, description, price, icon, link, isActive });
    const service = await newService.save();
    return reply.code(201).send(service);
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};
