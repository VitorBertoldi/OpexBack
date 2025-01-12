import db from "../models/index.js";

const { SubServico, DetalheServico, CategoriaServico} = db;

export const readServices = async (req, res) => {
    try {
        const categorias = await CategoriaServico.findAll(
            {
            include: [
                {
                    model: SubServico,
                    include: [
                        {
                            model: DetalheServico
                        }
                    ]
                }
            ]
        }
    );

        return res.send(categorias);
    } catch (error) {
        console.error("Erro ao solicitar aos serviços:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};
