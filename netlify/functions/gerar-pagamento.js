exports.handler = async (event) => {
  try {
    const { valor, descricao } = JSON.parse(event.body);

    const response = await fetch("https://api.livepix.gg/api/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LIVEPIX_API_KEY}`
      },
      body: JSON.stringify({
        amount: valor,
        description: descricao,
        callback_url: "https://explana.shop/.netlify/functions/webhook-livepix"
      })
    });

    const data = await response.json();

    if (!data.checkout_url) {
      return {
        statusCode: 500,
        body: JSON.stringify({ erro: "LivePix não retornou checkout_url", resposta: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.checkout_url })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: err.message })
    };
  }
};
