
const instagram = require("./modules/insta");

const express = require('express');
var cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => console.log("Server is running on port http://127.0.0.1:3000"));

const db = require("./modules/db");

//instagram.abrir_browser();  // função de teste 

(async () => {

  console.log('Começou!');

  console.log('SELECT * FROM cadastro');
//  const db_cadastro = await db.selectCustomers();
//  console.log(db_cadastro);
})();


app.post("/Cadastro", (req, res) => {

  const { email, senha, boas_vindas } = req.body;
  const cliente = { email, senha, boas_vindas };

  (async () => {
    try {
      await db.insertCustomer({ email: cliente.email, senha: cliente.senha, boas_vindas: cliente.boas_vindas });
      const new_prestador = await db.last_insert();
      return res.status(201).json(new_prestador); //id do banco de dados return
    } catch (e) {
      console.error('Error when create: ', e.message); //return object error
      return res.status(500).json("False");
    }
  })();
});

app.post("/Update/:id", (req, res) => {

  const { id } = req.params;

  const { email, senha, boas_vindas } = req.body;
  const cliente = { email, senha, boas_vindas };

  (async () => {
    try {
      update = await db.find(id); //update.id
      await db.updateCustomer(id, { email: cliente.email, senha: cliente.senha, boas_vindas: cliente.boas_vindas });
      update = await db.find(id);
      return res.status(201).json(update);
    } catch (e) {
      console.error('Error when update: ', e.message); //return object error
      return res.status(500).json("False");
    }
  })();
});

app.get("/Cadastros", (req, res) => {
  (async () => {
    const db_cadastro = await db.selectCustomers();
    return res.status(200).json(db_cadastro);
  })();
});

app.post("/Delete/:id", (req, res) => {

  const { id } = req.params;

  (async () => {
    try {
      await db.deleteCustomer(id);
      const db_cadastro = await db.selectCustomers();
      return res.status(200).json(db_cadastro);
    } catch (e) {
      console.error('Error when delete: ', e.message); //return object error
      return res.status(500).json("False");
    }


  })();

});

var client_received = [];

app.post("/Resetar_dia", (req, res) => {
  instagram.resetar_dia();
  return res.status(200).json("Resetado");
});

var page_client = [];

app.post("/Inicializar", (req, res) => {

  const { email, senha, boas_vindas } = req.body;
  const info = { email, senha, boas_vindas };
  //prestador.email

  try {
    instagram.bot(info.email, info.senha, info.boas_vindas);

    return res.status(201).json(info);
  } catch (e) {
    console.error(e.message);
    return res.status(500).json("False");
  }

});

app.post("/Pegar_pagina", (req, res) => {

  try {
    const received = instagram.getPage();

    let bool_init = false;
    if (received != null) {
      for (var i = 0; i <= page_client.length - 1; i++) {
        if (received.email == page_client[i].email) {
          bool_init = true;
          break;
        }
      }
      if (bool_init == false) page_client.push(received);
    }

    return res.status(201).json(page_client);
  } catch (e) {
    console.error(e.message);
    return res.status(500).json("False");
  }


});

app.post("/Envia", (req, res) => {

  // const { email, mensagem, arroba } = req.body;
  // const info = { email, mensagem, arroba };

  // let bool_init = false;
  // var page = null;

  // for (var i = 0; i <= page_client.length - 1; i++) {
  //   if (email == page_client[i].email) {
  //     bool_init = true;
  //     page = page_client[i].page;
  //     break;
  //   }
  // }
  // if (bool_init == false) return res.status(404).json("Not Found");

  // try {
  //   instagram.envia(info.mensagem, info.arroba.replace("@", ""), page);
  //   return res.status(201).json("Enviado");
  // } catch (e) {
  //   console.error(e.message);
  //   return res.status(500).json("False");
  // }

  return res.status(200).json("False");

});


app.get("/Status", (req, res) => {
  try {
    var status = instagram.status();
    return res.status(201).json(status);
  } catch (e) {
    console.error(e.message);
    return res.status(500).json("False");
  }
});







