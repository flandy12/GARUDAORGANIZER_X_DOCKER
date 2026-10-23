function createMarkup(data = "") {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(String(data), "text/html");
    const blockedElements = parsed.body.querySelectorAll("script, style, iframe, object, embed, form, input, button");

    blockedElements.forEach(element => element.remove());
    parsed.body.querySelectorAll("*").forEach(element => {
      [...element.attributes].forEach(attribute => {
        const name = attribute.name.toLowerCase();
        const value = attribute.value.trim().toLowerCase();

        if (name.startsWith("on") || name === "srcdoc" || ((name === "href" || name === "src") && value.startsWith("javascript:"))) {
          element.removeAttribute(attribute.name);
        }
      });
    });

    return {__html: parsed.body.innerHTML};
} const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
}

export  {createMarkup, scrollToTop};
