import { render, fireEvent, screen } from "@testing-library/react";
import SocialMedia from "../components/Modals/SocialMedia";
import { EditorContext } from "../context/EditorContext";

test("should call LinkorVideo, incrementWordCount, and isClose when the form is submitted", () => {
  // Create mock functions
  const mockLinkorVideo = jest.fn();
  const mockIncrementWordCount = jest.fn();
  const mockIsClose = jest.fn();

  // Render the component
  render(
    <EditorContext.Provider
      value={{ incrementWordCount: mockIncrementWordCount, wordCount: 0 }}
    >
      <SocialMedia
        isOpen={true}
        isClose={mockIsClose}
        LinkorVideo={mockLinkorVideo}
      />
    </EditorContext.Provider>
  );

  // Enter values in the input fields
  const urlInput = screen.getByLabelText("url");
  const codeInput = screen.getByLabelText("Code");
  fireEvent.change(urlInput, { target: { value: "https://example.com" } });
  fireEvent.change(codeInput, { target: { value: "Example" } });

  // Submit the form
  const submitButton = screen.getByTestId("embed");
  fireEvent.click(submitButton);

  // Check if the mock functions were called
  expect(mockLinkorVideo).toHaveBeenCalledWith(
    '<a href="https://example.com" target="_blank">Example</a>',
    "link"
  );
  expect(mockIncrementWordCount).toHaveBeenCalled();
  expect(mockIsClose).toHaveBeenCalled();
});
