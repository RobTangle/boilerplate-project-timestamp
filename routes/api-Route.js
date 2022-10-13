const router = require("express").Router();
// const router = Router();

router.get("/api/test", (req, res) => {
  console.log("api/test de prueba");
  return res.status(200).send("HOLA!!!");
});

module.exports = router;
