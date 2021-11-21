const { Salas, sequelize } = require("../database/models/index");


const controller = {
    getAll: async (req, res) => {
        let meta = { status: "success", length: 0, url: req.originalUrl};

        try {
            let salas = await Salas.findAll();

            meta.length = salas.length

            res.status(200).json({ meta, data: salas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    saveOne: async (req, res) => {
        let { nombre } = req.body;
        let t;
        let objAux = {
            nombre
        }

        try {

            let salas = await Salas.findAll();

            salas.forEach(sala => {
                if(sala.nombre == objAux.nombre){
                    throw new Error("El nombre de una sala no puede repetirse");
                }
            });

            t = await sequelize.transaction();
            let nuevaSala = await Salas.create(objAux,{ transaction: t});

            t.commit();
            res.status(201).json({ data: nuevaSala });
        } catch (error) {
            if(t)t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
    updateOneById: async (req, res) => {
        let { nombre } = req.body;
        let{ id } = req.params;
        let t;
        let objAux = {
            nombre
        }

        try {

            let salas = await Salas.findAll();

            salas.forEach(sala => {
                if(sala.nombre == objAux.nombre){
                    throw new Error("El nombre de una sala no puede repetirse");
                }
            });

            t = await sequelize.transaction();

            await Salas.update(objAux, { where: { id }, transaction: t });

            let actSala = await Salas.findByPk(id);

            t.commit();

            res.status(200).json({ data: actSala });
        } catch (error) {
            if(t)t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
    deleteOneById: async (req, res) => {
        let { id } = req.params;
        let t;

        try {
            t = await sequelize.transaction();

            await Salas.destroy({ where: { id } },{ transaction: t });

            t.commit();

            res.status(200).json({  data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({  error: error.message });
        }
    },
}


module.exports = controller;