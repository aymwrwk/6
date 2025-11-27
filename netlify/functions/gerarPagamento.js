exports.handler = async (event, context) => {
    const fetch = require("node-fetch");

    // ORIGENS PERMITIDAS
    const allowedOrigins = [
        "https://explana.shop",
        "https://explana.netlify.app",
        "http://localhost:8888"
    ];

    const origin = event.headers.origin;

    const isAllowed = allowedOrigins.some(o => origin?.startsWith(o));

    const corsHeaders = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0]
    };

    // OPTIONS (pré-flight)
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: corsHeaders
        };
    }

    // Ler o JSON
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

    // CHAMAR API LIVEPIX
    try {
        const response = await fetch("https://api.livepix.gg/v1/charge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Mantenha seu Client-Id e Client-Secret.
                // Recomenda-se usar process.env.LIVEPIX_SECRET aqui!
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
        console.log("Resposta Completa LivePix:", result); // Log para diagnóstico

        // Verifica se a resposta foi bem-sucedida E se contém o link necessário
        if (!response.ok || (!result.checkout_url && !result.charge_url)) {
            const errorMessage = result.message || response.statusText || "Erro desconhecido na LivePix";
            
            // Se falhar na autenticação, o status será 401 ou 403.
            return {
                statusCode: response.status || 500,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: "Erro na API LivePix: " + errorMessage,
                    detalhes: result // Retorna a resposta completa para o frontend
                })
            };
        }

        // Resposta de sucesso (deve conter o link)
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
        console.error("Erro de Conexão no Netlify Function:", error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: "Falha ao conectar com o servidor LivePix",
                detalhes: error.message
            })
        };
    }
};