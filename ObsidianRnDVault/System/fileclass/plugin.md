---
limit: 100
mapWithTag: false
icon: toy-brick
tagNames: 
excludes: supports
extends: software
version: "2.0"
fields:
  - id: 4fE69m
    name: dependsOnSoftware
    options:
      dvQueryString: dv.pages().where(p => p.fileclass == "software")
    type: MultiFile
    path: ""
---
dependsOnSoftware:: {"type":"MultiFile","options":{"dvQueryString":"dv.pages().where(p => p.fileclass == \"software\")"}}


