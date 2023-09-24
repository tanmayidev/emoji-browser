import { useEffect, useState } from "react";
import "./App.css";

interface Emoji {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
}

function App() {
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>([]);
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    // Fetch emoji details from the API
    fetch("https://emojihub.yurace.pro/api/all")
      .then((response) => response.json())
      .then((data) => {
        setEmojis(data);
      })
      .catch((error) => {
        console.error("Error fetching emojis:", error);
        alert("Error fetching emojis");
      });
  }, []);

  const getEmojiFromHtmlCode = (htmlCodeArray: string[]): string => {
    let code: string = "";

    for (const htmlCode of htmlCodeArray) {
      code += String.fromCodePoint(parseInt(htmlCode.substring(2)));
    }

    return code;
  };

  return (
    <div className="App">
      <h1>Emoji Hub</h1>
      <div className="emojis">
        {emojis.map((emoji, index) => (
          <div key={index} className="emoji-card">
            <div className="emoji">{getEmojiFromHtmlCode(emoji.htmlCode)}</div>
            <div className="name">{emoji.name}</div>
            <div className="category">{emoji.category}</div>
            <div className="group">Group : {emoji.group}</div>
            <div className="htmlCode">HTML Code : {emoji.htmlCode}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
