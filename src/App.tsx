import { useEffect, useState } from "react";
import "./App.css";
import { CATEGORIES } from "./constants";

interface Emoji {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
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

  const filteredEmojis = emojis.filter(
    (emoji) => !selectedCategory || emoji.category === selectedCategory
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="App">
      <h1>Emoji Hub</h1>
      <div className="filter">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {Array.from(new Set(emojis.map((emoji) => emoji.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>
      <div className="emojis">
        {filteredEmojis.map((emoji, index) => (
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
