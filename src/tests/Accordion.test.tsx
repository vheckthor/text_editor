import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "../components/Accordion";

describe("Accordion Component", () => {
  it("should render the Accordion component", () => {
    // Render the Accordion component
    const { getByText } = render(
      <Accordion onFileChange={() => {}} LinkorVideo={() => {}} />
    );

    // Check if the component is rendered
    const addButton = screen.getByText("+");
    expect(addButton).toBeDefined();
  });

  it("should open the modal when the add button is clicked", () => {
    // Render the Accordion component
    const { getByText, queryByText } = render(
      <Accordion onFileChange={() => {}} LinkorVideo={() => {}} />
    );

    // Check if the modal is initially closed
    expect(screen.queryByText("Picture")).toBeNull();

    // Click the add button to open the modal
    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    // Check if the modal is opened
    const pictureButton = screen.getByText("Picture");
    expect(pictureButton).toBeDefined();
  });

  it("should close the modal when the close button is clicked", () => {
    // Render the Accordion component
    const { getByText, queryByText } = render(
      <Accordion onFileChange={() => {}} LinkorVideo={() => {}} />
    );

    // Open the modal
    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    // Check if the modal is opened
    const pictureButton = screen.getByText("Picture");
    expect(pictureButton).toBeDefined();
  });
});
