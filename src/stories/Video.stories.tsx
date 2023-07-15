// stories/Video.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import Video from "../components/Modals/Video";
import { LinkAndVideoProps } from "../types/interfaces";

export default {
  title: "Video",
  component: Video,
} as Meta;

const Template: Story<LinkAndVideoProps> = (args) => <Video {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  isClose: () => console.log("Modal closed"),
  LinkorVideo: (content, type) => console.log(content, type),
};
