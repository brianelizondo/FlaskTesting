$(document).ready(function() {
    async function submit_guess(bodyFormData){
        const resp = await axios({
            method: "post",
            url: "/submit_guess",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        return resp.data;
    }
    
    $("#submit_guess_button").on("click", async function(e){
        e.preventDefault();
        const user_word = $("#submit_guess").val();
        let bodyFormData = new FormData();
        bodyFormData.append('user_word', user_word);

        const response = await submit_guess(bodyFormData);

        let $result_msg = $("p#word_result");
        $result_msg.text("The word is " + response.result.toUpperCase().replace('-', ' '));
    });
});