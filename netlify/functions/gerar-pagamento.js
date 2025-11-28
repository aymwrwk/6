exports.handler = async (event) => {
  try {
    const { valor, descricao } = JSON.parse(event.body || "{}");

    const response = await fetch("https://api.livepix.gg/api/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LIVEPIX_API_KEY}`
      },
      body: JSON.stringify({
        amount: Number(valor),
        description: descricao,
        callback_url: "https://explana.shop/.netlify/functions/webhook-livepix"
      })
    });

    const text = await response.text(); // <-- captura TUDO
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    console.log("📌 RESPOSTA COMPLETA DO LIVEPIX:", JSON.stringify(data, null, 2));

    if (!data.checkout_url) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          erro: "LivePix não retornou checkout_url",
          motivo_real: data,   // <-- agora você vai VER O ERRO
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.checkout_url })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        erro: "Falha geral",
        detalhe: err.message
      })
    };
  }
};
