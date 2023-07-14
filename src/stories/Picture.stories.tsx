// stories/Picture.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import Picture from "../components/Modals/Picture";
import { PictureProps } from "../types/interfaces";

export default {
  title: "Picture",
  component: Picture,
} as Meta;

const Template: Story<PictureProps> = (args) => <Picture {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onFileChange: (file) => console.log(file),
  isClose: () => console.log("Modal closed"),
};
