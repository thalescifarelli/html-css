listarTodasTarefas()

async function listarTodasTarefas()
{
    try
    {
        linkApi = 'https://localhost:44370/api/Tarefa'
        const response = await fetch(linkApi)
        const dados = await response.json();
        preencherTabela(dados)
    }
    catch
    {
        alert('Erro ao consultar API');
    }
}

function preencherTabela(dados)
{
    const tabela = document.getElementById("tabela-dados");
    const tbody = tabela.getElementsByTagName("tbody")[0];

    for (const dado of dados)
    {
        const newRow = tbody.insertRow();
        const idCell = newRow.insertCell(0)
        const responsavelCell = newRow.insertCell(1);
        const tarefaCell = newRow.insertCell(2);
        const descricaoCell = newRow.insertCell(3)
        const statusCell = newRow.insertCell(4);

        idCell.innerHTML = dado.id

        if (dado.usuario == null)
        {
            responsavelCell.innerHTML = ''
        }
        else
        {
            responsavelCell.innerHTML = dado.usuario.nome
        }        
        tarefaCell.innerHTML = dado.nome
        descricaoCell.innerHTML = dado.descricao
        statusCell.innerHTML = dado.status

        if(dado.status == 1)
        {
            statusCell.style.backgroundColor = 'red'
        }
        else if(dado.status == 2)
        {
            statusCell.style.backgroundColor = 'yellow'
        }
        else if(dado.status == 3)
        {
            statusCell.style.backgroundColor = 'lightgreen'
        }

    }
}

function redirecionarPagina(pagina)
{
    window.location.href = window.location.href.replace("tarefas", pagina)
}