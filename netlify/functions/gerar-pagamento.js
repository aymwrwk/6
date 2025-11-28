const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  try {
    const { valor, descricao } = JSON.parse(event.body);

    const response = await fetch("https://api.livepix.gg/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LIVEPIX_API_KEY}`
      },
      body: JSON.stringify({
        amount: valor,
        description: descricao
      })
    });

    const data = await response.json();

    console.log("RETORNO LIVEPIX:", data);

    if (!data.checkout_url) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          erro: "LivePix não retornou checkout_url",
          detalhe: data
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.checkout_url })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        erro: "Erro na function",
        detalhe: error.message
      })
    };
  }
};
