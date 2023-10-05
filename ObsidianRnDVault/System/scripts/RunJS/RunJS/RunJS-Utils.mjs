/**
 * Module of frequently used functions in [Obsidian-RunJS]{@link https://github.com/eoureo/obsidian-runjs}.
 *
 * @RunJS RunJS/Utils
 * Source: https://gist.github.com/eoureo/e5cb83afac9c9e39d7f909a3cae7ecf2
 * modified: 2023-07-13 19:35:07
 *
 * async function replaceSelection(app, substr = "", substr_new = "")
 * async function getSelection(app)
 * async function setSelection(app, text)
 * async function appendToFile(app, filePath, text)
 * async function writeAtHeading(app, filePath, heading, text, where = "append", deleteBlankLine = false)
 * async function appendAtHeading(app, filePath, heading, text, deleteBlankLine)
 * async function insertAtHeading(app, filePath, heading, text, deleteBlankLine)
 * async function replaceAtHeading(app, filePath, heading, text, deleteBlankLine)
 * function createMarkdownTable(array)
 * function getStringLength(str)
 * padString(str, width)
 */
import { TFile } from "obsidian";

/**
 * Replaces the selected text in the editor with a new substring.
 *
 * @param {App} app - The instance of the Obsidian application.
 * @param {string} substr - The substring or regular expression pattern to be replaced.
 * @param {string|Function} substr_new - The new substring or a function to generate the replacement.
 * @returns {Promise<void>} - A promise that resolves when the replacement is complete.
 */
export async function replaceSelection(app, substr = "", substr_new = "") {
  const { MarkdownView, Notice } = import("obsidian");
  if (substr === "" && substr_new === "") return;

  //let view = app.workspace.getActiveViewOfType(MarkdownView);
  let view = app.workspace.getActiveFileView();
  let editor = view?.editor;
  if (editor) {
    let selection = editor.getSelection();

    if (selection) {
      editor.replaceSelection(selection.replace(substr, substr_new));
    } else {
      let tFile = app.workspace.getActiveFile();

      let content = await app.vault.read(tFile);
      let content_new = content.replace(substr, substr_new);

      if (content !== content_new) app.vault.modify(tFile, content_new);
    }
  } else {
    new Notice("Error: No Editor.");
  }
}

/**
 * Retrieves the selected text in the editor.
 *
 * @param {App} app - The instance of the Obsidian application.
 * @returns {Promise<string>} - A promise that resolves with the selected text, or an empty string if no selection is found.
 */
export async function getSelection(app) {
  const { MarkdownView, Notice } = import("obsidian");

  //let view = app.workspace.getActiveViewOfType(MarkdownView);
  let view = app.workspace.getActiveFileView();
  let editor = view?.editor;
  if (editor) {
    let selection = editor.getSelection();

    if (selection) {
      return selection;
    } else {
      return "";
    }
  } else {
    new Notice("Error: No Editor.");
  }
}

/**
 * Sets the selected text in the editor to the specified text.
 *
 * @param {App} app - The instance of the Obsidian application.
 * @param {string} text - The text to set as the selection.
 * @returns {Promise<void>} - A promise that resolves when the selection is set.
 */
export async function setSelection(app, text) {
  const { MarkdownView, Notice } = import("obsidian");

  //let view = app.workspace.getActiveViewOfType(MarkdownView);
  let view = app.workspace.getActiveFileView();
  let editor = view?.editor;
  if (editor) {
    editor.replaceSelection(text);
  } else {
    new Notice("Error: No Editor.");
  }
}

/**
 * A function that appends text to a file.
 *
 * @param {App} app - The instance of the Obsidian application.
 * @param {string} filePath - The file path.
 * @param {string} text - The text to append.
 * @returns {Promise<void>} - An asynchronous function that appends text to a file.
 * @example
 * const app = this.app; // new App();
 * const filePath = "path/to/file.md";
 * const text = "New text";
 * await appendToFile(app, filePath, text);
 * console.log("Text successfully appended.");
 */
export async function appendToFile(app, filePath, text) {
  const tFile = app.vault.getAbstractFileByPath(filePath);
  console.log("tFile:", tFile);
  if (tFile instanceof TFile) app.vault.append(tFile, text);
}

/**
 * Writes(append, insert, replace) text at the specified heading in a file.
 *
 * @param {App} app - The Obsidian application instance.
 * @param {string} filePath - The file path.
 * @param {string} heading - The heading to write at.
 * @param {string} text - The text to write.
 * @param {string} [where="append"] - The position to write: "append", "insert", or "replace".
 * @param {boolean} [deleteBlankLine=false] - Whether to delete a blank line before the inserted text.
 * @returns {Promise<void>} - A promise that resolves when the text has been written.
 */
