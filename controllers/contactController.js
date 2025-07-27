const Contact = require("../models/Contact");

// Criar novo contato
exports.createContact = async (request, reply) => {
  const { name, email, message } = request.body;

  try {
    const newContact = new Contact({ name, email, message });
    const savedContact = await newContact.save();
    return reply.code(201).send({ message: "Mensagem recebida com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};
