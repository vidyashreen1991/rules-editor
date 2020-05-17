import React from 'react';
import { Editor, EditorState, convertToRaw, removeEditorStyles } from 'draft-js';
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
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.focusEditor();
  }

  handleChange(editorState) {
    const contentState = editorState.getCurrentContent();
    let rules = convertToRaw(contentState).blocks.map(({ text }) => text);
    let parsedRules = parseRules(rules);
    this.setState({
      editorState,
      rules: parsedRules
    });
  }

  handleClick() {
    updateRules(this.state.rules);
  }

  render() {
    return (
      <div
        className="app">
        <header
          className="app-header">
          Rules Editor
        </header>
        <div className="app-body">
          <div
            className="editor-container"
            onClick={this.focusEditor}>
            <Editor
              ref={this.setEditor}
              editorState={this.state.editorState}
              onChange={debounce(500, this.handleChange)}
            ></Editor>
          </div>
          <button
            onClick={this.handleClick}>SAVE</button>
        </div>
      </div>
    );
  }
}


export default App;
