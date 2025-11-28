const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  try {
    const { valor, descricao } = JSON.parse(event.body || "{}");

    if (!valor) {
      return {
        statusCode: 400,
        body: JSON.stringify({ erro: "Valor não informado" })
      };
    }

    const response = await fetch("https://api.livepix.gg/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LIVEPIX_API_KEY}`
      },
      body: JSON.stringify({
        amount: valor,
        description: descricao || "Pagamento",
        callback_url: "https://explana.shop/.netlify/functions/webhook-livepix"
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        recebido: data,
        checkout_url: data.checkout_url
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: err.message })
    };
  }
};
