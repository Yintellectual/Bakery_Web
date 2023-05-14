import { Attribute, ImageProps, Schema } from "../utils/types";
import React from "react";
import TagsInput from "./TagsInput";
import client from "../utils/rest/client";
import follow from "../utils/rest/follow";
import updateCake from "../utils/rest/updateCake";
import { WithContext as ReactTags } from "react-tag-input";

export default function CakeForm({
  schema,
  entity,
}: {
  schema: Schema;
  entity?: ImageProps;
}) {
  /*
export interface Schema {
  title: String;
  properties: object;
  definitions?: object;
  type: String;
  $schema?: String;
}

export interface Attribute {
  title: String;
  readOnly: boolean;
  type: String;
  items?: object;
}
    * */

  const host = process.env.NEXT_PUBLIC_METADATA_SERVER;
  const root = process.env.NEXT_PUBLIC_METADATA_ROOT;

  const [tags, setTags] = React.useState([
    { id: "Thailand", text: "Thailand" },
    { id: "India", text: "India" },
    { id: "Vietnam", text: "Vietnam" },
    { id: "Turkey", text: "Turkey" },
  ]);

  const suggestions = [
    { id: "test", text: "test" },
    { id: "3", text: "草莓" },
    { id: "4", text: "大皇冠" },
    { id: "5", text: "小皇冠" },
  ];

  const [newCake, setNewCake] = React.useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    // @ts-ignore
    return updateCake(newCake);
  };

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
    <>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              产品详情
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600"></p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select Template
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-4">
                <div className="mt-2">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    图片名
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    id="photo"
                    name="photo"
                    defaultValue={entity ? entity["public_id"] : ""}
                    onChange={(e) =>
                      setNewCake((newCake["photoId"] = e.target.value))
                    }
                    autoComplete="photo_id"
                  />
                </div>
              </div>

              <div key="tags" className="col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  标签
                </label>
                <ReactTags
                  classNames={{
                    tags: "",
                    tagInput: "",
                    tagInputField:
                      " block w-full text-center rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6",
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
                  name="tags"
                  placeholder="添加标签"
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

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-4 mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Multiselect Template
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Comments
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-900"
                        >
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-900"
                        >
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="rounded-md bg-indigo-100 px-3 py-2 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              取消
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              保存
            </button>
          </div>
        </div>
      </form>

      <form
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <div key="public_id">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            图片名
            <input
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              type="text"
              id="photo"
              name="photo"
              defaultValue={entity ? entity["public_id"] : ""}
              onChange={(e) =>
                setNewCake((newCake["photoId"] = e.target.value))
              }
            />
          </label>
        </div>
      </form>
    </>
  );
}
