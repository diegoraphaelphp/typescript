import { escapar } from '../decorators/escapar.js';
import { Negociacoes } from '../models/negociacoes.js';
import { formatarMoeda } from '../utils/funcoes.js';
import { View } from './view.js';

export class NegociacoesView extends View<Negociacoes> {

    @escapar
    protected template(model: Negociacoes): string {
        let calculado = 0;
        let total = 0;
        let registros = 0;
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th class="text-center">Data</th>
                    <th class="text-center">Quantidade</th>
                    <th class="text-center">Valor</th>
                    <th class="text-center">Total</th>
                </tr>
            </thead>
            <tbody>
                ${model.lista().map(negociacao => {
                    total = negociacao.quantidade * negociacao.valor;
                    calculado+= total;
                    registros++;

                    return `
                        <tr>
                            <td class="text-center">${this.formatar(negociacao.data)}</td>
                            <td class="text-center">${negociacao.quantidade}</td>
                            <td class="text-right">${formatarMoeda(negociacao.valor)}</td>
                            <td class="text-right">${formatarMoeda(total)}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="2" class="text-left">Total Registro(s): ${registros}</th>
                    <th colspan="2" class="text-right">${formatarMoeda(calculado)}</th>
                </tr>
            </tfoot>
        </table>
        `;
    }

    private formatar(data: Date): string {
        return new Intl.DateTimeFormat()
            .format(data);
    }
}