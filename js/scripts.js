document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/equipments');
        const equipments = await response.json();

        // Contadores de status
        const statusCounts = {
            requested: 0,
            inUseOnTime: 0,
            nearingDeadline: 0,
            expired: 0
        };

        // Tabela de equipamentos
        const tableBody = document.getElementById('equipmentTableBody');
        tableBody.innerHTML = ''; // Limpa tabela existente

        equipments.forEach(equipment => {
            // Atualiza contadores
            switch(equipment.status) {
                case 'Solicitado':
                    statusCounts.requested++;
                    break;
                case 'Em Uso - Dentro do Prazo':
                    statusCounts.inUseOnTime++;
                    break;
                case 'Próximo ao Prazo Final':
                    statusCounts.nearingDeadline++;
                    break;
                case 'Prazo Expirado':
                    statusCounts.expired++;
                    break;
            }

            // Adiciona linha na tabela
            const row = `
                <tr>
                    <td>${equipment.tipo}</td>
                    <td>${equipment.marca}</td>
                    <td>${equipment.modelo}</td>
                    <td>${equipment.numeroSerie}</td>
                    <td>${equipment.patrimonio}</td>
                    <td>${equipment.solicitante}</td>
                    <td>${equipment.responsavel}</td>
                    <td>${equipment.telefoneResponsavel}</td>
                    <td>${equipment.localDestino}</td>
                    <td>${equipment.enderecoDestino}</td>
                    <td>${equipment.motivoUso}</td>
                    <td>${new Date(equipment.dataInicio).toLocaleDateString()}</td>
                    <td>${new Date(equipment.dataFim).toLocaleDateString()}</td>
                    <td>${equipment.observacao}</td>
                    <td>${new Date(equipment.dataDisponibilidade).toLocaleDateString()}</td>
                    <td>${equipment.tecnicoResponsavel}</td>
                    <td>${equipment.status}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        // Atualiza contadores na dashboard
        document.getElementById('requestedEquipmentCount').textContent = statusCounts.requested;
        document.getElementById('inUseOnTimeCount').textContent = statusCounts.inUseOnTime;
        document.getElementById('nearingDeadlineCount').textContent = statusCounts.nearingDeadline;
        document.getElementById('expiredEquipmentCount').textContent = statusCounts.expired;

    } catch (error) {
        console.error('Erro ao carregar equipamentos:', error);
    }
});