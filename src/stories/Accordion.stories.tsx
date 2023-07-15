// stories/Accordion.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import Accordion from "../components/Accordion";
import { AccordionProps } from "../types/interfaces";

export default {
  title: "Accordion",
  component: Accordion,
  argTypes: {
    onFileChange: { action: "onFileChange" },
    LinkorVideo: { action: "LinkorVideo" },
  },
} as Meta;

const Template: Story<AccordionProps> = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {};
