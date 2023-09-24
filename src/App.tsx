import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

interface Emoji {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
}

function App() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch emoji details from the API
    fetch("https://emojihub.yurace.pro/api/all")
      .then((response) => response.json())
      .then((data) => {
        setEmojis(data);
        setIsLoading(false);
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

  // Get the emojis for the current page
  const getPaginatedEmojis = (): Emoji[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredEmojis.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="App">
      <h1>Emoji Browser</h1>
      <div className="filter-pagination-container">
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
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredEmojis.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
      {isLoading ? <Loader /> : null}
      <div className="emojis">
        {getPaginatedEmojis().map((emoji, index) => (
          <div key={index} className="emoji-card">
            <div className="emoji">{getEmojiFromHtmlCode(emoji.htmlCode)}</div>
            <div className="name" data-testid={`name-${index}`}>
              {emoji.name}
            </div>
            <div className="category" data-testid={`category-${index}`}>
              Category : {emoji.category}
            </div>
            <div className="group" data-testid={`group-${index}`}>
              Group : {emoji.group}
            </div>
            <div className="htmlCode">HTML Code : {emoji.htmlCode}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
