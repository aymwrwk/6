exports.handler = async (event, context) => {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

    const clientId = "cc405852-0aba-436a-bf91-b30f35322e85";
    const clientSecret = "G3nJUgysggOrP6KsZh9QJGeDDkcwbyRZfyXT/A2oJFSigty6RgqLm/ThzCIZ5A2dt1o7CQwoWZoEWauwAksxDnZRsLwQoaFGJwFMLnq056+QthSFUjEhLb6tXoPxBUDxhf6Q1fQshM7oxvJu7hT28dmQpWV7JJ1ybmfO2QKTruY";

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://explana.shop",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            }
        };
    }

    const body = JSON.parse(event.body || "{}");

    const valor = Number(body.item?.price?.replace("R$", "").replace(",", "."));
    const descricao = body.item?.title || "Compra no site";

    if (!valor) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "https://explana.shop"
            },
            body: JSON.stringify({ error: "Valor inválido" })
        };
    }

    try {
        const response = await fetch("https://api.livepix.gg/v1/charge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Client-Id": clientId,
                "Client-Secret": clientSecret
            },
            body: JSON.stringify({
                value: valor,
                description: descricao
            })
        });

        const result = await response.json();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://explana.shop",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: JSON.stringify({
                checkout_url: result.checkoutUrl,
                charge_url: result.chargeUrl,
                ...result
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "https://explana.shop"
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
