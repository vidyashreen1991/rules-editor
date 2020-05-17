import React from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import './App.css';
import { parseRules } from './rules-parser/Parser';
import { debounce } from './helpers/UiHelper';
import { updateRules } from './services/RulesService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.focusEditor();
  }

  onChange(editorState) {
    const contentState = editorState.getCurrentContent();
    let rules = convertToRaw(contentState).blocks.map(({ text }) => text);
    let parsedRules = parseRules(rules);
    if (JSON.stringify(parsedRules) !== JSON.stringify(this.state.rules)) {
      updateRules(parsedRules)
    }
    this.setState({
      editorState,
      rules: parsedRules
    });
  }

  render() {
    return (
      <div
        className="app">
        <header
          className="app-header">
          Rules Editor
        </header>
        <div
          className="app-body editor-container"
          onClick={this.focusEditor}>
          <Editor
            ref={this.setEditor}
            editorState={this.state.editorState}
            onChange={debounce(500, this.onChange)}
          />
        </div>
      </div>
    );
  }
}


export default App;
