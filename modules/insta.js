require('dotenv').config();
const puppeteer = require('puppeteer');

let noti = 0;   //notifications


var navegando = false;


async function abrir_browser() {             // função de teste 
  const browser = await puppeteer.launch({
    headless: false,
    dumpio: true,
  });

  const page = await browser.newPage();
  //await page.goto('https://www.instagram.com/');
  await page.goto('https://www.instagram.com/direct/inbox/');

}




async function bot(email, senha, boas_vindas) {

  status("Inicializando");
  navegando = true;
  
  const browser = await puppeteer.launch({
    headless: false,
    dumpio: true,
  });

  const page = await browser.newPage();
  getPage(email, page);
  //await page.goto('https://www.instagram.com/');
  await page.goto('https://www.instagram.com/direct/inbox/');
  //await page.goto('https://www.instagram.com/direct/inbox/?next=https%3A%2F%2Fwww.instagram.com%2Fdirect%2Finbox%2F%3F__coig_login%3D1');

  //await page.waitForNavigation();

  //console.log(browser);

  await delay(5000);
  await page.type('[name="username"]', email); await delay(2000);
  await page.type('[name="password"]', senha); await delay(1000);
  await page.click('[type="submit"]');

  // try {
  //   await page.waitForSelector('[aria-label="Direct"]');
  //   await page.click('[aria-label="Direct"]');
  // }
  // catch (error) {
  //   console.log("Direct");
  //   console.log(error);
  //   await browser.close();
  // }

  await page.waitForSelector('[aria-label="Direct"]');
  await page.goto('https://www.instagram.com/direct/inbox/');delay(1000);



 try {
  await page.waitForSelector('[aria-label="Não usar essa atividade"]');
  await page.click('[aria-label="Não usar essa atividade"]');
  await page.goto('https://www.instagram.com/direct/inbox/');delay(1000);
  }
  catch (error) {
    //console.log(error);
  }

try {
    await page.waitForSelector('[class="_a9-- _a9_1"]');delay(1000);
    await page.click('[class="_a9-- _a9_1"]');
  }
  catch (error) {
    console.log(error);
  }

  await page.goto('https://www.instagram.com/direct/inbox/');delay(1000);

  navegando = false;

  status("Inicializado");

  while (2) {
    delay(5);
    try {
      //var num_notifications = '[class="xwmz7sl xo1l8bm x1ncwhqj xyqdw3p x1mpkggp xg8j3zb x1t2a60a"]'
      var num_notifications = '[class="xwmz7sl x1ncwhqj xo1l8bm xyqdw3p x1mpkggp xg8j3zb x1t2a60a"]'
      await page.waitForSelector(num_notifications);
      let element = await page.$(num_notifications);
      noti = await page.evaluate(el => el.textContent, element);
      console.log(noti);
    }

    catch (error) {
      console.log(error);
      noti = 0;
    }

    //var entrar = null;  // var entrar = null;

    if (noti != 0 && navegando == false) { //&& entrar == false
      navegando = true;

      const ElementHandle = await page.$$('[role="listitem"]');

      for (var i = 0; i < noti; i++) {
        await ElementHandle[i].click(); await delay(2000);

        var elemento_nome = '[class="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft"]'
        var elemento_apelido = '[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x1a2a7pz xjp7ctv xeq5yr9"]'
        var href = await page.$eval(elemento_apelido, (elm) => elm.href);

        //href = href.replaceAll("/", " ");
        //var pattern = href.match(/\s(\w+)$/);
        //apelido = pattern[1];

        apelido = href;

        let element = await page.$(elemento_nome);
        var nome = await page.evaluate(el => el.textContent, element);

        let bool_received = false;

        for (var i = 0; i <= client_received.length - 1; i++) {
          if (nome == client_received[i] || apelido == client_received[i]) {
            bool_received = true;
            break;
          }
        }
        if (bool_received == false) {
          status("Enviando Mensagem de Recepção");

          var boas_vindas = "Bot Oi";

          await page.waitForSelector('[aria-label="Mensagem"]');await delay(1000);
          await page.type('[aria-label="Mensagem"]', boas_vindas);await delay(1000);
          var enviar = '[class="x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w xdl72j9 x2lah0s xe8uvvx xdj266r xat24cr x1mh8g0r x2lwn1j xeuugli x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 x1ypdohk x1i0vuye x1f6kntn xwhw2v2 xl56j7k x17ydfre x2b8uid xlyipyv x87ps6o x14atkfc xcdnw81 xjbqb8w xm3z3ea x1x8b98j x131883w x16mih1h x972fbf xcfux6l x1qhh985 xm0m39n xt0psk2 xt7dq6l xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x1n5bzlp x173jzuc x1yc6y37 xfs2ol5"]'
          await page.waitForSelector(enviar);
          await page.click(enviar); delay(1000);

          client_received.push(nome);
          client_received.push(apelido);

        }

        await page.goto('https://www.instagram.com/direct/inbox/'); delay(1000);
        status("Esperando Mensagem");

      }
      navegando = false;
    }
    else {
      //console.log("Nenhuma Notificação");
    }


  }


}

