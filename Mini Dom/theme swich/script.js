const btn = document.getElementById("themeBtn");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  
  if (document.body.classList.contains("dark-mode")) {
    btn.textContent = "Switch to Light Theme";
  } else {
    btn.textContent = "Switch to Dark Theme";
  }
});
