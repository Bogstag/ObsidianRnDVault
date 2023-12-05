---
limit: 100
mapWithTag: false
icon: file-code
tagNames: 
excludes: 
extends: 
version: "2.0"
fields:
  - id: zipUCL
    name: dependsOnScript
    options:
      dvQueryString: dv.pages('"System/Scripts"')
    type: MultiFile
    path: ""
  - id: s4jf96
    name: dependsOnTemplate
    options:
      dvQueryString: dv.pages('"System/Templates"')
    type: MultiFile
    path: ""
  - id: sy7vIe
    name: dependsOnDvView
    options:
      dvQueryString: dv.pages('"System/DataViews"')
    type: MultiFile
    path: ""
  - id: JzsFvY
    name: dependsOnPlugin
    options:
      dvQueryString: dv.pages('"Shared Tech/RnD Vault/Obsidian/plugins"')
    type: MultiFile
    path: ""
---
dependsOnScript:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages('\"System/Scripts\"')"}}
dependsOnTemplate:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages('\"System/Templates\"')"}}
dependsOnDvView:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages('\"System/DataViews\"')"}}
dependsOnPlugin:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages('\"Shared Tech/RnD Vault/Obsidian/plugins\"')"}}
