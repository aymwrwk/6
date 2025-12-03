let index = 0;
const images = document.querySelectorAll(".carousel img");

function showImage(i) {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
}

document.getElementById("prev").onclick = () => {
    index = (index === 0) ? images.length - 1 : index - 1;
    showImage(index);
};

document.getElementById("next").onclick = () => {
    index = (index === images.length - 1) ? 0 : index + 1;
    showImage(index);
};
