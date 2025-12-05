exports.handler = async (event) => {
  const code = (event.queryStringParameters.code || "").toUpperCase();

  const codes = {
    "A9fK72mQxL4p":   { email:"acesso1@demo.com", pass:"senhaDemo#1" },
    "BRAVO20":  { email:"acesso2@demo.com", pass:"senhaDemo#2" },
    "CHARLIE30":{ email:"acesso3@demo.com", pass:"senhaDemo#3" },
    "DELTA40":  { email:"acesso4@demo.com", pass:"senhaDemo#4" },
    "ECHO50":   { email:"acesso5@demo.com", pass:"senhaDemo#5" }
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
