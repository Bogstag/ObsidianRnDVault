---
cssclasses:
  - 
date_created: 2023-09-14 01:12:57
date_modified: 2023-10-15 13:36:10
include_in_navbar: true
navbar_name: Home
tags:
  - dashboard
---
# Dashboard

TODO:: Finish this

```dataviewjs
const {Navbar} = customJS;
await Navbar.getDashboard(dv, "#dashboard", false, 0, 1);
```

>[!multi-column]
>
>>[!blank-container]
>>## 🏠 Navigation
>>[[Concept Board|💡  Concept Board →]]
>>[[Log Dashboard|📘 Journal →]]
>>[[Learning Dashboard|🎓  Learning →]]
>>[[Notes Dashboard|🗒️  Notes →]]
>>[[Projects|📐  Projects →]]
>>[[Personal Dashboard|🔒  Personal →]]
>>[[Resources Dashboard|ℹ️  Resources →]]
>>[[Spaces Dashboard|📦  Spaces →]]
>
>>[!blank-container]
>>## 📐 Projects (`$=dv.pages('"Projects" or #project').length`)
>>
>>```dataviewjs
>>let projectList = [];
>>let projects = dv.pages('"Projects" or #project'); 
>>projects = projects.filter(obj =>obj.is_active === true);
>>for(let i=0; i<projects.length; i++){
>>projectList.push(`[[${projects[i].file.path}|${projects[i].file.name} →]]`)
>>} 
>>dv.list(projectList)
>>```

---

````ad-dashb
title: Things to do
icon: list
color: #D5763F
- ## Next on the list
	```dataviewjs
	dv.view('tasks')
	```
- ## Projects
	```dataview
	TABLE WITHOUT ID 
	file.link AS "Project",
	choice(length(filter(file.tasks, (x) => all(x.text, !x.completed))), "–", "Yes") AS "Needs tasks"
	FROM #project AND !"Utility" AND !#exclude-master-tasklist
	WHERE !completed
	SORT file.name
```
````

---

````ad-dashb
title: Recently Changed
icon: pen
color: 3, 135, 36
```dataviewjs
function converteTime(time){
	// Convert from ms to minutes
	let convertedTime = ""
	time = time/60000; // time in minutes

	if(time < 60){
		convertedTime = `${Math.ceil(time)} minutes ago`;
	} else if (time < 1440){
		convertedTime = `${Math.ceil(time/60)} hours ago`
	} else {
		convertedTime = `${Math.ceil(time/1440)} days ago`
	}	
	return convertedTime
}

for (let group of dv.pages('!"_data_"').sort(k => k.file.mtime, 'desc').limit(10).groupBy(p => p.page)) {
	dv.table(["Name", "Date Modified", ""], 
		group.rows
			.sort(k => k.file.mtime, 'desc')
			.map(k => [
			k.file.link, 
			converteTime(Date.now()-k.file.mtime),
			`<small>[[${k.file.path}|View →]]</small>`
			]))}
```
- ### Stats
	- Number of files: `$=dv.pages('!"_data_"').length`
	- Number of notes: `$=dv.pages('"Notes" and !#dashboard').length`
	- Number of concepts: `$=dv.pages('"Concept Board" and !#dashboard').length`
````

## 📰 Recent News

---

```dataviewjs
const {Navbar} = customJS;
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```
