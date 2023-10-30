---
limit: 100
mapWithTag: false
icon: file-code
tagNames: 
excludes: 
extends: 
version: 1
---
dependsOnScript:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages('\"System/Scripts\"')"}}
dependsOnTemplate:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages('\"System/Templates\"')"}}
dependsOnDvView:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages('\"System/DataViews\"')"}}
dependsOnPlugin:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages('\"Shared Tech/RnD Vault/Obsidian/plugins\"')"}}
