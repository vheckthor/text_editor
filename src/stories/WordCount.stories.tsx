// stories/WordCount.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import WordCount from "../components/WordCount";
import { WordCountProps } from "../types/interfaces";

export default {
  title: "WordCount",
  component: WordCount,
} as Meta;

const Template: Story<WordCountProps> = (args) => <WordCount {...args} />;

export const Default = Template.bind({});
Default.args = {
  wordCount: 500,
};
