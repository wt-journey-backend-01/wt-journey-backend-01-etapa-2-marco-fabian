const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { createValidationError, createNotFoundError, validateRequiredFields, validateCasoStatus, validateUUID } = require('../utils/errorHandler');

function getAllCasos(req, res, next) {
    try {
        const { agente_id, status, q } = req.query;
        let casos = casosRepository.findAll();

        if (agente_id) {
            if (!validateUUID(agente_id)) {
                throw createValidationError('Parâmetros inválidos', { agente_id: 'agente_id deve ser um UUID válido' });
            }
            casos = casos.filter(caso => caso.agente_id === agente_id);
        }

        if (status) {
            const validStatusValues = ['aberto', 'solucionado'];
            if (!validStatusValues.includes(status.toLowerCase())) {
                throw createValidationError('Parâmetros inválidos', { 
                    status: "O campo 'status' deve ser 'aberto' ou 'solucionado'" 
                });
            }
            casos = casos.filter(caso => caso.status.toLowerCase() === status.toLowerCase());
        }

        if (q) {
            const queryLower = q.toLowerCase();
            casos = casos.filter(caso => 
                caso.titulo.toLowerCase().includes(queryLower) || 
                caso.descricao.toLowerCase().includes(queryLower)
            );
        }

        res.status(200).json(casos);
    } catch (error) {
        next(error);
    }
}

function getCasoById(req, res, next) {
    try {
        const { id } = req.params;

        if (!validateUUID(id)) {
            throw createValidationError('Parâmetros inválidos', { id: 'ID deve ser um UUID válido' });
        }

        const caso = casosRepository.findById(id);
        if (!caso) {
            throw createNotFoundError('Caso não encontrado');
        }

        res.status(200).json(caso);
    } catch (error) {
        next(error);
    }
}

function getAgenteFromCaso(req, res, next) {
    try {
        const { caso_id } = req.params;

        if (!validateUUID(caso_id)) {
            throw createValidationError('Parâmetros inválidos', { caso_id: 'caso_id deve ser um UUID válido' });
        }

        const caso = casosRepository.findById(caso_id);
        if (!caso) {
            throw createNotFoundError('Caso não encontrado');
        }

        const agente = agentesRepository.findById(caso.agente_id);
        if (!agente) {
            throw createNotFoundError('Agente responsável não encontrado');
        }

        res.status(200).json(agente);
    } catch (error) {
        next(error);
    }
}

function createCaso(req, res, next) {
    try {
        const dados = req.body;
        const requiredFields = ['titulo', 'descricao', 'status', 'agente_id'];
        
        const validationErrors = validateRequiredFields(dados, requiredFields);
        const errors = {};

        if (validationErrors) {
            Object.assign(errors, validationErrors);
        }

        if (dados.status) {
            const statusError = validateCasoStatus(dados.status);
            if (statusError) {
                errors.status = statusError;
            }
        }

        if (dados.agente_id) {
            if (!validateUUID(dados.agente_id)) {
                errors.agente_id = 'agente_id deve ser um UUID válido';
            } else {
                const agente = agentesRepository.findById(dados.agente_id);
                if (!agente) {
                    errors.agente_id = 'Agente não encontrado';
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            throw createValidationError('Parâmetros inválidos', errors);
        }

        const novoCaso = casosRepository.create(dados);
        res.status(201).json(novoCaso);
    } catch (error) {
        next(error);
    }
}

function updateCaso(req, res, next) {
    try {
        const { id } = req.params;
        const dados = req.body;

        if (!validateUUID(id)) {
            throw createValidationError('Parâmetros inválidos', { id: 'ID deve ser um UUID válido' });
        }

        const errors = {};

        if (dados.status) {
            const statusError = validateCasoStatus(dados.status);
            if (statusError) {
                errors.status = statusError;
            }
        }

        if (dados.agente_id) {
            if (!validateUUID(dados.agente_id)) {
                errors.agente_id = 'agente_id deve ser um UUID válido';
            } else {
                const agente = agentesRepository.findById(dados.agente_id);
                if (!agente) {
                    errors.agente_id = 'Agente não encontrado';
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            throw createValidationError('Parâmetros inválidos', errors);
        }

        const casoAtualizado = casosRepository.updateById(id, dados);
        if (!casoAtualizado) {
            throw createNotFoundError('Caso não encontrado');
        }

        res.status(200).json(casoAtualizado);
    } catch (error) {
        next(error);
    }
}

function patchCaso(req, res, next) {
    try {
        const { id } = req.params;
        const dados = req.body;

        if (!validateUUID(id)) {
            throw createValidationError('Parâmetros inválidos', { id: 'ID deve ser um UUID válido' });
        }

        const errors = {};

        if (dados.status) {
            const statusError = validateCasoStatus(dados.status);
            if (statusError) {
                errors.status = statusError;
            }
        }

        if (dados.agente_id) {
            if (!validateUUID(dados.agente_id)) {
                errors.agente_id = 'agente_id deve ser um UUID válido';
            } else {
                const agente = agentesRepository.findById(dados.agente_id);
                if (!agente) {
                    errors.agente_id = 'Agente não encontrado';
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            throw createValidationError('Parâmetros inválidos', errors);
        }

        const casoAtualizado = casosRepository.updateById(id, dados);
        if (!casoAtualizado) {
            throw createNotFoundError('Caso não encontrado');
        }

        res.status(200).json(casoAtualizado);
    } catch (error) {
        next(error);
    }
}

function deleteCaso(req, res, next) {
    try {
        const { id } = req.params;

        if (!validateUUID(id)) {
            throw createValidationError('Parâmetros inválidos', { id: 'ID deve ser um UUID válido' });
        }

        const deleted = casosRepository.deleteById(id);
        if (!deleted) {
            throw createNotFoundError('Caso não encontrado');
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

function searchCasos(req, res, next) {
    try {
        const { q } = req.query;
        
        if (!q) {
            throw createValidationError('Parâmetros inválidos', { q: 'Parâmetro de busca \'q\' é obrigatório' });
        }

        const casos = casosRepository.search(q);
        res.status(200).json(casos);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCasos,
    getCasoById,
    getAgenteFromCaso,
    createCaso,
    updateCaso,
    patchCaso,
    deleteCaso,
    searchCasos
}; 