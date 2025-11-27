exports.handler = async (event, context) => {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

    const allowedOrigins = [
        "https://explana.shop",
        "https://*.netlify.app",
        "http://localhost:8888"
    ];

    const origin = event.headers.origin;

    let corsHeaders = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    };

    // Se a origem estiver na whitelist, libera
    if (allowedOrigins.includes(origin)) {
        corsHeaders["Access-Control-Allow-Origin"] = origin;
    } else {
        // fallback permite tudo (mas só GET)
        corsHeaders["Access-Control-Allow-Origin"] = "*";
    }

    // Resposta do OPTIONS (pré-flight)
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: corsHeaders
        };
    }

    // --------- PROCESSAMENTO DO PAGAMENTO -----------

    const body = JSON.parse(event.body || "{}");

    const valor = Number(body.item?.price?.replace("R$", "").replace(",", "."));
    const descricao = body.item?.title || "Compra no site";

    if (!valor) {
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
                "Client-Secret": "G3nJUgysggOrP6KsZh9QJGeDDkcwbyRZfyXT/A2oJFSigty6RgqLm/ThzCIZ5A2dt1o7CQwoWZoEWauwAksxDnZRsLwQoaFGJwFMLnq056+QthSFUjEhLb6tXoPxBUDxhf6Q1fQshM7oxvJu7hT28dmQpWV7JJ1ybmfO2QKTruY"
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
                checkout_url: result.checkoutUrl,
                charge_url: result.chargeUrl,
                ...result
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: error.message })
        };
    }
};
