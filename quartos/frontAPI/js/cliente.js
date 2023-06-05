const form = document.querySelector('#form_quarto')
const numeroInput = document.querySelector('#numeroInput')
const tipoInput = document.querySelector('#tipoInput')
const disponivelInput = document.querySelector('#disponivelInput')
const reserva_button = document.querySelector(' .reserva_button')
const URL = 'http://localhost:8080/quartos.php'


const reservas = document.querySelector('#reservas')

function carregarquartos() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(quartos => {
            reservas.innerHTML = ''

            for (let i = 0; i < quartos.length; i++) {
                const li = document.createElement('li')
                const quarto = quartos[i]
                let status = ''
                if (quarto.disponivel == 1) {
                    status = 'Disponivel'
                } else {
                    status = 'Indisponivel'
                }
                li.innerHTML = `
                <div class="card" style="width: 12rem; text-align: center;">
                    <div class="card-body">
                        <h5 class="card-title">${quarto.numero}</h5>
                        <p class="card-text">${quarto.tipo}</p>
                        <p class="card-text">${status}</p>
                    <a href="reserva.html" onclick="reservar(${quarto.id}, '${quarto.numero}', '${quarto.tipo}')" type="button" class="${status} btn btn-primary">
                        Reserva
                    </a>`
                reservas.appendChild(li)
            }

        })
}

function reservar(id, numero, tipo) {

    const novonumero = numero
    const novotipo = tipo

    fetch(`${URL}?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        body: `numero=${encodeURIComponent(novonumero)}&tipo=${encodeURIComponent(novotipo)}&disponivel=${encodeURIComponent('0')}`
    })
}

carregarquartos()