---
limit: 100
mapWithTag: false
icon: toy-brick
tagNames: 
excludes: supports
extends: software
version: 3
---
dependsOnSoftware:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages().where(p => p.fileclass == \"software\")"}}


