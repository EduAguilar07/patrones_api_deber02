const model = require('./model')


async function add_representante( dato ) {
    const resultado = await new model( dato )
    return resultado.save()
}

async function get_representante( filtro_ruc ) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (filtro_ruc) {
            filtro = { ruc: filtro_ruc }
        }
        model.find( filtro )            
            .populate({
                path:'empresas',
                populate:{
                    path: 'empresa',
                    model:'empresa'
                }
            })
            .exec()
            .then( data => {
                lista = []
                for (let elemento of data) { 
                    objeto = {                   
                        ruc: elemento.ruc,
                        cedula: elemento.cedula,
                        nombre: elemento.nombre,
                        apellido: elemento.apellido,
                        domicilio: elemento.domicilio,
                        telefono: elemento.telefono                        
                    }
                    objeto.empresas = []
                    for (let detalle of elemento.empresas) {
                        registro = { 
                            nombre: detalle.empresa.nombre,
                            ruc: detalle.empresa.ruc,
                            domicilio: detalle.empresa.domicilio                            
                        }
                        objeto.empresas.push( registro )
                    }
                    lista.push( objeto )
                }                
                    resolve(lista)
            } )
            .catch (error => {
                reject(error)
            });         
    }) 
}

async function update_representante( representante ) {
    const objeto = await model.findOne( {cedula: representante.cedula} )

    if ( objeto ) {
        objeto.nombre = representante.nombre
    
        return resultado = await objeto.save()    
    } else {
        return null
    }
}

async function delete_representante( representante ) {
    return await model.deleteOne({_id: representante.id})
}

module.exports = {
    add: add_representante,
    get: get_representante,
    update: update_representante,
    delete: delete_representante,
}