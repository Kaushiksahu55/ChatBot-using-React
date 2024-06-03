import React, { useState, useRef, useEffect } from "react";
import Modal from 'react-modal';
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, docco, monokai, monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import classes from "./HomePage.module.css";
import sendRequest from "../../Response";
import FooterSection from "../../Components/FooterSection";
import SideBarSection from "../../Components/SideBarSection";
import ResponseMessage from "../../Components/ResponseMessage";
import ApiKeyModal from "../../Components/ApiKeyModal";

Modal.setAppElement('#root');


function HomePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([
    {
      text: "Hello How Can I Help",
      isBot: true,
    },
  ]);
  const [apiKey, setApiKey] = useState("");  // State to store API key
  const [isModalOpen, setIsModalOpen] = useState(true);  // State to control modal visibility
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.scrollIntoView();
  }, [result]);

  const handleReload = () => {
    window.location.reload();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGetResponse();
    }
  };

  const handlerQueryResponseOne = async (promptText) => {
    setResult([...result, { text: promptText, isBot: false }]);

    const queryResponseData = await sendRequest(promptText);
    console.log(queryResponseData);

    setResult((prev) => [...prev, { text: queryResponseData, isBot: true }]);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleGetResponse = async () => {
    if (!apiKey) {
      setIsModalOpen(true);
      return;
    }

    try {
      setResult([...result, { text: input, isBot: false }]);

      setInput("");

      const {
        GoogleGenerativeAI,
        HarmCategory,
        HarmBlockThreshold,
      } = require("@google/generative-ai");

      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      async function run() {
        const chatSession = model.startChat({
          generationConfig,
          safetySettings,
          history: [],
        });

        const result = await chatSession.sendMessage(input);
        console.log(result.response.text());

        const responseData = result.response.text();

        setResult((prevResult) => [
          ...prevResult,
          { text: responseData, isBot: true },
        ]);
      }

      run();

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderMessage = (message) => {
    const codeBlockRegex = /```([\s\S]*?)```/;
    const match = codeBlockRegex.exec(message);
    if (match) {
      return (
        <SyntaxHighlighter language="javascript" style={monokaiSublime}>
          {match[1]}
        </SyntaxHighlighter>
      );
    }
    return message;
  };

  const handleSaveApiKey = (key) => {
    setApiKey(key);
  };

  return (
    <div className={classes.App}>
      <SideBarSection
        onClick={handleReload}
        ResponseOne={handlerQueryResponseOne}
      />

      <div className={classes.main}>
        <div className={classes.chats}>
          {result.map((message, index) => (
            <ResponseMessage
              key={index}
              message={renderMessage(message.text)}
              index={index}
              isBot={message.isBot}
            />
          ))}

          <div ref={messageRef} />
        </div>

        <FooterSection
          onClick={handleGetResponse}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </div>

      <ApiKeyModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSaveApiKey}
      />
    </div>
  );
}

export default HomePage;