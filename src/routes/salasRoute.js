const { Router } = require("express");
const { getAll, saveOne, updateOneById, deleteOneById } = require("../controllers/salasController");

const router = Router();

router.get("/salas", getAll);
router.post("/salas", saveOne);
router.put("/salas/:id", updateOneById);
router.delete("/salas/:id", deleteOneById);

module.exports = router;