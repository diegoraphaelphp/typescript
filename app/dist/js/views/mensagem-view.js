import { View } from './view.js';
export class MensagemView extends View {
    template(model) {
        return `
            <p class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> ${model}</p>
        `;
    }
}
