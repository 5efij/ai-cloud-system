const upload = document.getElementById("upload");
const image = document.getElementById("image");

upload.addEventListener("change", () => {
  const file = upload.files[0];

  const storage = firebase.storage();
  const storageRef = storage.ref("images/" + Date.now());

  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {

      // افتحي الصورة برابط جديد
      window.open(url, "_blank");

      // عرضها بالموقع
      image.src = url;

    });
  });
});
