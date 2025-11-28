const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body || "{}");

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ erro: "ID do pagamento não informado" })
    };
  }

  try {
    const response = await fetch(`https://api.livepix.gg/api/v1/payments/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.LIVEPIX_API_KEY}`,
        "Accept": "application/json"
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: data.status,
        pago: data.status === "PAID",
        raw: data
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: err.message })
    };
  }
};
