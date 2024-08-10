import { Editor } from '@monaco-editor/react';
import './EditorStyle.css';

function CodeEditor({ code, setCode }) {
  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: 16,
    minimap: { enabled: false },
    lineNumbers: "on",
    scrollBeyondLastLine: false,
    theme: "vs-dark",
  };
  // console.log(code)
  return (
    <div className="editor-container">
      <Editor
        height="70vh"
        width="100%" // Adjust to fill the container width
        language="cpp"
        value={code}
        onChange={(value) => setCode(value)}
        options={editorOptions}
      />
    </div>
  );
}

export default CodeEditor;
