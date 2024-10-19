const seeMoreButtons = document.querySelectorAll(".see-more-button");
const modal = document.getElementById("message-modal");
const modalMessage = document.getElementById("modal-message");
const modalTitle = document.getElementById("modal-title");
const closeModal = document.querySelector(".close");

seeMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const message = button.getAttribute("data-message");
    const messageId = button.getAttribute("data-id");

    // Set modal content
    modalMessage.textContent = message;
    modalTitle.textContent = "Message #" + messageId;

    modal.style.display = "block";
  });
});

// Close modal when 'x' is clicked
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
