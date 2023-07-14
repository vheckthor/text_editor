import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuillToolbar from "../components/Editor";
import { EditorContext } from "../context/EditorContext";

describe("QuillToolbar Component", () => {
  test("should call onValue when the value changes", () => {
    const mockOnValue = jest.fn();

    render(
      <EditorContext.Provider
        value={{ incrementWordCount: () => {}, wordCount: 0 }}
      >
        <QuillToolbar onValue={mockOnValue} />
      </EditorContext.Provider>
    );

    // Simulate typing in the editor
    const editor = screen.getByRole("textbox");
    userEvent.type(editor, "Hello World");

    // Check if the onValue function is called with the correct argument
    expect(mockOnValue).toHaveBeenCalledWith(1); // Assuming "Hello" and "World" are considered as separate words

    
  });
});
