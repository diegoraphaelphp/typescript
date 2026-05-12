import { Negociacao } from '../models/negociacao.js';
export class NegociacoesService {
    obterNegociacoesDoDia() {
        return fetch('https://superb-biscuit-34bcf6.netlify.app/?utm_source=chatgpt.com/dados')
            .then(res => res.json())
            .then((dados) => {
            return dados.map(dadoDeHoje => {
                return new Negociacao(new Date(), dadoDeHoje.vezes, dadoDeHoje.montante);
            });
        });
    }
}
