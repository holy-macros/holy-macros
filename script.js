document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelectorAll("[data-current-year]");
  year.forEach(el => el.textContent = new Date().getFullYear());

  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const closeButton = document.querySelector("[data-mobile-close]");

  function setMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle("open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    menuButton?.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  }

  menuButton?.addEventListener("click", () => setMenu(true));
  closeButton?.addEventListener("click", () => setMenu(false));
  mobileMenu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));

  const filterButtons = document.querySelectorAll("[data-filter]");
  const recipeCards = document.querySelectorAll("[data-category]");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      recipeCards.forEach(card => {
        const categories = (card.dataset.category || "").split(" ");
        card.style.display = filter === "all" || categories.includes(filter) ? "grid" : "none";
      });
    });
  });

  const toast = document.querySelector("[data-toast]");
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 1800);
  }

  const shareButton = document.querySelector("[data-share]");
  shareButton?.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: document.querySelector('meta[name="description"]')?.content || document.title,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copied");
      } else {
        showToast("Copy the page URL to share");
      }
    } catch (error) {
      if (error.name !== "AbortError") showToast("Unable to share");
    }
  });

  const pinButton = document.querySelector("[data-pin]");
  pinButton?.addEventListener("click", () => {
    const pageUrl = encodeURIComponent(window.location.href);
    const description = encodeURIComponent(document.title);
    const heroImage = document.querySelector(".recipe-hero-image");
    const media = heroImage ? `&media=${encodeURIComponent(heroImage.src)}` : "";
    const url = `https://www.pinterest.com/pin/create/button/?url=${pageUrl}${media}&description=${description}`;
    window.open(url, "_blank", "noopener,noreferrer,width=760,height=650");
  });
});