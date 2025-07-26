const { v4: uuidv4 } = require('uuid');

const agentes = [
    {
        id: "37593a38-92b6-4f9f-a6dc-5ceece7eda92",
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado"
    },
    {
        id: "c1e6a263-5670-4439-8f62-86ccb427ef8f",
        nome: "Ana Silva",
        dataDeIncorporacao: "2010-03-15",
        cargo: "inspetor"
    },
    {
        id: "7c3379da-8b1d-4b01-9237-9b1d28b5c4ab",
        nome: "Carlos Santos",
        dataDeIncorporacao: "2015-07-22",
        cargo: "inspetor"
    },
    {
        id: "e3f8a914-ac6f-412c-a8a1-c261bc572d3b",
        nome: "Maria Fernandes",
        dataDeIncorporacao: "2005-11-08",
        cargo: "delegado"
    },
    {
        id: "97252664-cf09-472f-a7e3-0ed19614928b",
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