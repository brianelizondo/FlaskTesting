$(document).ready(function() {
    async function submit_guess(bodyFormData){
        // Send the form data with axios post request to check the guess word
        const resp = await axios({
            method: "post",
            url: "/submit_guess",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        // Return the response data
        return resp.data;
    }
    
    $("#submit_guess_button").on("click", async function(e){
        e.preventDefault();
        // Get the form value to send to the server
        const user_word = $("#submit_guess").val();
        let bodyFormData = new FormData();
        bodyFormData.append('user_word', user_word);
        // Get the responsefrom the server
        const response = await submit_guess(bodyFormData);
        // Show the check result to the user
        let $result_msg = $("p#word_result");
        $result_msg.text("The word is " + response.result.toUpperCase().replace('-', ' '));

        // Get the current score and update to the new score
        let $score_element = $("p#score_content span");
        let current_score = parseInt($score_element.text());
        let new_score = 0;
        if(response.result == "ok"){
            new_score = current_score + user_word.length;
            $score_element.text(new_score);
        }
    });
});