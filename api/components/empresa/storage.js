const model = require('./model')

async function get_empresa( empresa ) {
    let mi_empresa = {}

    if (empresa.ruc != null) {
        mi_empresa = { ruc: empresa.ruc }
    }
    const resultado = await model.find( mi_empresa )
    return resultado
}

function add_empresa( empresa ) {
    const objeto = new model( empresa )
    
    objeto.save()
}

async function update_empresa(empresa) {
    const objeto = await model.findOne( { ruc: empresa.ruc } )
    objeto.nombre = empresa.nombre 
    objeto.domicilio = empresa.domicilio
    objeto.telefono = empresa.telefono
    
    const resultado = await 
    
    objeto.save()
    return resultado
}

async function delete_empresa(dato) {
    const resultado = await model.deleteOne( {ruc: dato.ruc} )
    return resultado
}

module.exports = {
    add: add_empresa,
    get: get_empresa,
    update: update_empresa,
    delete:delete_empresa,
}