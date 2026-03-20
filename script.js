let model;

mobilenet.load().then((loadedModel) => {
  model = loadedModel;
});

const upload = document.getElementById("upload");
const image = document.getElementById("image");
const result = document.getElementById("result");

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const localURL = URL.createObjectURL(file);
  image.src = localURL;

  result.innerText = "⏳ Analyzing...";

  setTimeout(() => {
    model.classify(image).then((predictions) => {

      let text =
        "1: " + predictions[0].className +
        "\n2: " + predictions[1].className +
        "\nAccuracy: " +
        (predictions[0].probability * 100).toFixed(2) + "%";

      result.innerText = text;

      // تخزين
      let old = localStorage.getItem("history") || "";
      localStorage.setItem("history", old + text + "<br>");

    });
  }, 1000);
});
