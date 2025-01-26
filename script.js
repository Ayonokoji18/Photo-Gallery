const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function fetchImage() {
  const inputValue = document.getElementById("input").value;

  if (inputValue > 100 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number Should be between 0 and 101";
    return;
  }

  imgs = "";

  try {
    btnEl.style.display = "none";
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=2RaXJ015ii2NJyN0-XNw5ONhEUs8c9oW4vvobniz-1E`
    ).then((res) =>
      res.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            imgs += `
           <img src = ${pic.urls.small} alt = "image"/>`;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = imgs;
            btnEl.style.display = "block";
          });
        }
      })
    );

    errorMessageEl.style.display = "none";
  } catch (error) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "An error Happened,Try again Later";
  }
}

btnEl.addEventListener("click", fetchImage);
