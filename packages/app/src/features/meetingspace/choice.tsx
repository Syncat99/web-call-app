import "./choice.css";

function LanguageChoice() {
  return (
    <div className="languageMenu">
      <select name="languages" id="languages">
        <option value="french">French</option>
        <option value="english">English</option>
        <option value="russian">Russian</option>
        <option value="german">German</option>
      </select>
    </div>
  );
}

export default LanguageChoice;
