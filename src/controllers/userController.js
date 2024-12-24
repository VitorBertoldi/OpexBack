import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { User } = db;


export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const selectedUser = await User.findOne( { where: {email: req.body.email }})
    if (selectedUser) return res.status(400).send('Email ja cadastrado');

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Os campos 'username', 'email' e 'password' são obrigatórios.",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const login = async (req, res) => {
  try {
    const selectedUser = await User.findOne({ where: { email: req.body.email } });
    if (!selectedUser) {
        return res.status(400).json({ message: 'Email ou senha incorretos' });
    }
    const passwordMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
    if (!passwordMatch) {
        return res.status(400).json({ message: 'Email ou senha incorretos' });
    }
    const token = jwt.sign(
        { id: selectedUser.id },
        process.env.TOKEN_SECRET,
        { expiresIn: '8h' } 
    );

    res.header('authorization-token', token);

    return res.status(200).json({
        message: 'Usuário logado com sucesso',
        user: {
            id: selectedUser.id,
            name: selectedUser.name,
            email: selectedUser.email
        },
        token: token
    });
} catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
}

}

export const readUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const updatedUser = await user.update({ username, email, password });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await user.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
