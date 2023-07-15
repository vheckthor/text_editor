// stories/SocialMedia.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import SocialMedia from "../components/Modals/SocialMedia";
import { LinkAndVideoProps } from "../types/interfaces";

export default {
  title: "SocialMedia",
  component: SocialMedia,
} as Meta;

const Template: Story<LinkAndVideoProps> = (args) => <SocialMedia {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  isClose: () => console.log("Modal closed"),
  LinkorVideo: (content, type) => console.log(content, type),
};
