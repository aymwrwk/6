exports.handler = async (event) => {
  const code = (event.queryStringParameters.code || "").toUpperCase();

  const codes = {
    "ALFA10": {
      produto: "Spotify Premium",
      email: "userforgetname@gmail.com",
      pass: "forget$@123"
    },
    "BRAVO20": {
      produto: "HBO Max",
      email: "pngdesign25@gmail.com",
      pass: "01020304Bv@"
    },
    "CHARLIE30": {
      produto: "Crunchyroll Premium",
      email: "neededgore@gmail.com",
      pass: "forget$@123"
    },
    "DELTA40": {
      produto: "Paramount Plus",
      email: "larissavitoriaff123@gmail.com",
      pass: "forget$@123"
    },
    "ECHO50": {
      produto: "Disney Plus",
      email: "pngdesign25@gmail.com",
      pass: "01020304Bv@"
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
