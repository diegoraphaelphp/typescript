export function formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function mascaraMoeda(campo: HTMLInputElement, evento: KeyboardEvent ): void {
    const tecla = evento.which || evento.keyCode;

    // Permite apenas números
    if (tecla < 48 || tecla > 57) {
        evento.preventDefault();
        return;
    }

    let valor = campo.value.replace(/\D/g, '');
    valor += String.fromCharCode(tecla);
    valor = (parseFloat(valor) / 100).toFixed(2);
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    campo.value = valor;
    evento.preventDefault();
}

export function moedaBanco(valor: string): string {
    console.log('valor', valor);
    return valor
        .replace(/\./g, '')
        .replace(',', '.');
}