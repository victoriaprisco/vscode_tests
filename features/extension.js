// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
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
	let disposable = vscode.commands.registerCommand('features.rightClick', function () {
		if(hasOpened) {
			// then it has already been opened
			const openPanel = vscode.window.activeTextEditor;
			currentPanel.reveal(openPanel);
		}
		else {
			hasOpened = true;
			// then it has not been opened
			currentPanel = vscode.window.createWebviewPanel("windowTitle", "New Window Header", vscode.ViewColumn.Active);
			currentPanel.webview.html = "<h1> you right clicked to get to this panel. good work </h1>";
		}
		// reset the var after the panel is closed
		panel.onDidDispose(()=>{
			hasOpened = false;
		},
		null,
		context.subscriptions)
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
