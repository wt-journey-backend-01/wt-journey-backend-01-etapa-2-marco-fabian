const { v4: uuidv4 } = require('uuid');

const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    {
        id: "8b7a6c5d-4e3f-2a1b-9c8d-7e6f5a4b3c2d",
        titulo: "roubo a banco",
        descricao: "Assalto ao Banco Central na Av. Paulista às 14:30. Três indivíduos armados renderam funcionários e clientes, levando aproximadamente R$ 250.000.",
        status: "solucionado",
        agente_id: "7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b"
    },
    {
        id: "3c2d1e0f-9a8b-7c6d-5e4f-3a2b1c0d9e8f",
        titulo: "sequestro",
        descricao: "Empresário de 52 anos foi sequestrado no estacionamento de shopping. Família recebeu pedido de resgate de R$ 500.000.",
        status: "aberto",
        agente_id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e"
    },
    {
        id: "9e8f7a6b-5c4d-3e2f-1a0b-9c8d7e6f5a4b",
        titulo: "tráfico de drogas",
        descricao: "Operação no bairro da Liberdade resultou na apreensão de 50kg de cocaína e prisão de 12 suspeitos envolvidos na rede de distribuição.",
        status: "solucionado",
        agente_id: "9f8e7d6c-5b4a-3928-1706-8592a1b0c3d4"
    },
    {
        id: "5d4c3b2a-1098-7e6f-5a4b-3c2d1e0f9a8b",
        titulo: "fraude eletrônica",
        descricao: "Esquema de phishing em aplicativo bancário resultou em prejuízo de R$ 1.2 milhão para mais de 200 vítimas.",
        status: "aberto",
        agente_id: "6c5b4a39-2817-0695-8d7e-5a4b3c2d1e0f"
    },
    {
        id: "7f6e5d4c-3b2a-1908-7e6f-5a4b3c2d1e0f",
        titulo: "furto de veículos",
        descricao: "Quadrilha especializada em furto de carros de luxo foi identificada. Suspeitos agiam principalmente em estacionamentos de shopping centers.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
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