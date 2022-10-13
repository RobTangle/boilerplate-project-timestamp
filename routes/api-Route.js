const router = require("express").Router();

// ------ RUTAS : -------

router.get("/test", (req, res) => {
  console.log("api/test de prueba");
  return res.status(200).send("HOLA!!!");
});

// your first API endpoint...
router.get("/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

router.get("/:date", (req, res) => {
  try {
    const dateFromReq = req.params.date;
    const parsedDateToUnix = Date.parse(dateFromReq);

    if (!parsedDateToUnix) {
      console.log("parsedDateToUnix es falso");
      let dateMiliseconds = Number(dateFromReq); //Lo transformo de string a número
      if (!Number(dateFromReq)) {
        console.log(`dateFromReq a Number es falso:`);
        return res.send({ error: "Invalid Date" });
      }
      const dateObject = new Date(dateMiliseconds);

      return res
        .status(200)
        .send({ unix: Number(dateFromReq), utc: dateObject.toUTCString() });
    }

    const nuevaFecha = new Date(parsedDateToUnix);

    return res.status(200).send({
      unix: parsedDateToUnix,
      utc: nuevaFecha.toUTCString(),
    });
  } catch (error) {
    console.log(`Error en /api/:date. ${error.message}`);
    return res.send(error.message);
  }
});

router.get("/", (req, res) => {
  console.log(`En "api/"`);
  try {
    let utcTime = new Date();

    return res.json({ unix: Date.now(), utc: utcTime.toUTCString() });
  } catch (error) {
    console.log(`Error en /api. ${error.message}`);
    return res.status(400).send({ error: `${error.message}` });
  }
});

module.exports = router;
