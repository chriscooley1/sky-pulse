document.addEventListener("DOMContentLoaded", function() {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
            const indexOnlyElements = document.getElementById("index-only-elements");
            if (window.location.pathname.endsWith("index.html") && indexOnlyElements) {
                indexOnlyElements.style.display = "block";
            }
        });
});