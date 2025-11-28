// Usando node-fetch@2 para melhor compatibilidade com Netlify Functions
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    // Usando as chaves que você forneceu. **Substitua por Variáveis de Ambiente no Netlify para segurança!**
    const CLIENT_ID = "cc405852-0aba-436a-bf91-b30f35322e85";
    const CLIENT_SECRET =
        "G3nJUgysggOrP6KsZh9QJGeDDkcwbyRZfyXT/A2oJFSigty6RgqLm/ThzCIZ5A2dt1o7CQwoWZoEWauwAksxDnZRsLwQoaFGJwFMLnq056+QthSFUjEhLb6tXoPxBUDxhf6Q1fQshM7oxvJu7hT28dmQpWV7JJ1ybmfO2QKTruY";

    const corsHeaders = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Origin": "*" // Simplificado para este exemplo
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: corsHeaders };
    }

    let body;
    try {
        body = JSON.parse(event.body || "{}");
    } catch (e) {
        return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "JSON inválido" }) };
    }

    const valor = Number(body.item?.price?.replace("R$", "").replace(",", "."));
    const descricao = body.item?.title || "Compra no site";
    
    // URL de Redirecionamento configurada no seu painel LivePix: 
    // https://explana.shop/pagamento.html. O LivePix enviará o usuário para cá.

    if (!valor || isNaN(valor)) {
        return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Valor inválido" }) };
    }

    // CHAMAR API LIVEPIX
    try {
        const response = await fetch("https://api.livepix.gg/v1/charge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Client-Id": CLIENT_ID,
                "Client-Secret": CLIENT_SECRET
            },
            body: JSON.stringify({
                value: valor,
                description: descricao
            })
        });

        const result = await response.json();

        if (!response.ok || !result.checkout_url) {
            console.error("Erro LivePix:", result);
            return {
                statusCode: response.status || 500,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: "Falha na criação do pagamento (Verifique as chaves ou URL da API).",
                    detalhes: result
                })
            };
        }

        // Retorna a URL de checkout E o ID da cobrança para o frontend
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                checkout_url: result.checkout_url,
                charge_id: result.id, // ID da cobrança para usar como código
            })
        };
    } catch (error) {
        console.error("Erro de Conexão:", error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: "Falha ao conectar com o servidor.",
                detalhes: error.message
            })
        };
    }
};