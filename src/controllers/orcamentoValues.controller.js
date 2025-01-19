import db from "../models/index.js";

const { Orcamento, OrcamentoServico, OrcamentoValues, sequelize } = db;

export const createOrcamentoValues = async (req, res) => {
    const transaction = await sequelize.transaction(); // Inicia uma transação

    try {
        const { clienteId, orcamentos } = req.body;

        if (!clienteId || !orcamentos || !Array.isArray(orcamentos) || orcamentos.length === 0) {
            return res.status(400).json({
                error: "Dados inválidos. Certifique-se de incluir 'clienteId' e a lista de 'orcamentos'.",
            });
        }

        // Criação do orçamento principal
        const novoOrcamento = await Orcamento.create(
            {
                clienteId,
                valorTotal: 0, // Inicializado como 0, será atualizado após o cálculo
                status: "Pendente",
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

            console.log('Valor de id_categoria:', id_categoria);
            // Criar o serviço associado ao orçamento
            const novoOrcamentoServico = await OrcamentoServico.create(
                {
                    id_orcamento: novoOrcamento.id_orcamento, 
                    id_categoria: id_categoria,  
                    valorTotal: 0, 
                },
                { transaction }
            );
            

            for (const detalhe of detalhes_servico) {
                const { id_detalhes_servico, value_option, value_input } = detalhe;

                // Criar os valores associados ao serviço
                await OrcamentoValues.create(
                    {
                        id_orcamentoservico: novoOrcamentoServico.id_orcamentoservico,
                        id_detalhes_servico,
                        value_option: id_detalhes_servico,
                        value_input,
                    },
                    { transaction }
                );

                // Atualizar o valor total do serviço
                novoOrcamentoServico.valorTotal += parseFloat(value_input || 0);
                valorTotal += parseFloat(value_input || 0);
            }

            // Salvar o valor total atualizado no serviço
            await novoOrcamentoServico.save({ transaction });
        }

        // Atualizar o valor total do orçamento principal
        novoOrcamento.valorTotal = valorTotal;
        await novoOrcamento.save({ transaction });

        // Confirmar a transação
        await transaction.commit();

        return res.status(201).json({
            message: "Orçamento criado com sucesso.",
            orcamento: {
                id_orcamento: novoOrcamento.id_orcamento,
                clienteId: novoOrcamento.clienteId,
                valorTotal: novoOrcamento.valorTotal,
                status: novoOrcamento.status,
                dataCriacao: novoOrcamento.createdAt,
            },
        });
    } catch (error) {
        // Reverter a transação em caso de erro
        await transaction.rollback();
        console.error("Erro ao criar orçamento:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};
