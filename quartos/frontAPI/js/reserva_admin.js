const reservarForm = document.querySelector('#reservarForm');
const nome_clienteInput = document.querySelector('#nome_clienteInput');
const numeroInput = document.querySelector('#numeroInput');
const check_inInput = document.querySelector('#check_inInput');
const check_outInput = document.querySelector('#check_outInput');
const url_reservas = 'http://localhost:8080/reserva.php';

const reservas_table = document.querySelector('#tabela_reserva')

function carregarReservas() {
    fetch(url_reservas, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(reservas => {
        reservas_table.innerHTML = '';

        for (let i = 0; i < reservas.length; i++) {
            const tr = document.createElement('tr');
            const reserva = reservas[i];
            tr.innerHTML = `
                <td>${reserva.id}</td>
                <td>${reserva.nome_cliente}</td>
                <td>${reserva.numero}</td>
                <td>${reserva.check_in}</td>
                <td>${reserva.check_out}</td>
                <td>
                    <button data-id="${reserva.id}" onclick="atualizarreserva(${reserva.id})">Editar</button>
                    <button onclick="excluirreserva(${reserva.id})">Excluir</button>
                </td>
            `;
            reservas_table.appendChild(tr);
        }
    })
    .catch(error => {
        console.error('Erro ao carregar reservas:', error);
        alert('Erro ao carregar reservas');
    });
}

function adicionarReserva(e) {
    e.preventDefault();

    const nome_cliente = nome_clienteInput.value;
    const numero = numeroInput.value;
    const check_in = check_inInput.value;
    const check_out = check_outInput.value;

    fetch(url_reservas, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome_cliente: nome_cliente,
            numero: numero,
            check_in: check_in,
            check_out: check_out
        })
    })
    .then(response => {
        if (response.ok) {
            carregarReservas();
            console.log(nome_cliente, numero, check_in, check_out);
        } else {
            console.error('Erro ao adicionar reserva');
            alert('Erro ao adicionar reserva');
        }
    })
    .catch(error => {
        console.error('Erro ao adicionar reserva:', error);
        alert('Erro ao adicionar reserva');
    });
}



carregarReservas();
