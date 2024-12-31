document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('button').forEach(button => {
        button.onclick = function (event) {
            const element = event.currentTarget;

    if (event.target.closest(".button-edit")) {
        console.log(`Edit button clicked. Post number: ${button.parentElement.parentElement.dataset.id}`);

        const id = button.parentElement.parentElement.dataset.id;
        const tweetTextElement = button.parentElement.querySelector("#tweetText");
        const editTextArea = button.parentElement.querySelector("#edit_text");

        if (button.innerText.trim() === "Edit") {
            const originalText = tweetTextElement.innerText;

            tweetTextElement.innerHTML = `<textarea id="edit_text">${originalText}</textarea>`;
            button.innerHTML = 'Save';

        } else if (button.innerText.trim() === "Save") {
            const newTweet = editTextArea.value;

            fetch(`/edit/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tweet: newTweet })
            })
            .then(response => response.json())
            .then(result => {
                console.log(`Edited text: ${result.new_text}`);
                tweetTextElement.innerHTML = result.new_text;
                button.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>&nbsp;Edit';
            })
            .catch(error => console.error("Error editing post:", error));
        }
    } else if (event.target.closest(".button-delete")) {
        console.log(`Delete button clicked. Post number: ${button.parentElement.parentElement.dataset.id}`);

        const id = button.parentElement.parentElement.dataset.id;

        if (confirm("Are you sure you want to delete this post?")) {
            fetch(`/delete/${id}/`, {
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log(`Post ${id} deleted successfully.`);
                    const postElement = button.closest('.post');
                    if (postElement) {
                        postElement.remove();
                    }
                } else {
                    console.error("Failed to delete post.");
                }
            })
            .catch(error => console.error("Error deleting post:", error));
        }
    } else if (element.classList.contains("button-secondary") || element.classList.contains("button-like")) {
                console.log(`Like button clicked. Post number: ${this.parentElement.parentElement.dataset.id}`);

                const id = this.parentElement.parentElement.dataset.id;

                fetch(`/like/${id}`, {
                    method: 'POST'
                })
                    .then(response => {
                        like(element);
                    });

            } else if (element.classList.contains("button-follow") || element.classList.contains("button-following") || element.classList.contains("button-unfollow")) {
                const button = element;
                const userId = document.querySelector('h2').dataset.id;
                console.log(`User number ${userId}`);

                if (button.classList.contains("button-follow")) {
                    console.log("Follow button clicked");

                    fetch(`/follow/${userId}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            button.innerHTML = "Following";
                            button.className = "button-following";
                        });

                } else if (button.classList.contains("button-unfollow")) {
                    console.log("Unfollow button clicked");

                    fetch(`/follow/${userId}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            button.innerHTML = "Follow";
                            button.className = "button-follow";
                        });
                }
            }
        };

        button.onmouseover = function (event) {
            const element = event.currentTarget;

            if (element.classList.contains("button-following")) {
                element.innerHTML = "Unfollow";
                element.className = "button-unfollow";
            }
        };

        button.onmouseout = function (event) {
            const element = event.currentTarget;

            if (element.classList.contains("button-unfollow")) {
                element.innerHTML = "Following";
                element.className = "button-following";
            }
        };
    });

    const followButton = document.querySelector('button.button-unfollow');

    if (followButton) {
        followButton.innerHTML = "Following";
        followButton.className = "button-following";
    };
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

 function like(tweet) {
    var likesElement = tweet.querySelector("#number");
    var likes = parseInt(likesElement.innerHTML);
 
    if (tweet.classList.contains("button-secondary")) {
       tweet.className = "button-like";
       likes++;
       tweet.querySelector("i").className = "fa-solid fa-heart";
    } else {
       tweet.className = "button-secondary";
       likes--;
       tweet.querySelector("i").className = "fa-regular fa-heart";
    }
 
    likesElement.innerHTML = likes;
 }

 document.addEventListener("DOMContentLoaded", () => {
    const postButton = document.querySelector(".nav-button");
    const modal = document.getElementById("postModal");
    const closeModalIcon = document.querySelector(".fa-solid.fa-xmark");

    if (postButton) {
        postButton.addEventListener("click", (event) => {
            event.preventDefault();
            modal.style.display = "flex";
        });
    }

    if (closeModalIcon) {
        closeModalIcon.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Funkcja sprawdzająca aktualną ścieżkę URL
    const path = window.location.pathname;

    // Tablica stron, na których chcemy ukryć header i footer
    const hiddenPaths = ['/register', '/login'];

    // Sprawdzenie, czy aktualna ścieżka znajduje się na liście
    if (hiddenPaths.includes(path)) {
        // Znalezienie elementów header i footer
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        // Ukrycie elementów (jeśli istnieją)
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';

        const body = document.querySelector('.body');
        if (body) body.style.minWidth = '100%';
    }
});