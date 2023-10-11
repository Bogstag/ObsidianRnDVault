---
aliases: 
date_created: 2023-10-08 23:35:26
date_modified: 2023-10-08 23:35:26
id: quickadd
name: QuickAdd
fileclass: plugin
description: Quickly add new pages or content to your vault.
dependsOnSoftware:
  - "[[Tech/Software/Client/Obsidian/Obsidian]]"
version: 1.4.0
isDesktopOnly: false
template: "[[System/templates/fileclass/Add Obsidian plugin page|Add Obsidian plugin page]]"
---

# QuickAdd

Quickly add new pages or content to your vault.

>[!help]- Docs
>
>```gate  
>https://quickadd.obsidian.guide/docs/
>height:700
>profile:obsidian
>```

>[!bug]- Repo
>
>```gate  
>https://github.com/chhoumann/quickadd
>height:700
>profile:obsidian
>```

## Settings

```json
	{
  "ai": {
    "OpenAIApiKey": "",
    "defaultModel": "Ask me",
    "defaultSystemPrompt": "As an AI assistant within Obsidian, your primary goal is to help users manage their ideas and knowledge more effectively. Format your responses using Markdown syntax. Please use the [[Obsidian]] link format. You can write aliases for the links by writing [[Obsidian|the alias after the pipe symbol]]. To use mathematical notation, use LaTeX syntax. LaTeX syntax for larger equations should be on separate lines, surrounded with double dollar signs ($$). You can also inline math expressions by wrapping it in $ symbols. For example, use $$w_{ij}^{\text{new}}:=w_{ij}^{\text{current}}+etacdotdelta_jcdot x_{ij}$$ on a separate line, but you can write \"($eta$ = learning rate, $delta_j$ = error term, $x_{ij}$ = input)\" inline.",
    "promptTemplatesFolderPath": "",
    "showAssistant": true
  },
  "announceUpdates": true,
  "choices": [],
  "devMode": false,
  "disableOnlineFeatures": true,
  "inputPrompt": "single-line",
  "macros": [],
  "migrations": {
    "migrateToMacroIDFromEmbeddedMacro": true,
    "useQuickAddTemplateFolder": true,
    "incrementFileNameSettingMoveToDefaultBehavior": true,
    "mutualExclusionInsertAfterAndWriteToBottomOfFile": true,
    "setVersionAfterUpdateModalRelease": true
  },
  "templateFolderPath": "System/templates",
  "version": "1.4.0"
}
```
