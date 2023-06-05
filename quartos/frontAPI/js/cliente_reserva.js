const reservar_form = document.querySelector('#reservarForm')
const nome_clienteInput = document.querySelector('#nome_clienteInput')
const numeroInput = document.querySelector('#numeroInput')
const check_inInput = document.querySelector('#check_inInput')
const check_ouInput = document.querySelector('#check_ouInput')
const url_reservas = 'http://localhost:8080/reserva.php' 

function carregarreservas() {
    fetch(url_reservas, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
}

//função para criar um reserva
function adicionarreserva(e) {

    e.preventDefault()

    const nome_cliente = nome_clienteInput.value
    const numero = numeroInput.value
    const check_in = check_inInput.value
    const check_out = check_outInput.value

    fetch(url_reservas, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nome_cliente=${encodeURIComponent(nome_cliente)}&numero=${encodeURIComponent(numero)}&check_in=${encodeURIComponent(check_in)}&check_out=${encodeURIComponent(check_out)}`
    })
        .then(response => {
            if (response.ok) {
                carregarreservas()
                location.assign('cliente.html')
            } else {
                console.error('Erro ao add reserva')
                alert('Erro ao add reserva')
            }
        })
}

reservar_form.addEventListener('submit', adicionarreserva)

carregarreservas()