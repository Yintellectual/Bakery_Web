import { ImageProps, Schema } from "../utils/types";
import React from "react";
import updateCake from "../utils/rest/updateCake";
import Input from "./tailwind_form/Input";

import Form from "./tailwind_form/Form";
import TagsInput from "./tailwind_form/TagsInput";

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

  const fields = [];
  fields.push(<Input label="名字" name="username" />);
  fields.push(
    <TagsInput
      label="标签"
      name="tags"
      setTags={setTags}
      tags={tags}
    ></TagsInput>
  );

  return (
    <>
      <Form title="测试表格" description="简介" fields={fields}></Form>
    </>
  );
}
