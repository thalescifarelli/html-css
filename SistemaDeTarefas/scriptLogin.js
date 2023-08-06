const formulario = document.getElementById('formularioLogin')

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
debugger
    const dadosFormulario = new FormData(formulario);

    fetch(`https://localhost:44370/login`,{
        method: 'POST',
        body: dadosFormulario
    })
    .then(response => response.json())
    .then(data => {
        if(data == null)
        {
            alert("Usuario/Senha invalidos")
        }
        else
        {
            window.location.href = window.location.href.replace("index", "tarefas")
        }
    })
    .catch(error => {
        console.error('Erro', error)
    })
})