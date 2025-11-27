exports.handler = async (event, context) => {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

    // Coloque seus dados reais aqui!!!
    const clientId = "cc405852-0aba-436a-bf91-b30f35322e85";
    const clientSecret = "G3nJUgysggOrP6KsZh9QJGeDDkcwbyRZfyXT/A2oJFSigty6RgqLm/ThzCIZ5A2dt1o7CQwoWZoEWauwAksxDnZRsLwQoaFGJwFMLnq056+QthSFUjEhLb6tXoPxBUDxhf6Q1fQshM7oxvJu7hT28dmQpWV7JJ1ybmfO2QKTruY";

    const valor = 7.90;
    const descricao = "Compra no site";

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
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(result)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
