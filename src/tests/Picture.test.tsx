import React from "react";
import { render, screen,fireEvent } from "@testing-library/react";
import Picture from "../components/Modals/Picture";

describe("Picture Component", () => {
  it("should call onFileChange and isClose when an image is selected", () => {
    // Create mock functions for onFileChange and isClose
    const mockOnFileChange = jest.fn();
    const mockIsClose = jest.fn();

    // Render the Picture component
    const { getByTestId } = render(
      <Picture
        isOpen={true}
        isClose={mockIsClose}
        onFileChange={mockOnFileChange}
      />
    );

    // Get the file input element and simulate selecting a file
    const fileInput = screen.getByTestId("file-input");
    const file = new File(["dummy content"], "dummy.jpg", {
      type: "image/jpeg",
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check if onFileChange and isClose are called
    expect(mockOnFileChange).toHaveBeenCalledWith(file);
    expect(mockIsClose).toHaveBeenCalled();
  });

  it("should not call onFileChange and isClose when no image is selected", () => {
    // Create mock functions for onFileChange and isClose
    const mockOnFileChange = jest.fn();
    const mockIsClose = jest.fn();

    // Render the Picture component
    const { getByTestId } = render(
      <Picture
        isOpen={true}
        isClose={mockIsClose}
        onFileChange={mockOnFileChange}
      />
    );

    // Get the file input element and simulate not selecting any file
    const fileInput = screen.getByTestId("file-input");
    fireEvent.change(fileInput, { target: { files: [] } });

    // Check if onFileChange and isClose are not called
    expect(mockOnFileChange).not.toHaveBeenCalled();
    expect(mockIsClose).not.toHaveBeenCalled();
  });
});
