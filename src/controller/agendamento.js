const db = require('../config/database');

class Agendamento {
  static async create({ nome_pessoa, contato_telefonico, email, data_agendamento }) {
    const [result] = await db.execute(
      'INSERT INTO agendamentos (nome_pessoa, contato_telefonico, email, data_agendamento) VALUES (?, ?, ?, ?)',
      [nome_pessoa, contato_telefonico, email, data_agendamento]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM agendamentos');
    return rows;
  }

  static async findByName(nome_pessoa) {
    const [rows] = await db.execute('SELECT * FROM agendamentos WHERE nome_pessoa = ?', [nome_pessoa]);
    return rows;
  }

  static async update(id_agenda, newData) {
    const { nome_pessoa, contato_telefonico, email, data_agendamento } = newData;
    const [result] = await db.execute(
      'UPDATE agendamentos SET nome_pessoa = ?, contato_telefonico = ?, email = ?, data_agendamento = ? WHERE id_agenda = ?',
      [nome_pessoa, contato_telefonico, email, data_agendamento, id_agenda]
    );
    return result.affectedRows;
  }

  static async delete(id_agenda) {
    const [result] = await db.execute('DELETE FROM agendamentos WHERE id_agenda = ?', [id_agenda]);
    return result.affectedRows;
  }
}

module.exports = Agendamento;
