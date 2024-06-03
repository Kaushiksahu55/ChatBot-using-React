export default async function sendRequest(proptText) {
    console.log("Triggered");

    const apiUrl =
        "https://api.openai.com/v1/engines/text-davinci-002/completions"; 
        //  "https://api.openai.com/v1/chat/completions"// Update with the correct API endpoint
      const apiKey = ""; // Replace with your actual OpenAI API key

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      };

      const data = {
        prompt: proptText,
        max_tokens: 150, // Adjust as needed
        temperature: 0.7 // Adjust as needed
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log(responseData);

      return  responseData.choices[0].text
      // console.log(resData)
      // //Update the state with the  from the API
      // setResult([
      //   ...result ,
      //   {text: input , isBot: false},
      //   {text: resData , isBot: true}
      // ])

      // console.log(responseData.text);

      // setInput("");
}

