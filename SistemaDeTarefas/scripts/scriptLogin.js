const formulario = document.getElementById('formularioLogin')

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = formulario.usuario.value;
    const password = formulario.senha.value;

    const dadosFormulario = {
        usuario: username,
        senha: password
    };

    fetch(`https://localhost:44370/login`,{
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
            window.location.href = window.location.href.replace("index", "tarefas")
    })
    .catch(error => {
        console.error('Erro', error)
    })
})