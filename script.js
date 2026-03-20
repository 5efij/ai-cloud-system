let model;

// تحميل موديل AI
mobilenet.load().then((loadedModel) => {
  model = loadedModel;
  console.log("AI Model Loaded ✅");
});

const upload = document.getElementById("upload");
const image = document.getElementById("image");
const result = document.getElementById("result");

// دالة الصوت
function playSound() {
  const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
  audio.volume = 1;

  audio.play().catch(() => {
    console.log("Sound blocked");
  });
}

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 🔥 صوت يشتغل مباشرة (حتى ما ينحظر)
  playSound();

  // عرض الصورة
  const localURL = URL.createObjectURL(file);
  image.src = localURL;

  // رسالة انتظار
  result.innerText = "⏳ AI is analyzing...";

  // تحليل الصورة
  setTimeout(() => {
    model.classify(image).then((predictions) => {

      result.innerText =
        "🔍 Result:\n\n" +
        "1️⃣ " + predictions[0].className +
        "\n2️⃣ " + predictions[1].className +
        "\n3️⃣ " + predictions[2].className +
        "\n\n🎯 Accuracy: " +
        (predictions[0].probability * 100).toFixed(2) + "%";

    });
  }, 1500);
});
