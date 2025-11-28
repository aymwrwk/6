const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);

  try {
    const response = await fetch(`https://api.livepix.gg/payment/${id}`, {
      headers: {
        "Authorization": `Bearer ${process.env.LIVEPIX_API_KEY}`
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
