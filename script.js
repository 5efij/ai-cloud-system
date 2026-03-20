const upload = document.getElementById("upload");
const image = document.getElementById("image");

upload.addEventListener("change", () => {
  const file = upload.files[0];

  const storage = firebase.storage();
  const storageRef = storage.ref("images/" + file.name);

  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {
      
      console.log(url); // مهم حتى نشوف الرابط
      
      image.src = url; // هذا اللي يعرض الصورة
      
    });
  });
});
