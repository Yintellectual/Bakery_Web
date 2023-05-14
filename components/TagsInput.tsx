import { Attribute, ImageProps, Schema } from "../utils/types";
import { WithContext as ReactTags } from "react-tag-input";
import React from "react";
export default function TagsInput() {
  const [tags, setTags] = React.useState([
    { id: "Thailand", text: "Thailand" },
    { id: "India", text: "India" },
    { id: "Vietnam", text: "Vietnam" },
    { id: "Turkey", text: "Turkey" },
  ]);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };
  return (
    <ReactTags
      classNames={{
        tags: "bg-red",
        tagInput: "tagInputClass",
        tagInputField:
          "w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none",
        selected: "selectedClass",
        tag: "mx-1 rounded bg-gray-300 px-1 text-sm font-semibold text-black transition",
        remove: "removeClass",
        suggestions: "suggestionsClass",
        activeSuggestion: "activeSuggestionClass",
        editTagInput: "editTagInputClass",
        editTagInputField: "editTagInputField",
        clearAll: "clearAllClass",
      }}
      tags={tags}
      name="tags"
      placeHolder="tags"
      suggestions={tags}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      inputFieldPosition="bottom"
      allowDeleteFromEmptyInput={false}
      autocomplete
    />
  );
}
