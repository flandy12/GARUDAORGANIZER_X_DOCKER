const ALLOWED_TAGS = new Set([
  "a", "b", "blockquote", "br", "em", "h1", "h2", "h3", "h4", "h5", "h6",
  "i", "img", "li", "ol", "p", "span", "strong", "u", "ul",
]);

const ALLOWED_ATTRIBUTES = new Set([
  "alt", "class", "height", "href", "loading", "rel", "src", "target", "title", "width",
]);

const isSafeUrl = value => {
  const normalized = value.trim().toLowerCase();
  return (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("mailto:") ||
    normalized.startsWith("tel:") ||
    normalized.startsWith("/") ||
    normalized.startsWith("#")
  );
};

function sanitizeHtml(data) {
  if (typeof data !== "string" || data.length === 0) return "";
  if (typeof document === "undefined") {
    return data.replace(/<[^>]*>/g, "");
  }

  const template = document.createElement("template");
  template.innerHTML = data;

  template.content.querySelectorAll("script, style, iframe, object, embed, form, meta, link").forEach(node => node.remove());

  template.content.querySelectorAll("*").forEach(node => {
    const tagName = node.tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tagName)) {
      node.replaceWith(...node.childNodes);
      return;
    }

    Array.from(node.attributes).forEach(attribute => {
      const name = attribute.name.toLowerCase();
      if (!ALLOWED_ATTRIBUTES.has(name)) {
        node.removeAttribute(attribute.name);
        return;
      }

      if ((name === "href" || name === "src") && !isSafeUrl(attribute.value)) {
        node.removeAttribute(attribute.name);
      }
    });

    if (tagName === "a" && node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer");
    }
  });

  return template.innerHTML;
}

function createMarkup(data) {
  return { __html: sanitizeHtml(data) };
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
}

export { createMarkup, sanitizeHtml, scrollToTop };
