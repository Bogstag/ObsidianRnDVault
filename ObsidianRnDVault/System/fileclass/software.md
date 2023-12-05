---
date_created: 2023-09-16 00:01:08
date_modified: 2023-10-04 22:19:31
excludes: 
extends: 
icon: laptop
limit: 100
mapWithTag: false
tagNames: 
version: "2.0"
fields:
  - id: JgcjAR
    name: supports
    options:
      autoUpdate: true
      outputType: LinksList
      builtinSummarizingFunction: Count
      customListFunction: page.file.name
      customSummarizingFunction: return pages.length
      dvQueryString: dv.pages().where(p => p.fileclass == "plugin").sort(p => p.file.path, "asc")
      targetFieldName: dependsOnSoftware
    type: Lookup
    path: ""
---
# Software

supports:: {"type":"Lookup","options":{"autoUpdate":true,"outputType":"LinksList","builtinSummarizingFunction":"Count","customListFunction":"page.file.name","customSummarizingFunction":"return pages.length","dvQueryString":"dv.pages().where(p => p.fileclass == \"plugin\").sort(p => p.file.path, \"asc\")","targetFieldName":"dependsOnSoftware"}}
