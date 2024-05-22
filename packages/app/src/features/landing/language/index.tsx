import { Dispatch, SetStateAction } from "react";
import "./choice.css";

export default function SelectLanguage({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      name="languages"
      id="languages"
    >
      <option value="french">French</option>
      <option value="english">English</option>
      <option value="russian">Russian</option>
      <option value="german">German</option>
    </select>
  );
}
