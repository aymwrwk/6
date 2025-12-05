exports.handler = async (event) => {
  const code = (event.queryStringParameters.code || "").toUpperCase();

  const codes = {
    "ALFA10": {
      produto: "Plano Gold",
      email: "acesso1@demo.com",
      pass: "senhaDemo#1"
    },
    "BRAVO20": {
      produto: "Assinatura Premium",
      email: "acesso2@demo.com",
      pass: "senhaDemo#2"
    },
    "CHARLIE30": {
      produto: "Curso Avançado",
      email: "acesso3@demo.com",
      pass: "senhaDemo#3"
    },
    "DELTA40": {
      produto: "Pacote Pro",
      email: "acesso4@demo.com",
      pass: "senhaDemo#4"
    },
    "ECHO50": {
      produto: "Plano Master",
      email: "acesso5@demo.com",
      pass: "senhaDemo#5"
    }
  };

  if (!codes[code]) {
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: false })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      produto: codes[code].produto,
      email: codes[code].email,
      pass:  codes[code].pass
    })
  };
};
