/********
 * I18N *
 ********/

function translatePage() {
    document
        .querySelectorAll("[i18n]")
        .forEach(translateElement);
}

function translateElement(element) {
    const key = element.getAttribute("i18n");
    if (element.tagName == "OPTGROUP") {
        element.setAttribute("label", i18next.t(key));
    } else {
        element.innerText = i18next.t(key);
    }
}

function bindLocaleSwitcher(initialValue) {
    const switcher =
        document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        // Set the locale to the selected option[value]
        i18next.changeLanguage(e.target.value);
    };
}

i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
        supportedLngs: ["en", "de", "es"],
        fallbackLng: "en",
        debug: true,
        nonExplicitSupportedLngs: true,
        backend: {
            loadPath: 'i18n/{{lng}}.json'
        }
    }, function(err, t) {translatePage(); 
        bindLocaleSwitcher(i18next.language);});

i18next.on('languageChanged', () => {translatePage();});

/************
 * END I18N *
 ************/