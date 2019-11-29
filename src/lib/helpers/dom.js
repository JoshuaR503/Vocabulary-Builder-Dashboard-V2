const swapStyleSheet = (sheet) => {
    // Change Style in the DOM.
    document
    .getElementById("style")
    .setAttribute("href", `assets/css/${sheet}`);

    // Save to Local Storage.
    localStorage.setItem('theme_sheet', sheet);
}

export default swapStyleSheet;