document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button').forEach(button => {
       button.onclick = function() {

          // Detects if EDIT button clicked
          if (event.target.className === "btn btn-primary float-end edit") {
             console.log(`Edit button clicked. Post number: ${this.parentElement.parentElement.dataset.id}`)

             const element = event.target
             const id = element.parentElement.parentElement.dataset.id
             const originalText = element.parentElement.querySelector("#tweetText").innerText
             
             // If edit button reads 'edit', create text area and change button text to 'save'
             if (element.parentElement.querySelector("#edit").innerText === "Edit") {
                element.parentElement.querySelector("#tweetText").innerHTML = '<textarea style="width: 32rem" id="edit_text"></textarea>'
                element.parentElement.querySelector("#edit_text").placeholder = originalText

                element.parentElement.querySelector("#edit").innerHTML = "Save"

             // If edit button reads 'save', update post
             } else if (element.parentElement.querySelector("#edit").innerText === "Save") {

                fetch(`/edit/${id}`, {
                   method: 'POST',
                   body: JSON.stringify({
                      tweet: element.parentElement.querySelector("#edit_text").value
                   })
                })

                .then(response => response.json())
                .then(result => {
                   console.log(`Edited text: ${result.new_text}`)

                   // Update displayed text and revert edit button text to 'edit'
                   element.parentElement.querySelector("#tweetText").innerHTML = result.new_text
                   element.parentElement.querySelector("#edit").innerHTML = "Edit"
                });   
             }

          // Detects if LIKE button clicked
          } else if (this.className === "btn btn-secondary float-left" || this.className === "btn btn-danger float-left") {
             console.log(`Like button clicked. Post number: ${this.parentElement.parentElement.dataset.id}`)

             const element = event.target
             const id = element.parentElement.parentElement.dataset.id

             // Update database then HTML
             fetch(`/like/${id}`), {
                method: 'POST'}
                like(element);
             }
          }
       });
 });

 // Like / unlike post
 function like(tweet) {

    // Get current number of likes
    var likes = tweet.querySelector("#number").innerHTML

    // Increment / deincrement number of likes and change colour of button
    if (tweet.classList.contains("btn-secondary")) {

       tweet.className = "btn btn-danger float-left";
       likes++
       tweet.querySelector("#number").innerHTML = likes

    } else {

       tweet.className = "btn btn-secondary float-left";
       likes--
       tweet.querySelector("#number").innerHTML = likes
    }
 }