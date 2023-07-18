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
      if (selected && !selected.isEmpty) {
        const highlightedRange = new vscode.Range(selected.start, selected.end);
        let contents = textEditor.document.getText(highlightedRange);
        console.log("the highlighted contents are:", contents);
		console.log("hasOpened", hasOpened);
        if (hasOpened) {
          // then it has already been opened
          const openPanel = vscode.window.activeTextEditor;
		  currentPanel.webview.html = contents;
          currentPanel.reveal(openPanel);
        } else {
          hasOpened = true;
          // then it has not been opened
          currentPanel = vscode.window.createWebviewPanel(
            "windowTitle",
            "Code History",
            vscode.ViewColumn.Active
          );
          currentPanel.webview.html = contents;
        }
      }
	  else {
		vscode.window.showErrorMessage("Please select some text before viewing the story");
	  }
      // reset the var after the panel is closed
      currentPanel.onDidDispose(
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
