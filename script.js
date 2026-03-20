const upload = document.getElementById("upload");
const image = document.getElementById("image");
const result = document.getElementById("result");

upload.addEventListener("change", () => {
  const file = upload.files[0];
  image.src = URL.createObjectURL(file);

  result.innerText = "Analyzing...";

  setTimeout(() => {
    result.innerText = "Image uploaded successfully 😎";
  }, 2000);
});
