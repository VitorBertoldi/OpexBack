import db from '../models/index.js';

const { Client } = db;

export const createClient = async (req, res) => {
  try {
    const { razaoSocial, cnpj, nomePontoFocal, emailPontoFocal, telefonePontoFocal, vendedorId } = req.body;
    
    if (!razaoSocial || !cnpj || !nomePontoFocal || !emailPontoFocal || !telefonePontoFocal || !vendedorId) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const newClient = await Client.create({
      razaoSocial,
      cnpj,
      nomePontoFocal,
      emailPontoFocal,
      telefonePontoFocal,
      vendedorId,
    });

    return res.status(201).json(newClient);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const readClients = async (req, res) => {
  try {
    const allClients = await Client.findAll();
    return res.status(200).json(allClients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    return res.status(200).json(client);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { razaoSocial, cnpj, nomePontoFocal, emailPontoFocal, telefonePontoFocal, vendedorId } = req.body;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const updatedClient = await client.update({
      razaoSocial,
      cnpj,
      nomePontoFocal,
      emailPontoFocal,
      telefonePontoFocal,
      vendedorId,
    });

    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await client.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
