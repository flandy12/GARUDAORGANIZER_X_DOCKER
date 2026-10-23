function createMarkup(data) {
    return {__html: data};
} const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
}

export  {createMarkup, scrollToTop};