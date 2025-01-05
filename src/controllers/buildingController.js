import db from "../models/index.js";

const { Building } = db;


export const createBuilding = async (req, res) => {
    try {
        const {
            endereco,
            bairro,
            cidade,
            metragem,
            alturaPeDireito,
            clientId
        } = req.body;

        if (
            !endereco ||
            !bairro ||
            !cidade ||
            !metragem ||
            !alturaPeDireito ||
            !clientId
        ) {
            return res
                .status(400)
                .json({ error: "Todos os campos são obrigatórios." });
        }

        const newBuilding = await Building.create({
            endereco,
            bairro,
            cidade,
            metragem,
            alturaPeDireito,
            clientId
        });

        return res.status(201).json(newBuilding);
    } catch (error) {
        console.error("Erro ao criar edifício:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export const readBuildings = async (req, res) => {
    try {
        const allBuildings = await Building.findAll();
        return res.status(200).json(allBuildings);
    } catch (error) {
        console.error("Erro ao buscar edifícios:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export const getBuildingById = async (req, res) => {
    try {
        const { id } = req.params;
        const building = await Building.findByPk(id);

        if (!building) {
            return res.status(404).json({ error: "Edifício não encontrado" });
        }

        return res.status(200).json(building);
    } catch (error) {
        console.error("Erro ao buscar edifício:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export const updateBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            endereco,
            bairro,
            cidade,
            metragem,
            alturaPeDireito,
            clientId
        } = req.body;

        const building = await Building.findByPk(id);

        if (!building) {
            return res.status(404).json({ error: "Edifício não encontrado" });
        }

        const updatedBuilding = await building.update({
            endereco,
            bairro,
            cidade,
            metragem,
            alturaPeDireito,
            clientId
        });

        return res.status(200).json(updatedBuilding);
    } catch (error) {
        console.error("Erro ao atualizar edifício:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export const deleteBuilding = async (req, res) => {
    try {
        const { id } = req.params;

        const building = await Building.findByPk(id);

        if (!building) {
            return res.status(404).json({ error: "Edifício não encontrado" });
        }

        await building.destroy();

        return res.status(204).send();
    } catch (error) {
        console.error("Erro ao excluir edifício:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};
