// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
let hasOpened = false;
// let panel = vscode.window.createWebviewPanel("windowTitle", "New Window Header", vscode.ViewColumn.Active);
// panel.webview.html = "<h1> you right clicked to get to this panel. good work </h1>";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let currentPanel = vscode.WebviewPanel;
  hasOpened = false;
  let disposable = vscode.commands.registerCommand("features.rightClick", function () {
      const textEditor = vscode.window.activeTextEditor;
      if (!textEditor) {
        console.log("ERROR: no window is open");
        return;
      }
      let selected = textEditor.selection;
      let contents = "ERROR: nothing was selected";
      if (selected && !selected.isEmpty) {
        const highlightedRange = new vscode.Range(selected.start, selected.end);
        contents = textEditor.document.getText(highlightedRange);

        console.log("the highlighted contents are:", contents);
        if (hasOpened) {
          // then it has already been opened
          const openPanel = vscode.window.activeTextEditor;
          currentPanel.reveal(openPanel);
        } else {
          hasOpened = true;
          // then it has not been opened
          currentPanel = vscode.window.createWebviewPanel(
            "windowTitle",
            "New Window Header",
            vscode.ViewColumn.Active
          );
          currentPanel.webview.html = contents;
        }
      }
      // reset the var after the panel is closed
      panel.onDidDispose(
        () => {
          hasOpened = false;
        },
        null,
        context.subscriptions
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
