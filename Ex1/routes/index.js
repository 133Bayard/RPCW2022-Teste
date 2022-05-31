var express = require('express');
var router = express.Router();
var Cidade = require('../controllers/mapa');
const cidade = require('../models/cidades');
var Ligacao = require('../controllers/mapa');
const ligacao = require('../models/ligacoes');


router.get('/cidades', function(req,res){
  if(req.query['distrito'] != undefined){
    Cidade.listarPorDistrito(req.query['distrito'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
  else{
    Cidade.listarCidade()
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
}
})

router.get('/ligacoes', function(req,res){
  if(req.query['origem'] != undefined){
    Ligacao.listarPorOrigem(req.query['origem'])
     .then(dados => {
       res.status(200).jsonp(dados)
     })
     .catch( e => {
       res.status(500).jsonp({erro : e})
     })
  }
})

router.get('/cidades/nomes', function(req,res){
  Cidade.listarNomeCidades()
  .then(data => {
    var nomes = []
    data.forEach(n => {
       if (!nomes.includes(n['nomes']))
         nomes.push(n['nome'])
    })
    nomes.sort()
    res.status(200).jsonp(nomes)
  })

    .catch(error => res.render('error', { error: error }))
});



router.get('/cidades/:id', function(req,res){
  Cidade.lookUp(req.params.id)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(503).jsonp({erro : e})
  })
})


router.get('/distritos', function(req, res, next) {
  Cidade.listarCidade()
  .then(data => {
    var dist = {}
    data.forEach(d => {
      if (!dist[d.distrito]) {
        dist[d.distrito] = [{ 'id': d.id, 'cidade': d.nome }]
      }
      else {
        dist[d.distrito].push({ 'id': d.id, 'cidade': d.nome })
      }
    })
    res.status(200).jsonp(dist)
  })
  .catch(error => res.render('error', { error: error }))
});

module.exports = router;
