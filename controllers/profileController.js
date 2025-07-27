const Profile = require("../models/Profile");

// Obter perfil
exports.getProfile = async (request, reply) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return reply.code(404).send({ error: "Perfil não encontrado." });
    }
    return reply.code(200).send(profile);
  } catch (error) {
    console.error("Erro ao obter perfil:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};

// Criar ou atualizar perfil
exports.createOrUpdateProfile = async (request, reply) => {
  const { name, title, bio, contactEmail, linkedin, github } = request.body;
  const profileFields = { name, title, bio, contactEmail, linkedin, github };

  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findOneAndUpdate({}, { $set: profileFields }, { new: true });
      return reply.code(200).send(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    return reply.code(201).send(profile);
  } catch (error) {
    console.error("Erro ao criar ou atualizar perfil:", error);
    return reply.code(500).send({ error: "Erro no servidor." });
  }
};
