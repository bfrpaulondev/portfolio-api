const Contact = require("../models/Contact");
const mailer = require("../utils/mailer");

exports.createContact = async (request, reply) => {
  const { name, email, message } = request.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Envio de e-mail
    await mailer.sendMail({
      from: `"Portfólio API" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `📬 Novo contato de ${name}`,
      text: message,
      html: `
        <h2>Nova mensagem recebida:</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <blockquote>${message}</blockquote>
      `
    });

    return reply.code(201).send({ message: "Mensagem enviada com sucesso!" });

  } catch (error) {
    console.error("Erro ao salvar contato ou enviar e-mail:", error);
    return reply.code(500).send({ error: "Erro ao processar a solicitação." });
  }
};
