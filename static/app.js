$(document).ready(function() {
    // Get score element and current score game
    let $score_element = $("p#score_content span");
    function get_current_score(){
        return parseInt($score_element.text());
    }
    
    // Save of how many times the user has played and the highest score so far
    async function submit_statistics(){
        let current_score = get_current_score();
        const resp = await axios.get("/statistics", {params: {score: current_score }});
        if(resp.data == true){
            let $high_score_element = $("p#high_score_content span");
            $high_score_element.text(current_score);
        }
    } 
    
    // Start timer to end the game at 60 seconds
    let game_started = false;
    function start_timer(){
        if(!game_started){
            game_started = true;
            setTimeout(async function(){
                // Disable form elements and submit statistics to the server
                $("#submit_guess").prop('disabled', true);
                $("#submit_guess_button").prop('disabled', true);
                await submit_statistics();
            }, 60000);
        }
    }
    
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
        let current_score = get_current_score();
        let new_score = 0;
        if(response.result == "ok"){
            new_score = current_score + user_word.length;
            $score_element.text(new_score);
        }

        // Start the game timer
        start_timer();
    });
});