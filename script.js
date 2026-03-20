let model;

// تحميل AI
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

  result.innerText = "⏳ AI is analyzing...";

  // اهتزاز (بالموبايل)
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }

  setTimeout(() => {
    model.classify(image).then((predictions) => {

      result.innerText =
        "🔍 Result:\n\n" +
        "1️⃣ " + predictions[0].className +
        "\n2️⃣ " + predictions[1].className +
        "\n3️⃣ " + predictions[2].className +
        "\n\n🎯 Accuracy: " +
        (predictions[0].probability * 100).toFixed(2) + "%";

      // 🔥 تأثير وميض للصورة
      image.style.border = "5px solid #00ffcc";
      setTimeout(() => {
        image.style.border = "none";
      }, 500);

    });
  }, 1500);
});
