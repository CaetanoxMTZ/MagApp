const { User } = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { uuid: req.userId } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.status(200).json({
      uuid: user.uuid,
      email: user.email,
      
    });
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar perfil do usuário' });
  }
};


exports.updateUserProfile = async (req, res) => {
  const { email } = req.body; 

  try {
    const user = await User.findOne({ where: { uuid: req.userId } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    user.email = email || user.email;
   

    await user.save();
    res.status(200).json({ message: 'Perfil do usuário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar perfil do usuário' });
  }
};
