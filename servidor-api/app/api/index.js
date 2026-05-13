/* Código simplório, apenas para fornecer o serviço para a aplicação */
var api = {}

api.dados = function(req, res) {
    res.json([
        { montante: 200.51, vezes: 2 },
        { montante: 100.20, vezes: 5 },
        { montante: 50.50, vezes: 8 },
        { montante: 1070.50, vezes: 12 }
    ]);    
};

module.exports = api;