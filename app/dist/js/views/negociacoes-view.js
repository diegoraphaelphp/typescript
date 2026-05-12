var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { escapar } from '../decorators/escapar.js';
import { formatarMoeda } from '../utils/funcoes.js';
import { View } from './view.js';
export class NegociacoesView extends View {
    template(model) {
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
            calculado += total;
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
    formatar(data) {
        return new Intl.DateTimeFormat()
            .format(data);
    }
}
__decorate([
    escapar
], NegociacoesView.prototype, "template", null);
//# sourceMappingURL=negociacoes-view.js.map