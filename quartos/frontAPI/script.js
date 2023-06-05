
const form = document.querySelector('#lojaForm')
const nomeInput = document.querySelector('#nomeInput')
const descricaoInput = document.querySelector('#descricaoInput')
const precoInput = document.querySelector('#precoInput')
const frenteInput = document.querySelector('#frenteInput')
const ladoInput = document.querySelector('#ladoInput')
const trasInput = document.querySelector('#trasInput')
const URL = 'http://localhost:8080/loja.php'

const tableBody = document.querySelector('#lojaTable')


function carregarLoja() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(lojas => {
            tableBody.innerHTML = ''

            for (let i = 0; i < lojas.length; i++) {
                const tr = document.createElement('tr')
                const loja = lojas[i]
                tr.innerHTML = `
                    <td>${loja.id}</td>
                    <td>${loja.nome}</td>
                    <td>${loja.descricao}</td>
                    <td>${loja.preco}</td>
                    <td>${loja.frente}</td>
                    <td>${loja.lado}</td>
                    <td>${loja.tras}</td>
                    <td>
                        <button data-id="${loja.id}" onclick="atualizarLoja(${loja.id})">Editar</button>
                        <button onclick="excluirLoja(${loja.id})">Excluir</button>
                    </td>
                `
                tableBody.appendChild(tr)
            }

        })
}

//função para criar um item
function adicionarloja(e) {

    e.preventDefault()

    const nome = nomeInput.value
    const descricao = descricaoInput.value
    const preco = precoInput.value
    const frente = frenteInput.value
    const lado = ladoInput.value
    const tras = trasInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nome=${encodeURIComponent(nome)}&descricao=${encodeURIComponent(descricao)}&preco=${encodeURIComponent(preco)}&frente=${encodeURIComponent(frente)}&lado=${encodeURIComponent(lado)}&tras=${encodeURIComponent(tras)}`
    })
        .then(response => {
            if (response.ok) {
                nomeInput.value = ''
                descricaoInput.value = ''
                precoInput.value = ''
                frenteInput.value = ''
                ladoInput.value = ''
                trasInput.value = ''
            } else {
                console.error('Erro ao add item')
                alert('Erro ao add item')
            }
        })
}

//Função para editar
function atualizarLoja(id){
    const novoNome = prompt("Digite o novo nome")
    const novoDescricao = prompt("Digite o novo descrição")
    const novoPreco = prompt("Digite o novo preço")
    const novoFrente = prompt("Digte o nova img frente")
    const novoLado = prompt("Digte o nova img lado")
    const novoTras = prompt("Digte o nova img tras")

    if (novoNome && novoDescricao && novoPreco && novoFrente && novoLado && novoTras){
        fetch(`${URL}?id=${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `nome=${encodeURIComponent(novoNome)}&descricao=${encodeURIComponent(novoDescricao)}&preco=${encodeURIComponent(novoPreco)}&frente=${encodeURIComponent(novoFrente)}&lado=${encodeURIComponent(novoLado)}&tras=${encodeURIComponent(novoTras)}`
        })
            .then(response => {
                if(response.ok){
                    carregarLoja()
                } else {
                    console.error('Erro ao att item')
                    alert('erro ao att item')
                }
            })
    }
}

//função para excluir
function excluirLoja(id){
    if(confirm('Deseja excluir esse item?')){
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
        .then(response=> {
            if(response.ok) {
                carregarLoja()
            } else {
                console.error('erro ao excluir item')
                alert('Erro ao excluir item')
            }
        })
    }
}





form.addEventListener('submit', adicionarloja)

carregarLoja()

