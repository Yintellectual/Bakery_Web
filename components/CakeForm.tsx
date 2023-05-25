import { Cake, ImageProps, Tag } from "../utils/types";
import React from "react";
import updateCake from "../utils/rest/updateCake";
import Input from "./tailwind_form/Input";

import Form from "./tailwind_form/Form";
import TagsInput from "./tailwind_form/TagsInput";

class CakeForm extends React.Component<
  {
    cakeImage: ImageProps;
    suggestions?: Tag[];
    handleCakeUpdate: Function;
    toggleShowForm?: Function;
  },
  { tags: Tag[]; suggestions: Tag[]; cake: Cake }
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
      tags: this.props.cakeImage.tags
        ? this.props.cakeImage.tags
        : [
            { id: "Thailand", text: "Thailand" },
            { id: "India", text: "India" },
            { id: "Vietnam", text: "Vietnam" },
            { id: "Turkey", text: "Turkey" },
          ],
      suggestions: this.props.suggestions
        ? this.props.suggestions
        : [
            { id: "test", text: "test" },
            { id: "3", text: "草莓" },
            { id: "4", text: "大皇冠" },
            { id: "5", text: "小皇冠" },
          ],
      cake: {
        photo: this.props.cakeImage.public_id,
        tags: this.props.cakeImage.tags.map((t) => t.text),
      },
    };
  }

  private handleSubmit = async (event) => {
    event.preventDefault();
    let newCake = { ...this.state.cake };
    newCake.tags = this.state.tags.map((t) => t.text);
    this.setState({
      cake: newCake,
    });
    updateCake(this.state.cake).then(() => {
      if (this.props.toggleShowForm) {
        this.props.toggleShowForm();
      }
      this.props.handleCakeUpdate(this.state.cake);
    });
  };
  private handleNameChange = function (event) {};

  render() {
    const fields = [];
    fields.push(
      <Input
        key="name"
        label="产品名称"
        name="name"
        onChange={this.handleNameChange}
      />
    );
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
