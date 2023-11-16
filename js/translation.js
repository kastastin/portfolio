let translations,
  currentLanguage = "en";

loadTranslations().then((data) => (translations = data));

async function loadTranslations() {
  try {
    const response = await fetch("translation.json");

    if (!response.ok) {
      throw new Error(
        `Failed to load translations: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error loading translations:", error.message);
    return {};
  }
}

function changeLanguage() {
  currentLanguage = document.querySelector(".lng__select").value;
  translatePage();
}

function translatePage() {
  const elemsToTranslate = document.querySelectorAll("[data-lng]");

  elemsToTranslate.forEach((elem) => {
    const key = elem.getAttribute("data-lng"),
      translation = getTranslation(key);

    elem.innerHTML = translation;
  });
}

function getTranslation(key) {
  return translations[key][currentLanguage] || key;
}
