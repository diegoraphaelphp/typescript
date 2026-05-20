import { domInjector } from '../decorators/dom-injector.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { moedaBanco } from '../utils/funcoes.js';
import { imprimir } from '../utils/imprimir.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    @domInjector('#data')
    private inputData!: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade!: HTMLInputElement;
    @domInjector('#valor')
    private inputValor!: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {
        const dados = localStorage.getItem('negociacoes');
        // console.log('xxxxdados', JSON.stringify(dados)); 

        if (dados) {
            const negociacoesSalvas = JSON.parse(dados);

            negociacoesSalvas.forEach((negociacao: any) => {
                this.negociacoes.adiciona(
                    Negociacao.criaDe(
                        negociacao._data,
                        negociacao.quantidade,
                        negociacao.valor
                    )
                );
            });
        }

        this.negociacoesView.update(this.negociacoes);
    }

    // @inspect
    // @logarTempoDeExecucao()
    public adiciona(): void {
        // console.log('kkkkk', moedaBanco(this.inputValor.value));

        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            moedaBanco(this.inputValor.value)
        );

        // console.log('negociacao', negociacao);  

        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
            return;
        }

        this.negociacoes.adiciona(negociacao);
        this.salvarLocalStorage();
        localStorage.setItem('negociacoes', JSON.stringify(this.negociacoes.lista()));
        imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizaView();
    }

    public importaDados(): void {
        this.negociacoesService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacaoDeHoje => {
                    return !this.negociacoes
                        .lista()
                        .some(negociacao => negociacao
                            .ehIgual(negociacaoDeHoje)
                        );
                });
            })
            .then(negociacoesDeHoje => {
                if (negociacoesDeHoje !== null) {
                    for(let negociacao of negociacoesDeHoje) {
                        // console.log('negociacaoDeHoje', negociacao);
                        this.negociacoes.adiciona(negociacao);
                    }

                    this.salvarLocalStorage();
                    localStorage.setItem('negociacoes', JSON.stringify(this.negociacoes.lista()));
                    this.negociacoesView.update(this.negociacoes);
                }
            });
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }

    private salvarLocalStorage( ): void {
        // console.log('salvarLocalStorage', JSON.stringify(this.negociacoes.lista()));
        localStorage.setItem('negociacoes',JSON.stringify([...this.negociacoes.lista()]));
    }
}