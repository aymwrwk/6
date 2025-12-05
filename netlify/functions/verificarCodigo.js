exports.handler = async (event) => {
  const code = (event.queryStringParameters.code || "").toUpperCase();

 const codes = {
  "X9K2M7": { email:"email1@exemplo.com", pass:"senha1" },
  "A7P0Q3": { email:"email2@exemplo.com", pass:"senha2" },
  "Z4R8T1": { email:"email3@exemplo.com", pass:"senha3" }
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
