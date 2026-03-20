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

  // اهتزاز (إذا موبايل)
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
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

      // 🔥 تأثير احترافي
      image.style.transform = "scale(1.1)";
      image.style.transition = "0.3s";

      setTimeout(() => {
        image.style.transform = "scale(1)";
      }, 300);

      // 🔥 تغيير لون النتيجة
      result.style.color = "#00ffcc";

    });
  }, 1500);
});
