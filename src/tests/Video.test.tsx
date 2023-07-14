import { render, fireEvent, screen } from "@testing-library/react";
import Video from "../components/Modals/Video";
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
      <Video
        isOpen={true}
        isClose={mockIsClose}
        LinkorVideo={mockLinkorVideo}
      />
    </EditorContext.Provider>
  );

  // Enter values in the input fields
  const urlInput = screen.getByTestId("URL");
  fireEvent.change(urlInput, {
    target: { value: "https://www.youtube.com/watch?v=abcdefghijk" },
  });

  // Submit the form
  const submitButton = screen.getByTestId("embed");
  fireEvent.click(submitButton);

  // Check if the mock functions were called
  expect(mockLinkorVideo).toHaveBeenCalledWith(
    "https://www.youtube.com/embed/abcdefghijk",
    "video"
  );
  expect(mockIncrementWordCount).toHaveBeenCalled();
  expect(mockIsClose).toHaveBeenCalled();
});
