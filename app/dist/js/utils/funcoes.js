function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
function mascaraMoeda(campo, evento) {
    const tecla = evento.which || evento.keyCode;
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
function moedaBanco(valor) {
    console.log('moedaBancox', valor);
    return valor.replace(/\./g, '').replace(',', '.');
}
function formatarData(data) {
    return data.toLocaleDateString();
}
export { formatarMoeda, mascaraMoeda, moedaBanco, formatarData };
