const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async () => {
  try {
    const response = await fetch("https://api.livepix.gg/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.LIVEPIX_CLIENT_ID,
        client_secret: process.env.LIVEPIX_CLIENT_SECRET,
        grant_type: "client_credentials"
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ erro: err.message }) };
  }
};
