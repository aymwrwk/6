const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async (event, context) => {
  // Permitir requisições do seu site
  const allowedOrigins = [
    "https://explana.shop",
    "https://*.netlify.app",
    "http://localhost:8888"
  ];

  const origin = event.headers.origin;

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders
    };
  }

  try {
    const body = JSON.parse(event.body);
    const amount = body.amount || 7.90;

    const response = await fetch("https://api.livepix.gg/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LIVEPIX_API_KEY}`
      },
      body: JSON.stringify({
        amount: amount,
        description: "Compra na Explana"
      })
    });

    const data = await response.json();
    console.log("LivePix resposta:", data);

    if (!data.checkout_url) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "LivePix não retornou checkout_url",
          detalhes: data
        })
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        checkout_url: data.checkout_url,
        payment_id: data.id
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Erro interno no servidor",
        detalhes: err.message
      })
    };
  }
};
