var uf = prompt('Qual UF deseja consultar?(Deixe em branco caso queira todos os estados)')

obterDadosDaAPI(uf)

async function obterDadosDaAPI(uf)
{
    try
    {
        var linkApi = ''
        if(uf != '')
        {
            linkApi = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos?orderBy=Nome`
        }
        else
        {
            linkApi = `https://servicodados.ibge.gov.br/api/v1/localidades/distritos?orderBy=nome`
        }
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
        const regiaoCell = newRow.insertCell(0);
        const estadoCell = newRow.insertCell(1);
        const siglaCell = newRow.insertCell(2);
        const municipioCell = newRow.insertCell(3);

        regiaoCell.innerHTML = dado.municipio.microrregiao.mesorregiao.UF.regiao.nome
        estadoCell.innerHTML = dado.municipio.microrregiao.mesorregiao.UF.nome
        siglaCell.innerHTML = dado.municipio.microrregiao.mesorregiao.UF.sigla
        municipioCell.innerHTML = dado.nome


    }
}