import { ImageProps, Schema, Tag } from "../utils/types";
import React from "react";
import updateCake from "../utils/rest/updateCake";
import Input from "./tailwind_form/Input";

import Form from "./tailwind_form/Form";
import TagsInput from "./tailwind_form/TagsInput";

class CakeForm extends React.Component<
  {},
  { tags: Tag[]; suggestions: Tag[]; cake: {} }
> {
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

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      tags: [
        { id: "Thailand", text: "Thailand" },
        { id: "India", text: "India" },
        { id: "Vietnam", text: "Vietnam" },
        { id: "Turkey", text: "Turkey" },
      ],
      suggestions: [
        { id: "test", text: "test" },
        { id: "3", text: "草莓" },
        { id: "4", text: "大皇冠" },
        { id: "5", text: "小皇冠" },
      ],
      cake: {},
    };
  }
  private host = process.env.NEXT_PUBLIC_METADATA_SERVER;
  private root = process.env.NEXT_PUBLIC_METADATA_ROOT;

  private handleSubmit = async (event) => {
    event.preventDefault();
    // @ts-ignore
    console.log("this is: ", this);
  };

  render() {
    const fields = [];
    fields.push(<Input key="username" label="名字" name="username" />);
    fields.push(
      <TagsInput
        key="tags"
        label="标签"
        name="tags"
        setTags={(t) => {
          this.setState({ tags: t });
        }}
        tags={this.state.tags}
      ></TagsInput>
    );
    return (
      <>
        <Form
          title="测试表格"
          description="简介"
          fields={fields}
          handleSubmit={this.handleSubmit}
        ></Form>
      </>
    );
  }
}

export default CakeForm;
