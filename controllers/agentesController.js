const agentesRepository = require('../repositories/agentesRepository');
const { createValidationError, createNotFoundError, validateRequiredFields, validateDateFormat, validateUUID } = require('../utils/errorHandler');

function getAllAgentes(req, res, next) {
    try {
        const { cargo, sort } = req.query;
        let agentes = agentesRepository.findAll();

        if (cargo) {
            const validCargos = ['inspetor', 'delegado'];
            if (!validCargos.includes(cargo.toLowerCase())) {
                throw createValidationError('Parâmetros inválidos', { 
                    cargo: "O campo 'cargo' deve ser 'inspetor' ou 'delegado'" 
                });
            }
            agentes = agentes.filter(agente => agente.cargo.toLowerCase() === cargo.toLowerCase());
        }

        if (sort) {
            const validSortFields = ['dataDeIncorporacao', '-dataDeIncorporacao'];
            if (!validSortFields.includes(sort)) {
                throw createValidationError('Parâmetros inválidos', { 
                    sort: "O campo 'sort' deve ser 'dataDeIncorporacao' ou '-dataDeIncorporacao'" 
                });
            }
            
            const order = sort.startsWith('-') ? 'desc' : 'asc';
            agentes = agentes.sort((a, b) => {
                const dateA = new Date(a.dataDeIncorporacao);
                const dateB = new Date(b.dataDeIncorporacao);
                return order === 'desc' ? dateB - dateA : dateA - dateB;
            });
        }

        res.status(200).json(agentes);
    } catch (error) {
        next(error);
    }
}

function getAgenteById(req, res, next) {
    try {
        const { id } = req.params;

        if (!validateUUID(id)) {
            throw createValidationError('Parâmetros inválidos', { id: 'ID deve ser um UUID válido' });
        }

        const agente = agentesRepository.findById(id);
        if (!agente) {
            throw createNotFoundError('Agente não encontrado');
        }

        res.status(200).json(agente);
    } catch (error) {
        next(error);
    }
}

function createAgente(req, res, next) {
    try {
        const dados = req.body;
        const requiredFields = ['nome', 'dataDeIncorporacao', 'cargo'];
        
        const validationErrors = validateRequiredFields(dados, requiredFields);
        const errors = {};

        if (validationErrors) {
            Object.assign(errors, validationErrors);
        }

        if (dados.dataDeIncorporacao) {
            const dateError = validateDateFormat(dados.dataDeIncorporacao, 'dataDeIncorporacao');
            if (dateError) {
                errors.dataDeIncorporacao = dateError;
            }
        }

        const validCargos = ['inspetor', 'delegado'];
        if (dados.cargo && !validCargos.includes(dados.cargo.toLowerCase())) {
            errors.cargo = "O campo 'cargo' deve ser 'inspetor' ou 'delegado'";
        }

        if (Object.keys(errors).length > 0) {
            throw createValidationError('Parâmetros inválidos', errors);
        }

        const novoAgente = agentesRepository.create(dados);
        res.status(201).json(novoAgente);
    } catch (error) {
        next(error);
    }
}

function updateAgente(req, res, next) {
    try {
        const { id } = req.params;
        const dados = req.body;

        if (!validateUUID(id)) {
            throw createValidationError('Parâmetros inválidos', { id: 'ID deve ser um UUID válido' });
        }

        const errors = {};

        if (dados.dataDeIncorporacao) {
            const dateError = validateDateFormat(dados.dataDeIncorporacao, 'dataDeIncorporacao');
            if (dateError) {
                errors.dataDeIncorporacao = dateError;
            }
        }

        const validCargos = ['inspetor', 'delegado'];
        if (dados.cargo && !validCargos.includes(dados.cargo.toLowerCase())) {
            errors.cargo = "O campo 'cargo' deve ser 'inspetor' ou 'delegado'";
        }

        if (Object.keys(errors).length > 0) {
            throw createValidationError('Parâmetros inválidos', errors);
        }

        const agenteAtualizado = agentesRepository.updateById(id, dados);
        if (!agenteAtualizado) {
            throw createNotFoundError('Agente não encontrado');
        }

        res.status(200).json(agenteAtualizado);
    } catch (error) {
        next(error);
    }
}

function patchAgente(req, res, next) {
    try {
        const { id } = req.params;
        const dados = req.body;

        if (!validateUUID(id)) {
            throw createValidationError('Parâmetros inválidos', { id: 'ID deve ser um UUID válido' });
        }

        const errors = {};

        if (dados.dataDeIncorporacao) {
            const dateError = validateDateFormat(dados.dataDeIncorporacao, 'dataDeIncorporacao');
            if (dateError) {
                errors.dataDeIncorporacao = dateError;
            }
        }

        const validCargos = ['inspetor', 'delegado'];
        if (dados.cargo && !validCargos.includes(dados.cargo.toLowerCase())) {
            errors.cargo = "O campo 'cargo' deve ser 'inspetor' ou 'delegado'";
        }

        if (Object.keys(errors).length > 0) {
            throw createValidationError('Parâmetros inválidos', errors);
        }

        const agenteAtualizado = agentesRepository.updateById(id, dados);
        if (!agenteAtualizado) {
            throw createNotFoundError('Agente não encontrado');
        }

        res.status(200).json(agenteAtualizado);
    } catch (error) {
        next(error);
    }
}

function deleteAgente(req, res, next) {
    try {
        const { id } = req.params;

        if (!validateUUID(id)) {
            throw createValidationError('Parâmetros inválidos', { id: 'ID deve ser um UUID válido' });
        }

        const deleted = agentesRepository.deleteById(id);
        if (!deleted) {
            throw createNotFoundError('Agente não encontrado');
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    patchAgente,
    deleteAgente
}; 