exports.handler = async (event) => {
  const code = (event.queryStringParameters.code || "").toUpperCase();

  const codes = {
    "X9K2M7": {
      produto: "Spotify Premium",
      email: "userforgetname@gmail.com",
      pass: "forget$@123"
    },
    "A7P0Q3": {
      produto: "HBO Max",
      email: "pngdesign25@gmail.com",
      pass: "01020304Bv@"
    },
    "Z4R8T1": {
      produto: "Crunchyroll Premium",
      email: "neededgore@gmail.com",
      pass: "forget$@123"
    },
    "U98TWK": {
      produto: "Paramount Plus",
      email: "larissavitoriaff123@gmail.com",
      pass: "forget$@123"
    },
    "36YMNF": {
      produto: "Disney Plus",
      email: "pngdesign25@gmail.com",
      pass: "01020304Bv@"
    },
    "54FTCP": {
      produto: "HBO Max",
      email: "william.ibarrondo@yahoo.com",
      pass: "1barrondo!"
    },
    "ASDHK2": {
      produto: "Roblox / Limited",
      email: "larissavitoriaff123@gmail.com",
      pass: "01020304BV@"
    },
    "IKN8SA": {
      produto: "Spotify Premium",
      email: "laurinhab26@gmail.com",
      pass: "forget$@123"
    },
    "5JHSDA": {
      produto: "Valorant Smurf",
      email: "matheusbjj15",
      pass: "01020304Bv@"
    }
    ,
    "SAD6NM": {
      produto: "Twitter Antiga",
      email: "junior_william@hotmail.com",
      pass: "01020304Bv@"
    }
    ,
    "7GTYNM": {
      produto: "Roblox",
      email: "luismiguelito777",
      pass: "01020304Bv@"
    }
    ,
    "WEQUY1": {
      produto: "League of Legends",
      email: "nuintinakx7",
      pass: "01020304Bv@"
    },
    "SBNDW7": {
      produto: "Spotify Premium",
      email: "usertdhsinho@gmail.com",
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
