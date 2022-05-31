var Cidade =  require('../models/cidades')
var Ligacao =  require('../models/ligacoes')


module.exports.listarCidade = () => {
    return Cidade.find({},{_id:0, id:1, nome: 1, distrito: 1}).sort({id:1}).exec()
}

module.exports.lookUp = id => {
    return Cidade.findOne({id : id}).exec()
}

module.exports.listarNomeCidades = () => {
    return Cidade.find({},{_id:0, nome: 1}).sort({nome:1}).exec()
}


module.exports.listarPorDistrito = a => {
    var dist = new RegExp(a)
    return Cidade.find({distrito: dist},{_id: 0, id:1, nome: 1}).sort({nome:1}).exec()
}

module.exports.listarPorOrigem = a => {
    var ori = new RegExp(a)
    return Ligacao.find({origem: ori},{_id: 0, id:1, origem: 1, destino: 1}).sort({}).exec()
}