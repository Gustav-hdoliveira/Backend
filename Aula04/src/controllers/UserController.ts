import { Request, Response } from 'express';
import { connection } from '../config/database';

export class UserController {
  async ListAll(req: Request, res: Response): Promise<Response> {
    const [rows]: any = await connection.query('SELECT * FROM captain AND boat');
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Boats not found.' });
    }
    return res.status(200).json(rows);
  }

  async getBoatById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT * FROM boat WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Boats not found.' });
    }
    return res.status(200).json(rows[0]);
  }

  async getCapById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT * FROM captain WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Captains not found.' });
    }
    return res.status(200).json(rows[0]);
  }

  async CreateBoat(req: Request, res: Response): Promise<Response> {
    const { name, max_weight, max_fishers, captain_id } = req.body;
    await connection.query('INSERT INTO boat (name, max_weight, max_fishers, captain_id) VALUES (?, ?, ?, ?)', [name, max_weight, max_fishers, captain_id]);
    return res.status(201).json({ mensagem: 'Boat registed with sucess!' });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nome, email } = req.body;
    await connection.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
    return res.status(200).json({ mensagem: 'Usuário atualizado!' });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await connection.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return res.status(204).send();
  }
}