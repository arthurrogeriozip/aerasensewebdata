// Adiciona um evento de ao carregar o documento HTML
document.addEventListener("DOMContentLoaded", () => {
  // Banner
  var banner = document.getElementById("banner");

  // Função para exibir o banner de cookies
  function exibirBannerCookies() {
    banner.style.display = "flex";
  }

  // Chama a função de exibir o banner de cookies, após 2s que a página carrega
  setTimeout(exibirBannerCookies, 3000);
});

// Função para esconder o banner de cookies
function esconderBannerCookies() {
  banner.style.display = "none";
}