//var enviar = '[class="x1i10hfl"]'
async function envia(mensagem, arroba, page) {
  if (navegando == false) {
    navegando = true;
    status("Enviando Mensagem");
    await page.goto('https://www.instagram.com/direct/inbox/');
    var enviar = '[class="x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w x972fbf xcfux6l x1qhh985 xm0m39n xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x18d9i69 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1lq5wgf xgqcy7u x30kzoy x9jhf4c x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 x1ypdohk x78zum5 x1i0vuye xwhw2v2 x10w6t97 xl56j7k x17ydfre x1f6kntn x1swvt13 x1pi30zi x2b8uid xlyipyv x87ps6o x14atkfc x9bdzbf x1n2onr6 x1d5wrs8 x1tu34mt xzloghq"]'
    await page.waitForSelector(enviar); await delay(1000);
    await page.click(enviar);

    var pesquisa = '[type="text"]'
    await page.waitForSelector(pesquisa); await delay(1000);
    await page.type(pesquisa, arroba);

    //var elementclass = '[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz xh8yej3 x193iq5w x1lliihq x1dm5mii x16mil14 xiojian x1yutycm"]' 
    //const ElementHandle = await page.$$('span[class="x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs xt0psk2 x1i0vuye xvs91rp xo1l8bm x1roi4f4 x10wh9bi x1wdrske x8viiok x18hxmgj"]');
    //const ElementHandle = await page.$$('span[class="x5yr21d xh8yej3"]');
    //const ElementHandle = await page.$$('[role="button"]');
    //const ElementHandle = await page.evaluate(() => Array.from(document.querySelectorAll('[role="button"]'), element => element.textContent));
    const ElementHandle = await page.evaluate(() => Array.from(document.querySelectorAll('[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz xh8yej3 x193iq5w x1lliihq x1dm5mii x16mil14 xiojian x1yutycm"]'), element => element.textContent));

    // var elemento_apelido = '[class="x5yr21d xh8yej3"]'
    // var alt = await page.$eval(elemento_apelido, (elm) => elm.alt);
    console.log(ElementHandle);

    for (var i = 0; i <= ElementHandle.length - 1; i++) {

      //let destino = await page.evaluate(el => el.textContent, ElementHandle[i]);
      let destino = ElementHandle[i];

      //let alt = await page.evaluate((elm) => elm.alt, ElementHandle[i]);

      console.log(destino);
      //console.log("alt");console.log(alt);

      let search = search_word(destino, arroba);

      if (search >= 1000) {   //1
        await ElementHandle[i].click();
        var Bate_papo = '[class="x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w x972fbf xcfux6l x1qhh985 xm0m39n xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x18d9i69 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1lq5wgf xgqcy7u x30kzoy x9jhf4c x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 x1ypdohk x78zum5 x1i0vuye xwhw2v2 xl56j7k x17ydfre x1f6kntn x2b8uid xlyipyv x87ps6o x14atkfc x9bdzbf x1n2onr6 x1d5wrs8 xn3w4p2 x5ib6vp xc73u3c x1tu34mt xzloghq"]'
        await page.waitForSelector(Bate_papo); await delay(1000);
        await page.click(Bate_papo);
        await page.waitForSelector('[aria-label="Mensagem"]'); await delay(1000);
        await page.type('[aria-label="Mensagem"]', mensagem);
        var enviar = '[class="x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w xdl72j9 x2lah0s xe8uvvx xdj266r xat24cr x1mh8g0r x2lwn1j xeuugli x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1ejq31n xd10rxx x1sy0etr x17r0tee x9f619 x1ypdohk x1i0vuye xwhw2v2 xl56j7k x17ydfre x1f6kntn x2b8uid xlyipyv x87ps6o x14atkfc x1d5wrs8 x972fbf xcfux6l x1qhh985 xm0m39n xm3z3ea x1x8b98j x131883w x16mih1h xt0psk2 xt7dq6l xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 xjbqb8w x1n5bzlp x173jzuc x1yc6y37 xfs2ol5"]'
        await delay(1000);
        await page.click(enviar); delay(1000);

        var elemento_nome = '[class="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft"]'
        var elemento_apelido = '[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1q0g3np x87ps6o x1lku1pv x1a2a7pz xjp7ctv xeq5yr9"]'

        var href = await page.$eval(elemento_apelido, (elm) => elm.href);
        href = href.replaceAll("/", " ");
        var pattern = href.match(/\s(\w+)$/);
        apelido = pattern[1];

        let element = await page.$(elemento_nome);
        var nome = await page.evaluate(el => el.textContent, element);

        let bool_received = false;

        for (var i = 0; i <= client_received.length - 1; i++) {
          if (nome == client_received[i] || apelido == client_received[i]) {
            bool_received = true;
            break;
          }
        }

        if (bool_received == false) {
          client_received.push(nome);
          client_received.push(apelido);
        }

        await page.goto('https://www.instagram.com/direct/inbox/'); delay(1000);

        break;
      }
    }
    navegando = false;
  }

  status("Mensagem Enviada");


}


function search_word(text, word) {

  var x = 0, y = 0;

  for (i = 0; i < text.length; i++) {
    if (text[i] == word[0]) {
      for (j = i; j < i + word.length; j++) {
        if (text[j] == word[j - i]) {
          y++;
        }
        if (y == word.length) {
          x++;
        }
      }
      y = 0;
    }
  }
  //return "'"+word+"' was found "+x+" times.";
  return x;
}










var client_received = [];

function resetar_dia() {
  client_received = [];
}

var stt = null;

function status(status) {
  if (status) {
    stt = status;
  }
  else {
    return stt;
  }
}

function my_page(email, page) {
  this.email = email;
  this.page = page;
}

var received = null;

function getPage(email, page) {
  if (page) {
    received = new my_page(email, page);
  }
  else {
    return received;
  }
}

module.exports = { bot, getPage, envia, resetar_dia, status,abrir_browser }

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}
