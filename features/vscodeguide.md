# setup
install yo and the generator using:
npm install -g yo generator-code

yo code

i found it easier to make sure that the vscode command "code" is installed before doing this

i used the settings:
- extension in JS
- no type checking
- npm for package manager
then opening with vscode

once the code is open in vscode you can run by pressing f5, then cmd+shift+P in the window that pops up
you can test commands here, default made by the generator is Hello World. it should give a little alert in the other window that says something like "hello world from [name of your extension]"

# commands

commands are handled/set up in extension.js, using the vscode.command.registerCommand function.
when adding/modifying commands, the command must be in the package.json list of commands

