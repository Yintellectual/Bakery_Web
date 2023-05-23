import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { Tag } from "../../utils/types";
export default function TagsInput({
  label,
  name,
  placeholder,
  tags,
  suggestions,
  setTags,
}: {
  label: string;
  name: string;
  placeholder?: string;
  setTags: Function;
  tags: Tag[];
  suggestions?: Tag[];
}) {
  if (!suggestions) {
    suggestions = [];
  }
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
    <div key="tags" className="col-span-4">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <ReactTags
        classNames={{
          tags: "",
          tagInput: "",
          tagInputField:
            "block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          selected: "mb-4 selectedClass",
          tag: "mr-2 my-2 rounded bg-gray-300 px-1 py-1 text-sm font-semibold text-black transition",
          remove: "ml-2 px-1 py-1 text-sm",
          suggestions:
            "mr-2 my-5 rounded bg-gray-300 px-1 py-1 text-sm font-semibold text-black transition",
          activeSuggestion: "bg-blue-200 ",
          editTagInput: "editTagInputClass",
          editTagInputField: "editTagInputField",
          clearAll: "clearAllClass",
        }}
        tags={tags}
        name={name}
        placeholder={placeholder}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={[13]}
        inputFieldPosition="bottom"
        allowDeleteFromEmptyInput={false}
        minQueryLength={1}
        autocomplete
      />
    </div>
  );
}
