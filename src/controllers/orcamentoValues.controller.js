import db from "../models/index.js";
import { log } from "mathjs";
const {
    Orcamento,
    OrcamentoServico,
    OrcamentoValues,
    Building,
    DetalheServicoValues,
    sequelize
} = db;
import { Op } from "sequelize";

export const createOrcamentoValues = async (req, res) => {
    const transaction = await sequelize.transaction(); // Inicia uma transação

    try {
        const { clienteId, orcamentos } = req.body;

        if (
            !clienteId ||
            !orcamentos ||
            !Array.isArray(orcamentos) ||
            orcamentos.length === 0
        ) {
            return res.status(400).json({
                error: "Dados inválidos. Certifique-se de incluir 'clienteId' e a lista de 'orcamentos'."
            });
        }

        const novoOrcamento = await Orcamento.create(
            {
                clienteId,
                valorTotal: 0, // Inicializado como 0, será atualizado após o cálculo
                status: "Pendente"
            },
            { transaction }
        );

        let valorTotal = 0;

        for (const orcamentoServico of orcamentos) {
            const { id_categoria, detalhes_servico } = orcamentoServico;

            // Verificar se a categoria foi fornecida
            if (!id_categoria) {
                throw new Error("Cada serviço deve incluir um 'id_categoria'.");
            }

            console.log("Valor de id_categoria:", id_categoria);
            // Criar o serviço associado ao orçamento
            const novoOrcamentoServico = await OrcamentoServico.create(
                {
                    id_orcamento: novoOrcamento.id_orcamento,
                    id_categoria: id_categoria,
                    valorTotal: 0
                },
                { transaction }
            );

            for (const detalhe of detalhes_servico) {
                const { id_detalhes_servico, value_option, value_input } =
                    detalhe;

                // Criar os valores associados ao serviço
                await OrcamentoValues.create(
                    {
                        id_orcamentoservico:
                            novoOrcamentoServico.id_orcamentoservico,
                        id_detalhes_servico,
                        value_option: id_detalhes_servico,
                        value_input
                    },
                    { transaction }
                );

                novoOrcamentoServico.valorTotal += parseFloat(value_input || 0);
                valorTotal += parseFloat(value_input || 0);
            }

            await novoOrcamentoServico.save({ transaction });
        }

        novoOrcamento.valorTotal = valorTotal;
        await novoOrcamento.save({ transaction });

        await transaction.commit();

        return res.status(201).json({
            message: "Orçamento criado com sucesso.",
            orcamento: {
                id_orcamento: novoOrcamento.id_orcamento,
                clienteId: novoOrcamento.clienteId,
                valorTotal: novoOrcamento.valorTotal,
                status: novoOrcamento.status,
                dataCriacao: novoOrcamento.createdAt
            }
        });
    } catch (error) {
        // Reverter a transação em caso de erro
        await transaction.rollback();
        console.error("Erro ao criar orçamento:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};
export const consultaOrcamento = async (req, res) => {
    const transaction = await sequelize.transaction();
    const {
        id_categoria,
        id_subservice,
        build_id,
        nm_subservice,
        detalhes_servico
    } = req.body;
    try {
        let teste = {
            id_categoria: "1",
            id_subservice: "1",
            build_id: "1",
            nm_subservice: "Atendimento a Ocorrências",
            detalhes_servico: [
                { id_detalhes_servico: 2, value_option: "6", value_input: "" },
                {
                    id_detalhes_servico: 24,
                    value_option: "69",
                    value_input: ""
                },
                {
                    id_detalhes_servico: 25,
                    value_option: "74",
                    value_input: ""
                },
                { id_detalhes_servico: 1, value_option: "2", value_input: "" }
            ]
        };

        let det_ids = detalhes_servico.map((det) => det.id_detalhes_servico);
        let building = await Building.findOne({
            where: {
                id: +build_id
            }
        });
        console.log(building); //metragem
       
        let metragem = building.metragem
        
        let detValues = await DetalheServicoValues.findAll({
            where: {
                id_detalhes_servico_value: {
                    [Op.in]: det_ids
                }
            }
        });

        let maiorBeta = 0
        detValues.forEach(element => {
            if(element.valorBeta > maiorBeta) maiorBeta = element.valorBeta
        });;
        
        function calcularFormula(
            metragem,
            projecao_log = -0.05,
            cnst = 0.56,
            s6 = null
        ) {
            return (projecao_log * log(metragem) + cnst) * metragem;
        }

        const resultado = calcularFormula(metragem);
        
        await transaction.commit();
        res.send({
            id_categoria,
            id_subservice,
            build_id,
            nm_subservice,
            detalhes_servico,
            valorTotal: resultado
        })
    } catch (error) {
        await transaction.rollback();
        console.error("Erro ao criar orçamento:", error);
    }
};
