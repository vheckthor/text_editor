// stories/Editor.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import Editor from "../components/Editor";
import { ChildProps } from "../types/interfaces";

export default {
  title: "Editor",
  component: Editor,
} as Meta;

const Template: Story<ChildProps> = (args) => <Editor {...args} />;

export const Default = Template.bind({});
Default.args = {
  onValue: (wordCount) => console.log(wordCount),
};
