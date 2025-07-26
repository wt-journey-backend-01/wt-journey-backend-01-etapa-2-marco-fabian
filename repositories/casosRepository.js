const { v4: uuidv4 } = require('uuid');

const casos = [
    {
        id: "6cd036d0-546f-4941-aa5b-09a39335b04e",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "37593a38-92b6-4f9f-a6dc-5ceece7eda92"
    },
    {
        id: "8b82d587-8e02-4fee-bc47-fc6cf2d9e4b2",
        titulo: "roubo a banco",
        descricao: "Assalto ao Banco Central na Av. Paulista às 14:30. Três indivíduos armados renderam funcionários e clientes, levando aproximadamente R$ 250.000.",
        status: "solucionado",
        agente_id: "c1e6a263-5670-4439-8f62-86ccb427ef8f"
    },
    {
        id: "7c7a8665-900a-4785-b693-32562063a371",
        titulo: "sequestro",
        descricao: "Empresário de 52 anos foi sequestrado no estacionamento de shopping. Família recebeu pedido de resgate de R$ 500.000.",
        status: "aberto",
        agente_id: "7c3379da-8b1d-4b01-9237-9b1d28b5c4ab"
    },
    {
        id: "9a7c8754-8ea9-41fe-b5aa-cceef6ee73d1",
        titulo: "tráfico de drogas",
        descricao: "Operação no bairro da Liberdade resultou na apreensão de 50kg de cocaína e prisão de 12 suspeitos envolvidos na rede de distribuição.",
        status: "solucionado",
        agente_id: "e3f8a914-ac6f-412c-a8a1-c261bc572d3b"
    },
    {
        id: "b07edc71-3a95-4b80-913b-cbc61efa8294",
        titulo: "fraude eletrônica",
        descricao: "Esquema de phishing em aplicativo bancário resultou em prejuízo de R$ 1.2 milhão para mais de 200 vítimas.",
        status: "aberto",
        agente_id: "97252664-cf09-472f-a7e3-0ed19614928b"
    },
    {
        id: "7c10198e-72b0-49b8-8e1b-0a9dc7b8434e",
        titulo: "furto de veículos",
        descricao: "Quadrilha especializada em furto de carros de luxo foi identificada. Suspeitos agiam principalmente em estacionamentos de shopping centers.",
        status: "aberto",
        agente_id: "37593a38-92b6-4f9f-a6dc-5ceece7eda92"
    }
];

function findAll() {
    return casos;
}

function findById(id) {
    return casos.find(caso => caso.id === id);
}

function create(caso) {
    const novoCaso = {
        id: uuidv4(),
        ...caso
    };
    casos.push(novoCaso);
    return novoCaso;
}

function updateById(id, dadosAtualizados) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return null;
    
    casos[index] = { ...casos[index], ...dadosAtualizados };
    return casos[index];
}

function deleteById(id) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return false;
    
    casos.splice(index, 1);
    return true;
}

function findByAgenteId(agente_id) {
    return casos.filter(caso => caso.agente_id === agente_id);
}

function findByStatus(status) {
    return casos.filter(caso => caso.status.toLowerCase() === status.toLowerCase());
}

function search(query) {
    const queryLower = query.toLowerCase();
    return casos.filter(caso => 
        caso.titulo.toLowerCase().includes(queryLower) || 
        caso.descricao.toLowerCase().includes(queryLower)
    );
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    findByAgenteId,
    findByStatus,
    search
}; 