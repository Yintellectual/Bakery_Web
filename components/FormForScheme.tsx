import { Attribute, ImageProps, Schema } from "../utils/types";
import React from "react";
import TagsInput from "./TagsInput";
import client from "../utils/rest/client";
import follow from "../utils/rest/follow";

export default function CakeFormForSchema({
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCake = {
      photo: entity.public_id,
      tags: tags.map((tag) => tag.text),
    };
    return follow(client, host + root, ["cakes"]).then((response) => {
      let href = response.entity._links.self.href;
      return client({
        method: "POST",
        path: href,
        entity: newCake,
        headers: { "Content-Type": "application/json" },
      });
    });
  };

  const properties = schema.properties;
  let inputs = Object.keys(properties).map((key) => {
    let attribute: Attribute = properties[key];
    let title = attribute.title;
    if (attribute.type == "string") {
      return (
        <>
          <div className="md:w-1/3" key={"label_" + title}>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              {title}
            </label>
          </div>

          <div className="md:w-2/3" key={"input_" + title}>
            <input
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              type="text"
              id={title}
              name={title}
              defaultValue={entity ? entity["public_id"] : title}
            />
          </div>
        </>
      );
    } else if (attribute.type == "array") {
      return (
        <>
          <label key={"label_" + title}>{title}</label>
          <TagsInput />
        </>
      );
    }
  });

  return (
    <div className="w-full max-w-xs">
      <form
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">{inputs}</div>
        <button className="" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
