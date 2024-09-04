import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Decoration application test', async () => {
		// Create a new document in memory
		const testDocument = await vscode.workspace.openTextDocument({
			content: `Line 1\n- Line 2\nLine 3`,
			language: 'plaintext'
		});

		// Open the document in the editor
		const editor = await vscode.window.showTextDocument(testDocument);

		// Simulate the activation of the extension
		myExtension.activate({ subscriptions: [] } as vscode.ExtensionContext);

		// Check the decorations applied
		const decorations = editor.getDecorations(editor.visibleRanges);

		// The decoration should apply to the second line starting with '-'
		assert.strictEqual(decorations.length, 1, 'There should be one decoration applied');
		assert.strictEqual(decorations[0].range.start.line, 1, 'The decoration should start on line 2');
		assert.strictEqual(decorations[0].range.end.line, 1, 'The decoration should end on line 2');
	});
});