export async function writeAtHeading(
  app,
  filePath,
  heading,
  text,
  where = "append",
  deleteBlankLine = false
) {
  const tFile = app.vault.getAbstractFileByPath(filePath);

  let position;

  if (tFile instanceof TFile) {
    const fileCache = app.metadataCache.getFileCache(tFile);

    for (let h_i = 0; h_i < fileCache.headings.length; h_i++) {
      const cacheHeading = fileCache.headings[h_i];
      if (cacheHeading.heading === heading) {
        const lines = (await app.vault.read(tFile)).split("\n");
        const startLine = cacheHeading.position.start.line + 1;

        if (where === "insert") {
          if (deleteBlankLine && lines[startLine] === "")
            lines.splice(startLine, 1);
          lines.splice(startLine, 0, text);
        } else {
          let endLine;
          for (let h_i2 = h_i + 1; h_i2 < fileCache.headings.length; h_i2++) {
            const cacheHeadingNext = fileCache.headings[h_i2];
            if (cacheHeading.level >= cacheHeadingNext.level) {
              endLine = cacheHeadingNext.position.start.line - 1;
              break;
            }
          }

          if (endLine === undefined) {
            endLine = lines.length;
          }

          if (where === "replace") {
            lines.splice(startLine, endLine - startLine + 1, text);
          } else {
            // append
            lines.splice(endLine + 1, 0, text);
            if (deleteBlankLine && lines[endLine] === "")
              lines.splice(endLine, 1);
          }
        }

        await app.vault.modify(tFile, lines.join("\n"));
      }
    }
  }
}

/**
 * Appends text at the specified heading in a file.
 *
 * @param {App} app - The Obsidian application instance.
 * @param {string} filePath - The file path.
 * @param {string} heading - The heading to append at.
 * @param {string} text - The text to append.
 * @param {boolean} [deleteBlankLine=false] - Whether to delete a blank line before the appended text.
 * @returns {Promise<void>} - A promise that resolves when the text has been appended.
 */
export async function appendAtHeading(
  app,
  filePath,
  heading,
  text,
  deleteBlankLine
) {
  await writeAtHeading(app, filePath, heading, text, "append", deleteBlankLine);
}

/**
 * Inserts text at the specified heading in a file.
 *
 * @param {App} app - The Obsidian application instance.
 * @param {string} filePath - The file path.
 * @param {string} heading - The heading to insert at.
 * @param {string} text - The text to insert.
 * @param {boolean} [deleteBlankLine=false] - Whether to delete a blank line before the inserted text.
 * @returns {Promise<void>} - A promise that resolves when the text has been inserted.
 */
export async function insertAtHeading(
  app,
  filePath,
  heading,
  text,
  deleteBlankLine
) {
  await writeAtHeading(app, filePath, heading, text, "insert", deleteBlankLine);
}

/**
 * Replaces text at the specified heading in a file.
 *
 * @param {App} app - The Obsidian application instance.
 * @param {string} filePath - The file path.
 * @param {string} heading - The heading to replace at.
 * @param {string} text - The text to replace.
 * @param {boolean} [deleteBlankLine=false] - Whether to delete a blank line before the replaced text.
 * @returns {Promise<void>} - A promise that resolves when the text has been replaced.
 */
export async function replaceAtHeading(
  app,
  filePath,
  heading,
  text,
  deleteBlankLine
) {
  await writeAtHeading(
    app,
    filePath,
    heading,
    text,
    "replace",
    deleteBlankLine
  );
}

/**
 * Creates a markdown table from a 2D array.
 *
 * @param {Array<Array<any>>} array - The input array representing the table data.
 * @returns {string} - The generated markdown table.
 *
 * Keeps columns the same width even when they contain multibyte characters such as Korean, Chinese, and Japanese.
 * For simplicity, though less precise, here's the JavaScript source code to keep columns the same width without using `wcwidth`:
 *
 */
export function createMarkdownTable(array) {
  let columnWidths = [];

  // Calculate the maximum width of each column
  // 각 열의 최대 너비 계산
  for (let i = 0; i < array[0].length; i++) {
    let maxWidth = 0;

    for (let j = 0; j < array.length; j++) {
      const cellLength = getStringLength(array[j][i]);
      maxWidth = Math.max(maxWidth, cellLength);
    }

    columnWidths.push(maxWidth);
  }

  let table = "";

  // create header
  // 헤더 생성
  for (let i = 0; i < array[0].length; i++) {
    table += `| ${padString(array[0][i], columnWidths[i])} `;
  }

  table += "|\n";

  // create header divider
  // 헤더 구분선 생성
  for (let i = 0; i < array[0].length; i++) {
    table += `| ${"-".repeat(columnWidths[i])} `;
  }

  table += "|\n";

  // create data row
  // 데이터 행 생성
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      table += `| ${padString(array[i][j], columnWidths[j])} `;
    }

    table += "|\n";
  }

  return table;
}

/**
 * Function to calculate the width of a string
 *
 * Calculates the length of a string considering ASCII characters to have a width of 1, and all other characters to have a width of 2.
 * @param {string} str - The input string.
 * @returns {number} - The length of the string.
 */
function getStringLength(str) {
  let length = 0;

  str = new String(str);

  for (let i = 0; i < str.length; i++) {
    // Calculate ASCII characters to have a width of 1, all other characters to have a width of 2.
    // ASCII 문자는 1의 너비를 가지고, 그 외 문자는 2의 너비를 가지도록 계산합니다.
    if (/[\x00-\x7F]/.test(str[i])) {
      length += 1;
    } else {
      length += 2;
    }
  }

  return length;
}

/**
 * Pad a string to a given width
 *
 * @param {string} str - The input string.
 * @param {number} width - The desired width.
 * @returns {string} - The padded string.
 */
function padString(str, width) {
  const diff = width - getStringLength(str.toString());
  if (diff > 0) {
    return `${str}${" ".repeat(diff)}`;
  }
  return str;
}

// // Test Example 2D Array (included korean)
// const array = [
//   ['Header 1', '헤더 2', 'Header 3'],
//   ['Data 1', '데이터 2', '열 3'],
//   ['cell 4', '칸 5', 'Data 6']
// ];
//
// const markdownTable = createMarkdownTable(array);
// console.log(markdownTable);
