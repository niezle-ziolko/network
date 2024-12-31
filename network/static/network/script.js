document.addEventListener('DOMContentLoaded', function() {
   document.querySelectorAll('button').forEach(button => {
       button.onclick = function(event) {
           const element = event.currentTarget; // Zmiana z event.target na event.currentTarget

           // Detects if EDIT button clicked
           if (element.classList.contains("button-edit")) {
               console.log(`Edit button clicked. Post number: ${this.parentElement.parentElement.dataset.id}`);

               const id = this.parentElement.parentElement.dataset.id;
               const originalText = this.parentElement.querySelector("#tweetText").innerText;

               // If edit button reads 'edit', create text area and change button text to 'save'
               if (this.innerText === "Edit") {
                   this.parentElement.querySelector("#tweetText").innerHTML = '<textarea id="edit_text"></textarea>';
                   this.parentElement.querySelector("#edit_text").placeholder = originalText;
                   this.innerText = "Save";

               // If edit button reads 'save', update post
               } else if (this.innerText === "Save") {
                   fetch(`/edit/${id}`, {
                       method: 'POST',
                       body: JSON.stringify({
                           tweet: this.parentElement.querySelector("#edit_text").value
                       })
                   })
                   .then(response => response.json())
                   .then(result => {
                       console.log(`Edited text: ${result.new_text}`);
                       this.parentElement.querySelector("#tweetText").innerHTML = result.new_text;
                       this.innerText = "Edit";
                   });
               }

           // Detects if LIKE button clicked
           } else if (element.classList.contains("button-secondary") || element.classList.contains("button-like")) {
               console.log(`Like button clicked. Post number: ${this.parentElement.parentElement.dataset.id}`);

               const id = this.parentElement.parentElement.dataset.id;

               // Update database then HTML
               fetch(`/like/${id}`, {
                   method: 'POST'
               })
               .then(response => {
                   // Call the like function to update the UI
                   like(element); // Użyj elementu, który jest przyciskiem
               });

           // Detects if DELETE button clicked
           } else if (element.classList.contains("button-delete")) {
               console.log(`Delete button clicked. Post number: ${this.parentElement.parentElement.dataset.id}`);

               const id = this.parentElement.parentElement.dataset.id;

               // Potwierdzenie usunięcia
               if (confirm("Are you sure you want to delete this post?")) {
                   fetch(`/delete_post/${id}/`, {
                       method: 'DELETE',
                       headers: {
                           'X-CSRFToken': getCookie('csrftoken'),  // Upewnij się, że masz funkcję do pobierania tokena CSRF
                       },
                   })
                   .then(response => {
                       if (response.ok) {
                           // Usunięcie elementu z DOM
                           this.parentElement.parentElement.remove();
                           console.log(`Post ${id} successfully deleted.`);
                       } else {
                           return response.json().then(data => {
                               alert(data.error);  // Wyświetl błąd
                           });
                       }
                   })
                   .catch(error => {
                       console.error('Error:', error);
                   });
               }
           } else if (element.classList.contains("button-follow") || element.classList.contains("button-unfollow")) {
               const button = document.querySelector('button');
               let post = document.querySelector('h2').dataset.id;
               console.log(`User number ${post}`);

               if (button.innerHTML == "Follow") {
                   console.log("Follow button clicked");

                   fetch(`/follow/${post}`)
                   .then(response => response.json())
                   .then(data => {
                       console.log(data);
                       button.innerHTML = "Unfollow";
                       button.className = "button-unfollow";
                   });

               } else if (button.innerHTML == "Unfollow") {
                   console.log("Unfollow button clicked");

                   fetch(`/follow/${post}`)
                   .then(response => response.json())
                   .then(data => {
                       console.log(data);
                       button.innerHTML = "Follow";
                       button.className = "button-follow";
                   });
               }
           }
       };
   });
});
 
 // Like / unlike post
 function like(tweet) {
    var likesElement = tweet.querySelector("#number");
    var likes = parseInt(likesElement.innerHTML);
 
    if (tweet.classList.contains("button-secondary")) {
       tweet.className = "button-like"; // Zmień klasę na "lajk"
       likes++;
       tweet.querySelector("i").className = "fa-solid fa-heart"; // Zmień ikonę na "lajk"
    } else {
       tweet.className = "button-secondary"; // Zmień klasę na "odlajk"
       likes--;
       tweet.querySelector("i").className = "fa-regular fa-heart"; // Zmień ikonę na "odlajk"
    }
 
    likesElement.innerHTML = likes; // Zaktualizuj liczbę polubień
 }

 document.addEventListener("DOMContentLoaded", () => {
    const postButton = document.querySelector(".nav-button");
    const modal = document.getElementById("postModal");
    const closeModalIcon = document.querySelector(".fa-solid.fa-xmark");

    // Show the modal on button click
    postButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior
        modal.style.display = "flex";
    });

    // Close the modal on close icon click
    closeModalIcon.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside the content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});