// 1. Pega os elementos da página
const form = document.getElementById('form-cadastro');
const botao = document.getElementById('btn-enviar');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');

// 2. Regras: devolvem a mensagem de erro, ou '' se estiver certo
function validarNome(valor) {
    if (valor.trim().length < 3) return 'Digite pelo menos 3 letras.';
    return '';
}

function validarEmail(valor) {
    if (!valor.includes('@') || !valor.includes('.')) return 'Digite um e-mail válido.';
    return '';
}

function validarTelefone(valor) {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length !== 11) return 'Digite o DDD e o número com 9 dígitos.';
    return '';
}

// 3. Mostra o erro na tela e diz se o campo está certo
function conferir(campo, regra, idErro) {
    const mensagem = regra(campo.value);
    document.getElementById(idErro).textContent = mensagem;
    return mensagem === '';
}

// 4. Libera o botão só se os três campos estiverem certos
function atualizarBotao() {
    const ok = validarNome(nome.value) === ''
            && validarEmail(email.value) === ''
            && validarTelefone(telefone.value) === '';
    botao.disabled = !ok;
}

// 5. Eventos: roda a cada letra digitada
nome.addEventListener('input', function () {
    conferir(nome, validarNome, 'erro-nome');
    atualizarBotao();
});

email.addEventListener('input', function () {
    conferir(email, validarEmail, 'erro-email');
    atualizarBotao();
});

telefone.addEventListener('input', function () {
    conferir(telefone, validarTelefone, 'erro-telefone');
    atualizarBotao();
});

// 6. Ao enviar: guarda o nome e vai para a página do uniforme
form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    sessionStorage.setItem('nomeJogador', nome.value.trim());
    window.location.href = 'uniforme.html';
});
