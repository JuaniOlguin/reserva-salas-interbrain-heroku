const { Reserva, Salas, sequelize } = require("../database/models/index");


const controller = {
    //Metodo para traer todas las reservas
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let reservas = await Reserva.findAll();

            meta.length = reservas.length

            res.status(200).json({ meta, data: reservas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    //metodo para guardar una nueva reserva, siempre que no sea en el mismo horario que una existente
    saveOne: async (req, res) => {
        console.log("Empieza save one");
        let { nombre, fecha, email, sala } = req.body;
        
        let t;
        let objAux = {
            nombre,
            fecha,
            email,
            salaId: sala
        }
        console.log("Fecha antes: "+objAux.fecha);
        try {
            if(!objAux.nombre || !objAux.fecha || !objAux.email || !objAux.salaId){
                throw new Error("Todos los campos son obligatorios")
            }
            let reservas = await Reserva.findAll({
                attributes: [
                    'id',
                    'nombre',
                    'email',
                    [sequelize.fn('date_format', sequelize.col('fecha'), '%m/%d/%Y %H:%i:%sZ'), 'fecha'],
                    'salaId',
                    'createdAt',
                    'updatedAt'
                ]
            });
            let salas = await Salas.findAll();
            let salaReserva = await Salas.findByPk(objAux.salaId);

            if(!salaReserva){
                throw new Error("Error, sala inexistente")
            }
            
            for (let index = 0; index < reservas.length; index++) {
                // console.log("Fecha Index: " + reservas[index].fecha);
                // console.log("Fecha Auxiliar: " + objAux.fecha);
                // console.log("==============Comparacion ============");
                //     console.log(reservas[index].fecha +" == "+ objAux.fecha);
                if(reservas[index].fecha == objAux.fecha){
                    // console.log("Entro al if");
                    salas.forEach(s => {
                        if(reservas[index].salaId == s.id){
                            throw new Error("Horario no disponible");
                        }
                    });
                }
            }
            
            t = await sequelize.transaction();
            let nuevaReserva = await Reserva.create(objAux,{ transaction: t});

            t.commit();
            res.status(201).json({ data: nuevaReserva });
        } catch (error) {
            if(t)t.rollback();
            res.status(500).json({ data: error.message });
        }
    },
    updateOneById: async (req, res) => {
        let { nombre, fecha, email, sala } = req.body;
        let{ id } = req.params;
        let t;

        let objAux = {
            nombre,
            fecha,
            email,
            salaId: sala
        }

        try {

            let reservas = await Reserva.findAll();
            

            reservas.forEach(reserva => {
                let salaReserva = Salas.findByPk(sala)
                if(reserva.fecha == objAux.fecha && salaReserva.id == sala ){
                    throw new Error("Error, sala ocupada");
                }
            });


            t = await sequelize.transaction();

            await Reserva.update(objAux, { where: { id }, transaction: t });

            let actReserva = await Reserva.findByPk(id);

            t.commit();

            res.status(200).json({ data: actReserva });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
    deleteOneById: async (req, res) => {
        let { id } = req.params;
        let t;

        try {
            t = await sequelize.transaction();

            await Reserva.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({  data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({  error: error.message });
        }
    },
}


module.exports = controller;