import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }

    // Create a text decoration type with custom styling
    const removedDecorationType = vscode.window.createTextEditorDecorationType({
        textDecoration: 'line-through; opacity: 0.5;' // Simulate opacity with CSS
    });

    function updateDecorations() {
        if (!activeEditor) {
            return;
        }

        // Regular expression to match lines starting with '- ' (common for removed lines in diffs)
        const regEx = /^- .*/gm;
        const text = activeEditor.document.getText();
        const decorations: vscode.DecorationOptions[] = [];
        let match;
        while ((match = regEx.exec(text))) {
            const startPos = activeEditor.document.positionAt(match.index);
            const endPos = activeEditor.document.positionAt(match.index + match[0].length);
            const decoration = { range: new vscode.Range(startPos, endPos) };
            decorations.push(decoration);
        }

        // Apply the decorations to the editor
        activeEditor.setDecorations(removedDecorationType, decorations);
    }

    if (activeEditor) {
        updateDecorations();
    }

    // Update decorations when the active editor changes
    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            updateDecorations();
        }
    }, null, context.subscriptions);

    // Update decorations when the text in the document changes
    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            updateDecorations();
        }
    }, null, context.subscriptions);
}

export function deactivate() {}
