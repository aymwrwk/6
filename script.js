// ANIMAÇÃO DOS PRODUTOS AO APARECER
const produtos = document.querySelectorAll(".produto-card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
});

produtos.forEach(prod => observer.observe(prod));


// BARRA DE PESQUISA
const searchInput = document.getElementById("searchInput");
const produtosContainer = document.getElementById("produtosContainer");

searchInput.addEventListener("keyup", () => {
    const termo = searchInput.value.toLowerCase();

    document.querySelectorAll(".produto-card").forEach(card => {
        const nome = card.getAttribute("data-name").toLowerCase();

        if (nome.includes(termo)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
