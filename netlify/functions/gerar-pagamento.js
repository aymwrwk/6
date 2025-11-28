const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  try {
    const { valor, descricao } = JSON.parse(event.body);

    const response = await fetch("https://api.livepix.gg/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LIVEPIX_API_KEY}`
      },
      body: JSON.stringify({
        amount: valor,
        description: descricao,
        callback_url: "https://seusite.shop/.netlify/functions/webhook-livepix"
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
