const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const route = express.Router()

route.get('/', function(req, res){
    const filtro = req.body || null
    controller.get_empresa( filtro )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 400) )
})

route.post('/', function(req, res) {
    controller.add_empresa( req.body )
        .then( (data) => response.success(req, res, data, 201) )
        .catch( (error) => response.error(req, res, error, 500) )
})

route.put('/', function(req, res) {
    controller.update_empresa( req.body )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 500) )
})

route.delete('/', function(req, res) {
    controller.delete_empresa( req.body )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 500) )
})

module.exports = route