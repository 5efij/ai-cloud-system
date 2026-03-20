let model;

// تحميل AI
mobilenet.load().then((loadedModel) => {
  model = loadedModel;
});

const upload = document.getElementById("upload");
const image = document.getElementById("image");
const result = document.getElementById("result");
const historyDiv = document.getElementById("history");

// تحميل الهستوري القديم
historyDiv.innerHTML = localStorage.getItem("history") || "";

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const localURL = URL.createObjectURL(file);
  image.src = localURL;

  result.innerText = "⏳ AI is analyzing...";

  // اهتزاز
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

      // تأثير
      image.style.transform = "scale(1.1)";
      setTimeout(() => {
        image.style.transform = "scale(1)";
      }, 300);

      // إضافة للهستوري
      const item = document.createElement("div");
      item.innerHTML = `
        <img src="${image.src}" width="100">
        <p>${predictions[0].className}</p>
      `;

      historyDiv.appendChild(item);

      // حفظ بالذاكرة
      localStorage.setItem("history", historyDiv.innerHTML);

    });
  }, 1500);
});

// حذف الهستوري
function clearHistory() {
  historyDiv.innerHTML = "";
  localStorage.removeItem("history");
}
