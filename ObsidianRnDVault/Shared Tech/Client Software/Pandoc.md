```bash
-f markdown+wikilinks_title_after_pipe --defaults=C:\Users\User\Documents\Notir\Obsidian-notes\pandoc.yaml --citeproc --resource-path="${currentPath}" --resource-path="${attachmentFolderPath}" --metadata title="${currentFileName}" -s -o "${outputPath}" -t pdf
```

### My cmd
```bash
for Wikilinks Word
-f markdown+wikilinks_title_after_pipe --resource-path="${currentDir}" --resource-path="${attachmentFolderPath}" --lua-filter="${luaDir}/markdown.lua" --metadata title="${currentFileName}" -s -o "${outputPath}" -t docx
```

## Org cmd
```bash
for Markdown
-f markdown --resource-path="${currentDir}" --resource-path="${attachmentFolderPath}" --lua-filter="${luaDir}/markdown.lua" -s -o "${outputPath}" -t commonmark_x-attributes

for word
-f markdown --resource-path="${currentDir}" --resource-path="${attachmentFolderPath}" -s -o "${outputPath}" -t docx
```