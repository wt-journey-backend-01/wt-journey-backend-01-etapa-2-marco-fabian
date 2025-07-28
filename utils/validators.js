const { createValidationError, createNotFoundError, validateRequiredFields, validateDateFormat, validateUUID, validateCasoStatus } = require('./errorHandler');

function validateAgenteData(dados, isUpdate = false) {
    const errors = {};
    
    if (isUpdate) {
        const requiredFields = ['nome', 'dataDeIncorporacao', 'cargo'];
        const validationErrors = validateRequiredFields(dados, requiredFields);
        if (validationErrors) {
            Object.assign(errors, validationErrors);
        }
    }
    
    if (dados.dataDeIncorporacao) {
        const dateError = validateDateFormat(dados.dataDeIncorporacao, 'dataDeIncorporacao');
        if (dateError) {
            errors.dataDeIncorporacao = dateError;
        } else {
            const data = new Date(dados.dataDeIncorporacao);
            const hoje = new Date();
            const dataStr = data.toISOString().split('T')[0];
            const hojeStr = hoje.toISOString().split('T')[0];
            if (dataStr > hojeStr) {
                errors.dataDeIncorporacao = 'A data de incorporação não pode ser no futuro';
            }
        }
    }
    
    const validCargos = ['inspetor', 'delegado'];
    if (dados.cargo && !validCargos.includes(dados.cargo.toLowerCase())) {
        errors.cargo = "O campo 'cargo' deve ser 'inspetor' ou 'delegado'";
    }
    
    if (Object.keys(errors).length > 0) {
        throw createValidationError('Parâmetros inválidos', errors);
    }
}

function validateCasoData(dados, agentesRepository, isUpdate = false) {
    const errors = {};
    
    if (isUpdate) {
        const requiredFields = ['titulo', 'descricao', 'status', 'agente_id'];
        const validationErrors = validateRequiredFields(dados, requiredFields);
        if (validationErrors) {
            Object.assign(errors, validationErrors);
        }
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
                throw createNotFoundError('Agente não encontrado');
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        throw createValidationError('Parâmetros inválidos', errors);
    }
}

function validateIdParam(id) {
    if (!validateUUID(id)) {
        throw createValidationError('Parâmetros inválidos', { id: 'ID deve ser um UUID válido' });
    }
}

module.exports = {
    validateAgenteData,
    validateCasoData,
    validateIdParam
}; 