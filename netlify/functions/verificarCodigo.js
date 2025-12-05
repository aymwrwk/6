exports.handler = async (event) => {
  const code = (event.queryStringParameters.code || "").toUpperCase();

  const codes = {
    "kT3&Qh!9Fz@P8b$E1^uN#6xC*4rM0s%":   { email:"acesso1@demo.com", pass:"senhaDemo#1" },
    "A#7tG2!vP9&cD4$Qm^S6w@0L*eF8nR":  { email:"acesso2@demo.com", pass:"senhaDemo#2" },
    "V9m$eR!4p@D7zQ#1gF*8uC%wL2^tH0":{ email:"acesso3@demo.com", pass:"senhaDemo#3" },
    "p$9H!2fQ^mT#7xC@4rU*1dZ%8Vw&0sB3L^yN@G":  { email:"acesso4@demo.com", pass:"senhaDemo#4" },
    "W2e!K7$Qp#t9C^g4*B0v@1S%6mF&x8D@H5rZ$P":   { email:"acesso5@demo.com", pass:"senhaDemo#5" },
    "n@X4$gM!8bC#2Y^qT*7F%0sW&5dR@1vL$hE9P^":   { email:"acesso6@demo.com", pass:"senhaDemo#6" }
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
      email: codes[code].email,
      pass:  codes[code].pass
    })
  };
};
