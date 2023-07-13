// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "features" is now active!');

	let disposable = vscode.commands.registerCommand('features.getHighlight', function () {
		const textEditor = vscode.window.activeTextEditor; 
		if(!textEditor){
			console.log("ERROR: no window is open");
			return;
		}
		let selected = textEditor.selection;
		let contents = "ERROR: nothing was selected";
		if(selected && !selected.isEmpty){
			const highlightedRange = new vscode.Range(selected.start, selected.end);
			contents = textEditor.document.getText(highlightedRange);
		}
		console.log("the highlighted contents are:", contents);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
