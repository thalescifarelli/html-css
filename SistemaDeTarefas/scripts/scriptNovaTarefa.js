preencherResponsavel()

async function preencherResponsavel()
{
    try
    {
        linkApi = 'https://localhost:44370/api/Usuario'
        const response = await fetch(linkApi)
        const dados = await response.json();
        preencherDll(dados)
    }
    catch
    {
        alert('Erro ao consultar API');
    }
}

function preencherDll(dados)
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

const formulario = document.getElementById('cadastrarNovaTarefa')

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
debugger
    const nome = formulario.nome.value;
    const descricao = formulario.descricao.value;
    const status = 1;

    var selectElement = document.getElementById('usuarioDll');

    var responsavel = selectElement.value

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

    fetch(`https://localhost:44370/api/Tarefa`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosFormulario)
    })
    .then(response => {
        if(response.status == 204)
        {
            alert("Usuario/Senha invalidos");
            throw new Error('Response 204 - Não há conteúdo');
        }
    })
    .then(data => {
            window.location.href = window.location.href.replace("cadastrar", "tarefas")
    })
    .catch(error => {
        console.error('Erro', error)
    })
})