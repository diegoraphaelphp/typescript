import { NegociacaoController } from './controllers/negociacao-controller.js';
import { mascaraMoeda } from './utils/funcoes.js';
const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
}
else {
    throw Error('Não foi possível inicializar a aplicação. Verifique se o form existe.');
}
const botaoImporta = document.querySelector('#botao-importa');
if (botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        controller.importaDados();
    });
}
else {
    throw Error('Botão importa não foi encontrado');
}
const valor_moeda = document.querySelector('.valor-moeda');
valor_moeda.addEventListener('keypress', (evento) => {
    mascaraMoeda(valor_moeda, evento);
});
const botaoLimpar = document.querySelector('#botao-limpar');
if (botaoLimpar) {
    botaoLimpar.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.clear();
        location.reload();
    });
}
else {
    throw Error('Botão limpar não foi encontrado');
}
