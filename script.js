document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("fileInput");
    const previewSection = document.getElementById("previewSection");
    const manipulateImageBtn = document.getElementById("manipulateImageBtn");
    const uploadBtn = document.getElementById("uploadBtn");
  
    let selectedFile = null;
  
    // File input change listener
    fileInput.addEventListener("change", function(event) {
      const file = event.target.files[0];
      selectedFile = file;
  
      // Clear previous preview
      previewSection.innerHTML = "";
  
      if (file) {
        // Detect the file type and render accordingly
        const fileType = file.type;
  
        if (fileType.startsWith("image/")) {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(file);
          previewSection.appendChild(img);
          manipulateImageBtn.style.display = "inline-block";
          uploadBtn.style.display = "inline-block";
        } else if (fileType.startsWith("audio/")) {
          const audio = document.createElement("audio");
          audio.controls = true;
          audio.src = URL.createObjectURL(file);
          previewSection.appendChild(audio);
          uploadBtn.style.display = "inline-block";
        } else if (fileType.startsWith("video/")) {
          const video = document.createElement("video");
          video.controls = true;
          video.width = 300;
          video.src = URL.createObjectURL(file);
          previewSection.appendChild(video);
          uploadBtn.style.display = "inline-block";
        } else if (fileType === "application/pdf") {
          const iframe = document.createElement("iframe");
          iframe.src = URL.createObjectURL(file);
          iframe.width = 300;
          iframe.height = 400;
          previewSection.appendChild(iframe);
          uploadBtn.style.display = "inline-block";
        } else {
          previewSection.innerHTML = "<p>Unsupported file type</p>";
          manipulateImageBtn.style.display = "none";
          uploadBtn.style.display = "none";
        }
      }
    });
  
    // Image Manipulation Logic (Using Cloudinary API for example)
    manipulateImageBtn.addEventListener("click", function() {
      if (!selectedFile || !selectedFile.type.startsWith("image/")) {
        alert("No image selected for manipulation.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "YOUR_CLOUDINARY_PRESET"); // Add your Cloudinary preset here
  
      // Upload the image to Cloudinary and manipulate it
      fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          const transformedImageUrl = `${data.secure_url.replace(
            "/upload/",
            "/upload/w_500,h_500,c_fill/"
          )}`; // Example: resizing the image to 500x500
  
          // Show the transformed image
          previewSection.innerHTML = `<img src="${transformedImageUrl}" alt="Manipulated Image">`;
        })
        .catch(error => {
          console.error("Error during image manipulation:", error);
        });
    });
  
    // Upload Button Logic
    uploadBtn.addEventListener("click", function() {
      if (!selectedFile) {
        alert("No file selected for upload.");
        return;
      }
  
      alert("File uploaded successfully!");
      // You can add further backend handling for file uploads here.
    });
  
    // User Authentication Logic (Optional)
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", function() {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (username === "admin" && password === "admin123") {
        alert("Login successful!");
      } else {
        alert("Invalid username or password.");
      }
    });
  });
  