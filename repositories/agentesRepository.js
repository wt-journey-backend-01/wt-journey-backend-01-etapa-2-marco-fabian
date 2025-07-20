const { v4: uuidv4 } = require('uuid');

const agentes = [
    {
        id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado"
    },
    {
        id: "7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
        nome: "Ana Silva",
        dataDeIncorporacao: "2010-03-15",
        cargo: "inspetor"
    },
    {
        id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        nome: "Carlos Santos",
        dataDeIncorporacao: "2015-07-22",
        cargo: "inspetor"
    },
    {
        id: "9f8e7d6c-5b4a-3928-1706-8592a1b0c3d4",
        nome: "Maria Fernandes",
        dataDeIncorporacao: "2005-11-08",
        cargo: "delegado"
    },
    {
        id: "6c5b4a39-2817-0695-8d7e-5a4b3c2d1e0f",
        nome: "José Pereira",
        dataDeIncorporacao: "2018-01-12",
        cargo: "inspetor"
    }
];

function findAll() {
    return agentes;
}

function findById(id) {
    return agentes.find(agente => agente.id === id);
}

function create(agente) {
    const novoAgente = {
        id: uuidv4(),
        ...agente
    };
    agentes.push(novoAgente);
    return novoAgente;
}

function updateById(id, dadosAtualizados) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) return null;
    
    agentes[index] = { ...agentes[index], ...dadosAtualizados };
    return agentes[index];
}

function deleteById(id) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) return false;
    
    agentes.splice(index, 1);
    return true;
}

function findByCargo(cargo) {
    return agentes.filter(agente => agente.cargo.toLowerCase() === cargo.toLowerCase());
}

function findAllSorted(order = 'asc') {
    const agentesCopy = [...agentes];
    return agentesCopy.sort((a, b) => {
        const dateA = new Date(a.dataDeIncorporacao);
        const dateB = new Date(b.dataDeIncorporacao);
        
        if (order === 'desc') {
            return dateB - dateA;
        }
        return dateA - dateB;
    });
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    findByCargo,
    findAllSorted
}; 