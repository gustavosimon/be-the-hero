const connection = require("../database/connection");
const generateUniqueId = require("../utils/generateUniqueId");

module.exports = {
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueId();
    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });
    return response.json({ id });
  },

  async index(request, response) {
    const ongs = await connection("ongs").select("*");
    return response.json(ongs);
  },

  async delete(request, response) {
    const ong_id = request.headers.authorization;
    await connection("ongs")
      .where("id", ong_id)
      .delete();
    return response.status(204).send();
  }
};
