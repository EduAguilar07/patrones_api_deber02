const storage = require('./storage')

function get_empresa( empresa ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( empresa ) )
    })
}



function add_empresa( empresa ) {
    return new Promise((resolve, reject) => {
        if (!empresa.ruc) {
            return reject('No hay datos suficientes.')
        }
        storage.add( empresa )
        resolve( empresa )        
    })
}

function update_empresa( empresa ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( empresa )
        if (resultado) {
            return resolve( empresa )
        } else {
            return reject('No existe la empresa.')
        }
    })
}

function delete_empresa( empresa ) {
    return new Promise((resolve, reject) => {
        resolve( storage.delete( empresa ) )
    })    
}

module.exports = {
    get_empresa,
    add_empresa,
    update_empresa,
    delete_empresa

}