import { NegociacaoController } from './controllers/negociacao-controller.js';
import { mascaraMoeda } from './utils/funcoes.js';

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else {
    throw Error('Não foi possível inicializar a aplicação. Verifique se o form existe.');
}

const botaoImporta = document.querySelector('#botao-importa');
if (botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        controller.importaDados();
    });
} else {
    throw Error('Botão importa não foi encontrado');
}

const valor_moeda = document.querySelector('.valor-moeda') as HTMLInputElement;

valor_moeda.addEventListener('keypress', (evento: KeyboardEvent) => {
    mascaraMoeda(valor_moeda, evento);
});

const botaoLimpar = document.querySelector('#botao-limpar');

if (botaoLimpar){
    console.log('botão limpar encontrado', botaoLimpar);

    botaoLimpar.addEventListener('click', () => {    
        localStorage.clear();
        console.log('limpando localStorage');
        location.reload();
    });
}else{
    throw Error('Botão limpar não foi encontrado');
}
