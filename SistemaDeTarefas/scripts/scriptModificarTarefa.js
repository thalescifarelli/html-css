preencherResponsavel()
preencherTarefas()

async function preencherTarefas()
{
    try
    {
        linkApi = 'https://localhost:44370/api/Tarefa'
        const response = await fetch(linkApi)
        const dados = await response.json();
        preencherDllTarefas(dados)
    }
    catch
    {
        alert('Erro ao consultar API');
    }
}

async function preencherResponsavel()
{
    try
    {
        linkApi = 'https://localhost:44370/api/Usuario'
        const response = await fetch(linkApi)
        const dados = await response.json();
        preencherDllResponsavel(dados)
    }
    catch
    {
        alert('Erro ao consultar API');
    }
}

function preencherDllTarefas(dados)
{
    var dll = document.getElementById("tarefaDll")

    for(const dado of dados)
    {
        var novoOption = document.createElement('option');
        novoOption.value = dado.id;
        novoOption.text = dado.nome;

        dll.appendChild(novoOption);
    }
}

function preencherDllResponsavel(dados)
{
    var dll = document.getElementById("usuarioDll")

    for(const dado of dados)
    {
        var novoOption = document.createElement('option');
        novoOption.value = dado.id;
        novoOption.text = dado.nome;

        dll.appendChild(novoOption);
    }
}

const formulario = document.getElementById('modificarTarefa')

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
debugger

    var id = formulario.tarefaDll.value
    var nome = formulario.nome.value
    var descricao = formulario.descricao.value
    var status = formulario.status.value
    var responsavel = formulario.usuarioDll.value

    if(responsavel == 'ninguem')
    {
        responsavel = null
    }

    const dadosFormulario = {
        nome: nome,
        descricao: descricao,
        status: status,
        usuarioId: responsavel
    };

    fetch(`https://localhost:44370/api/Tarefa/${id}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosFormulario)
    })
    .then(response => {
        if(response.status == 200)
        {
            alert("Tarefa modificada");
        }
        else
        {
            alert("Erro ao atualizar tarefa");
        }
    })
    .then(data => {
            window.location.href = window.location.href.replace("modificar", "tarefas")
    })
    .catch(error => {
        console.error('Erro', error)
    })
})

function habilitarCampos()
{
    var select = document.getElementById('tarefaDll')
    var tarefa = document.getElementById('nome')
    var descricao = document.getElementById('descricao')
    var status = document.getElementById('status')
    var responsavel = document.getElementById('usuarioDll')

    if(select.value != '')
    {
        tarefa.disabled = false
        descricao.disabled = false
        status.disabled = false
        responsavel.disabled = false

        buscarCampos(select.value)
    }
    else
    {
        tarefa.disabled = true
        descricao.disabled = true
        status.disabled = true
        responsavel.disabled = true

        tarefa.value = ''
        descricao.value = ''
        status.value = ''
        responsavel.value = ''
    }
}

async function buscarCampos(id)
{
    try
    {
        linkApi = `https://localhost:44370/api/Tarefa/${id}`
        const response = await fetch(linkApi)
        const dados = await response.json();
        preencherCamposTarefa(dados)
    }
    catch
    {
        alert('Erro ao consultar API');
    }
}

function preencherCamposTarefa(dados)
{
    var tarefa = document.getElementById('nome')
    var descricao = document.getElementById('descricao')
    var status = document.getElementById('status')
    var responsavel = document.getElementById('usuarioDll')

    tarefa.value = dados.nome
    descricao.value = dados.descricao
    status.value = dados.status
    responsavel.value = dados.usuarioId
}