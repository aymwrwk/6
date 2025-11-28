const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  try {
    const { valor, descricao } = JSON.parse(event.body);

    // 1. PEGAR TOKEN DE ACESSO
    const auth = await fetch("https://api.livepix.gg/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.LIVEPIX_CLIENT_ID,
        client_secret: process.env.LIVEPIX_CLIENT_SECRET,
        grant_type: "client_credentials"
      })
    });

    const { access_token } = await auth.json();

    // 2. CRIAR PAGAMENTO
    const response = await fetch("https://api.livepix.gg/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      },
      body: JSON.stringify({
        amount: valor,
        description: descricao,
        callback_url: "https://explana.shop/.netlify/functions/webhook-livepix"
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: err.message })
    };
  }
};
