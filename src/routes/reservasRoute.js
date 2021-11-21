const { Router } = require("express");
const { getAll, saveOne, updateOneById, deleteOneById } = require("../controllers/reservasController");

const router = Router();

router.get("/reservas", getAll);
router.post("/reservas", saveOne);
router.put("/reservas/:id", updateOneById);
router.delete("/reservas/:id", deleteOneById);

module.exports = router;