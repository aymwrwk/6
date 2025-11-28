exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");

  console.log("Webhook recebido:", body);

  if (body.status === "PAID") {
    console.log("Pagamento confirmado:", body.payment_id);
  }

  return {
    statusCode: 200,
    body: "OK"
  };
};
