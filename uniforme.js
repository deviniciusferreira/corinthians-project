

// ===== Saudação com o nome do cadastro =====
const saudacao = document.getElementById('saudacao');
const nomeSalvo = sessionStorage.getItem('nomeJogador');
if (nomeSalvo) {
    saudacao.textContent = 'Fala, ' + nomeSalvo + '!';
}

// ===== Elementos =====
const txtNome = document.getElementById('txt-nome');
const txtNumero = document.getElementById('txt-numero');
const inputNome = document.getElementById('nome-camisa');
const inputNumero = document.getElementById('numero-camisa');

// ===== Estado: qual modelo (1, 2 ou 3) está escolhido em cada peça =====
const escolha = { camisa: 1, bermuda: 1, meiao: 1 };
const COR_TEXTO_COSTAS = { 1: '#151515', 2: '#ffffff', 3: '#ff8a3d' };
let nasCostas = false;

// ===== Mostra só o modelo escolhido de uma peça =====
function escolher(peca, modelo) {
    escolha[peca] = modelo;
    for (let i = 1; i <= 3; i++) {
        document.getElementById(peca + '-' + i).setAttribute('display', i === modelo ? 'inline' : 'none');
    }
    document.querySelectorAll('[data-peca="' + peca + '"]').forEach(function (b) {
        b.setAttribute('aria-pressed', Number(b.dataset.modelo) === modelo);
    });
    if (peca === 'camisa') {
        txtNome.setAttribute('fill', COR_TEXTO_COSTAS[modelo]);
        txtNumero.setAttribute('fill', COR_TEXTO_COSTAS[modelo]);
        atualizarLado();
    }
}

// ===== Frente e costas =====
function atualizarLado() {
    document.querySelectorAll('.so-frente').forEach(function (el) {
        el.setAttribute('display', nasCostas ? 'none' : 'inline');
    });
    document.getElementById('costas').setAttribute('display', nasCostas ? 'inline' : 'none');
    document.getElementById('btn-lado').textContent = nasCostas ? 'Ver frente' : 'Ver costas';
}

document.getElementById('btn-lado').addEventListener('click', function () {
    nasCostas = !nasCostas;
    atualizarLado();
});

// ===== Botões de modelo =====
document.querySelectorAll('[data-modelo]').forEach(function (botao) {
    botao.addEventListener('click', function () {
        escolher(botao.dataset.peca, Number(botao.dataset.modelo));
    });
});

// ===== Kits prontos: escolhe camisa, bermuda e meião do mesmo número =====
document.querySelectorAll('[data-kit]').forEach(function (botao) {
    botao.addEventListener('click', function () {
        const n = Number(botao.dataset.kit);
        escolher('camisa', n);
        escolher('bermuda', n);
        escolher('meiao', n);
    });
});

// ===== Validação do nome e do número =====
function validarNomeCamisa(valor) {
    if (valor === '') return '';
    if (!/^[A-Za-zÀ-ÿ ]{2,12}$/.test(valor.trim())) return 'Use de 2 a 12 letras, sem números.';
    return '';
}

function validarNumero(valor) {
    if (valor === '') return '';
    if (!/^\d{1,2}$/.test(valor)) return 'Digite um número de 0 a 99.';
    return '';
}

inputNome.addEventListener('input', function () {
    const erro = validarNomeCamisa(inputNome.value);
    document.getElementById('erro-nome-camisa').textContent = erro;
    const ok = erro === '' && inputNome.value.trim() !== '';
    txtNome.textContent = ok ? inputNome.value.trim().toUpperCase() : 'SEU NOME';
});

inputNumero.addEventListener('input', function () {
    const erro = validarNumero(inputNumero.value);
    document.getElementById('erro-numero-camisa').textContent = erro;
    const ok = erro === '' && inputNumero.value !== '';
    txtNumero.textContent = ok ? inputNumero.value : '00';
});

// ===== Começa com o kit 1 =====
escolher('camisa', 1);
escolher('bermuda', 1);
escolher('meiao', 1);