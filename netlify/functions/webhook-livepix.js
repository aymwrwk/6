exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");

  console.log("Webhook recebido:", body);

  if (body.status === "PAID") {
    // Aqui você pode:
    // - enviar email
    // - salvar no supabase
    // - liberar item digital
    // - atualizar banco de dados
    
    console.log("Pagamento confirmado:", body.payment_id);
  }

  return {
    statusCode: 200,
    body: "OK"
  };
};
