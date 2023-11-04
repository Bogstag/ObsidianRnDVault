---
fileclass: template
---
<%*
// New note template configuration

const templatesFolders = ['System/Templates/Notes/']

const openNewNoteInSplit = false // Set this to true if you want the new note to open in a split to the right

let addLink = false; // If note template_title is set to "DONTASKUSER", do you want to add link to new note in current note? If template_title is set to something else you get prompted and can change this later.

const args = { templatesFolders: templatesFolders, openNewNoteInSplit: openNewNoteInSplit, addLink:addLink }


const notePicker = new tp.user.NotePicker(args);
console.log("init notePicker with args", notePicker, args);

// Let get user something to select
const templates = await notePicker.getTemplateSuggestions();
console.log("notePicker.getTemplateSuggestions", templates);
// Let user make selection
const chosen = await tp.system.suggester(templates.map(x => x.label), templates)
console.log("chosen", chosen)

if (!chosen) return ''
let title = ""
if (chosen.title === "DONTASKUSER") {
	title = chosen.title;
	console.log("title: chosen DONT ASK USER", title);
} else {
	title = (await tp.system.prompt('Name for the new file. Will use the current date/time if no value given.', chosen.title || '')) || moment().format('YYYY-MM-DD HH꞉mm꞉ss')
	console.log("title: user new", title);
	if (typeof title !== 'string') return '' // Prompt was cancelled
	title = await notePicker.makeFilesystemSafeTitle(title)
	console.log("title: makeFilesystemSafeTitle", title);
	addLink = await tp.system.suggester(['Yes', 'No'], [true, false], false, 'Insert link in the current file? (Escape = no)')
}

const destinationFolder = chosen.destinationFolder || tp.file.folder(true)

if (!destinationFolder) {
	destinationFolder = tp.file.folder(true);
}
console.log("destinationFolder", destinationFolder);
console.log("title: before create note", title);

const result = await notePicker.createFromTemplate(chosen.templatePath, title, destinationFolder, !addLink && !openNewNoteInSplit)

if (openNewNoteInSplit) {
  // Open the new file in a pane to the right
  const file = app.vault.getAbstractFileByPath(`${destinationFolder}/${title}.md`)
  // Create the new leaf
  const newLeaf = app.workspace.getLeaf('split')
  await newLeaf.openFile(file)
  // Set the view to edit mode
  const view = newLeaf.getViewState()
  view.state.mode = 'source'
  newLeaf.setViewState(view)
  // Give focus to the new leaf
  app.workspace.setActiveLeaf(newLeaf, { focus: true })
  // Move the cursor to the end of the new note
  app.workspace.activeLeaf.view.editor?.setCursor({ line: 999, ch: 0 })
}
console.log("title: before end", title);
return result


	/*
	Full instructions here: https://share.note.sx/2rskmna5
	*/
	
	// -------------------------------------
	// Nothing to configure after this point
	// -------------------------------------
	
	// const templateFiles = []
	// for (const folder of templatesFolders) {
	//   const files = (await app.vault.adapter.list(folder))?.files || []
	//   files.sort((a, b) => a.localeCompare(b)) // Sort alphabetically
	//   templateFiles.push(...files)
	// }
	// if (!templateFiles) return
	// const templates = templateFiles.map(path => {
	//   const file = app.vault.getAbstractFileByPath(path)
	//   const meta = app.metadataCache.getFileCache(file)?.frontmatter || {}
	//   let title = meta.template_title || ''
	//   // Date/time placeholder replacement
	//   const match = title.match(/MOMENT\((.*?)\)/)
	//   if (match) title = title.replace(/(MOMENT\(.*?\))/, moment().format(match[1]))
	
	//   return {
	//     label: file.basename,
	//     title,
	//     templatePath: file.path,
	//     destinationFolder: meta.template_destination_folder
	//   }
	// })
	
	// /**
	//  * Create a new note from a Templater template.
	//  * @param {string} templatePath - Full vault path to the template file
	//  * @param {string} newNoteName - Title / filename of the new note
	//  * @param {string} destinationFolder - Full vault path to the destination folder
	//  * @param {boolean} [openNewNote] - Optional: Open the new note after creating it
	//  */
	// async function createFromTemplate (templatePath, newNoteName, destinationFolder, openNewNote = false) {
	//   destinationFolder = destinationFolder || tp.file.folder(true)
	//   const newFile = await tp.file.create_new(tp.file.find_tfile(templatePath), newNoteName, openNewNote, app.vault.getAbstractFileByPath(destinationFolder))
	//   // Remove the template properties from the new file
	//   app.fileManager.processFrontMatter(newFile, (frontmatter) => {
	//     delete frontmatter.template_destination_folder
	//     delete frontmatter.template_title
	//   })
	//   return openNewNote ? '' : `[[${newNoteName}]]`
	// }
	
	// /**
	//    * Takes a note filename/title, and replaces any filesystem-unsafe characters
	//    * with Unicode characters that look the same
	//    * @param {string} title 
	//    * @returns {string}
	//    */
	// function makeFilesystemSafeTitle (title) {
	//   // https://stackoverflow.com/questions/10386344/how-to-get-a-file-in-windows-with-a-colon-in-the-filename
	//   // some replacements: ” ‹ › ⁎ ∕ ⑊ ＼︖ ꞉ ⏐
	//   title = title.replace(/:/g, '꞉')
	//   title = title.replace(/\//g, '∕')
	//   return title
	// }

%>
