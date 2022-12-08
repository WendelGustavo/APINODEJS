const express = require("express");
const userController = require("../controllers/userController");
const movimentoController = require("../controllers/movimentController");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).send("<h1>CASHBOOK API</h1>");
});

router.get("/user", async (req, res, next) => {
    user = await userController.get();
    res.status(200).send(user);
});

router.post("/user/login", async (req, res, next) => {
    user = await userController.login(req.body);
    res.status(200).send(user);
});

router.post("/user/logout", async (req, res, next) => {
    user = await userController.login(req.headers["x-access-token"]);
    res.status(200).send(user);
});

router.post("/mov", async (req, res, next) => {
  auth = userController.verifyJWT(req.headers["x-access-token"]);
  if (auth.idUser) {
      if (req.headers.iduser == auth.idUser) {
          resp = await movimentoController.post(req.body, req.headers.iduser);
          resp = Object.assign({}, resp, auth);
      } else {
          resp = { status: "null", auth };
      }
  } else {
      resp = { status: "null", auth };
  }
  res.status(200).send(resp);
});

router.put("/mov", async (req, res, next) => {
  movimento = movimentoController.put(req.body, req.headers.idUser);
});

router.delete("/movimento", async (req, res, next) => {
  movimento = movimentoController.delete(req.headers.idUser);
});

/*router.get("/moviments", async (req, res, next) => {
    auth = userController.verifyJWT(req.headers["x-access-token"]);
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            resp = await movimentoController.get(Buffer.from(req.query.query, "base64").toString("utf-8"));
            resp = Object.assign({}, resp, auth);
        } else {
            resp = { status: "null", auth };
        }
    } else {
        resp = { status: "null", auth };
    }
    res.status(200).send(resp);
});*/

router.get("/moviments", async (req, res) => {
    auth = userController.verifyJWT(req.headers["x-access-token"]);
    if (auth.idUser) {
      if (req.headers.iduser == auth.idUser) {
        resp = await movimentoController.get();
        resp = Object.assign({}, resp, auth);
      } else {
        resp = { status: "null", auth };
      }
    } else {
      resp = { status: "null", auth };
    }
    res.status(200).send(resp);
  });
 
router.get("/moviments/cashbalance", async (req, res) => {
   auth = userController.verifyJWT(req.headers["x-access-token"]);
    if (auth.idUser) {
      if (req.headers.iduser == auth.idUser) {
        resp = await movimentoController.cashBalance();
        resp = Object.assign({}, resp, auth);
      } else {
        resp = { status: "null", auth };
      }
    } else {
      resp = { status: "null", auth };
    }
    res.status(200).send(resp);
});

router.get("/moviments/io", async (req, res) => {
  auth = userController.verifyJWT(req.headers["x-access-token"]);
  if (auth.idUser) {
    if (req.headers.iduser == auth.idUser) {
      resp = await movimentoController.movimentsIo();
      resp = Object.assign({}, resp, auth);
    } else {
      resp = { status: "null", auth };
    }
  } else {
    resp = { status: "null", auth };
  }
  res.status(200).send(resp);
});

router.get("/moviments/io/:year/:month", async (req, res) => {
  auth = userController.verifyJWT(req.headers["x-access-token"]);
  if (auth.idUser) {
    if (req.headers.iduser == auth.idUser) {
      const year = req.params.year;
      const month = req.params.month;
      resp = await movimentoController.anoMes(year, month);
      resp = Object.assign({}, resp, auth);
    } else {
      resp = { status: "null", auth };
    }
  } else {
    resp = { status: "null", auth };
  }
  res.status(200).send(resp);
})

router.get("/moviments/io/:yearI/:monthI/:monthF/:yearF", async (req, res) => {
  auth = userController.verifyJWT(req.headers["x-access-token"]);
  if (auth.idUser) {
    if (req.headers.iduser == auth.idUser) {
      const yearI = req.params.yearI;
      const monthI = req.params.monthI;
      const yearF = req.params.yearF;
      const monthF = req.params.monthF;
      resp = await movimentoController.filtro(yearI, monthI, yearF, monthF);
      resp = Object.assign({}, resp, auth);
    } else {
      resp = { status: "null", auth };
    }
  } else {
    resp = { status: "null", auth };
  }
  res.status(200).send(resp);
});

router.get("/moviments/:year/:month", async (req, res) => {
    auth = userController.verifyJWT(req.headers["x-access-token"]);
    if (auth.idUser) {
      if (req.headers.iduser == auth.idUser) {
        const year = req.params.year;
        const month = req.params.month;
        resp = await movimentoController.MovimentsLista(year, month);
        resp = Object.assign({}, resp, auth);
      } else {
        resp = { status: "null", auth };
      }
    } else {
      resp = { status: "null", auth };
    }
    res.status(200).send(resp);
});

module.exports = router;
