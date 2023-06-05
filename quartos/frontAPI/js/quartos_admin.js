const quartos_form = document.querySelector('#form_quarto')
const numero2Input = document.querySelector('#numeroInput')
const tipoInput = document.querySelector('#tipoInput')
const URL = 'http://localhost:8080/quartos.php'

const quartos_table = document.querySelector('#tabela_quartos')

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
            quartos_table.innerHTML = ''

            for (let i = 0; i < quartos.length; i++) {
                const tr = document.createElement('tr')
                const quarto = quartos[i]
                tr.innerHTML = `
                    <td>${quarto.id}</td>
                    <td>${quarto.numero}</td>
                    <td>${quarto.tipo}</td>
                    <td>${quarto.disponivel}</td>
                    <td>
                        <button data-id="${quarto.id}" onclick="atualizarquarto(${quarto.id})">Editar</button>
                        <button onclick="excluirquarto(${quarto.id})">Excluir</button>
                    </td>
                `
                quartos_table.appendChild(tr)
            }

        })
}

//função para criar um quarto
function adicionarquarto(e) {

    e.preventDefault()

    const numero = numero2Input.value
    const tipo = tipoInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `numero=${encodeURIComponent(numero)}&tipo=${encodeURIComponent(tipo)}&disponivel=${encodeURIComponent('1')}`
    })
        .then(response => {
            if (response.ok) {
                carregarquartos()
                numero2Input.value = ''
                tipoInput.value = ''
            } else {
                console.error('Erro ao add quarto')
                alert('Erro ao add quarto')
            }
        })
}

function atualizarquarto(id) {
    const novonumero = prompt("Digite o novo numero")
    const novotipo = prompt("Digite o novo tipo")
    const novodisponivel = prompt("Digite o novo disponivel")
    if (novonumero && novodisponivel && novotipo) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `numero=${encodeURIComponent(novonumero)}&tipo=${encodeURIComponent(novotipo)}&disponivel=${encodeURIComponent(novodisponivel)}`
        })
            .then(response => {
                if (response.ok) {
                    carregarquartos()
                } else {
                    console.error('Erro ao att quarto')
                    alert('erro ao att quarto')
                }
            })
    }
}
function excluirquarto(id){
    if(confirm('Deseja excluir o quarto ?')){
        fetch(`${URL}?id=${id}`,{
            method: 'DELETE'
        })
        .then(response =>{
            if(response.ok){
                carregarquartos()
            }else{
                console.error('Erro ao excluir quarto')
                alert('Erro ao excluir quarto')
            }
        })
    }
}



quartos_form.addEventListener('submit', adicionarquarto)

carregarquartos()

