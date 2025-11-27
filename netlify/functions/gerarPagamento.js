exports.handler = async (event, context) => {
    const fetch = (...args) =>
        import("node-fetch").then(({ default: fetch }) => fetch(...args));

    // ORIGENS PERMITIDAS
    const allowedOrigins = [
        "https://explana.shop",
        "https://explana.netlify.app",
        "http://localhost:8888"
    ];

    const origin = event.headers.origin;

    const corsHeaders = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Origin":
            allowedOrigins.some(o => origin?.startsWith(o)) ? origin : allowedOrigins[0]

    };

    // Resposta do pré-flight OPTIONS
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: corsHeaders
        };
    }

    // -----------------------------
    // PROCESSAMENTO DO PAGAMENTO
    // -----------------------------
    let body;

    try {
        body = JSON.parse(event.body || "{}");
    } catch (e) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: "JSON inválido" })
        };
    }

    const valor = Number(
        body.item?.price?.replace("R$", "").replace(",", ".")
    );

    const descricao = body.item?.title || "Compra no site";

    if (!valor || isNaN(valor)) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Valor inválido" })
        };
    }

    try {
        const response = await fetch("https://api.livepix.gg/v1/charge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Client-Id": "cc405852-0aba-436a-bf91-b30f35322e85",
                "Client-Secret":
                    "G3nJUgysggOrP6KsZh9QJGeDDkcwbyRZfyXT/A2oJFSigty6RgqLm/ThzCIZ5A2dt1o7CQwoWZoEWauwAksxDnZRsLwQoaFGJwFMLnq056+QthSFUjEhLb6tXoPxBUDxhf6Q1fQshM7oxvJu7hT28dmQpWV7JJ1ybmfO2QKTruY"
            },
            body: JSON.stringify({
                value: valor,
                description: descricao
            })
        });

        const result = await response.json();

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                checkout_url: result.checkout_url,
                charge_url: result.charge_url,
                ...result
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: "Falha ao conectar com o LivePix",
                detalhes: error.message
            })
        };
    }
};
