const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  try {
    const { id } = JSON.parse(event.body);

    const response = await fetch(`https://api.livepix.gg/v1/payments/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.LIVEPIX_API_KEY}`
      }
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
