---
cssclasses:
  - 
date_created: 2023-09-14 01:12:57
date_modified: 2023-10-07 06:03:30
include_in_navbar: true
navbar_name: Home
tags:
  - dashboard
---
# Dashboard
TODO:: Finish this
```dataviewjs
const {Navbar} = customJS;
//await Navbar.createNavbar(app, dv, "#dashboard", 0, 1);
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
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
>>## 📐 Projects (`$=dv.pages('"Projects" and #project').length`)
>>
>>```dataviewjs
>>let projectList = [];
>>let projects = dv.pages('"Projects" and #dashboard and !#projects');
>>projects = projects.filter(obj =>obj.is_active === true);
>>for(let i=0; i<projects.length; i++){
>>projectList.push(`[[${projects[i].file.path}|${projects[i].file.path.split('/')[projects[i].file.path.split('/').length-2]} →]]`)
>>}
>>dv.list(projectList)
>>```

---

>[!multi-column]
>
>>[!blank-container]
>>### 🚀 Upcoming Launches
>
>>[!blank-container]
>>### &emsp;🛰️Space Image of the Day

---

## ✏️ Recently changed

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

**Stats**
Number of files: `$=dv.pages('!"_data_"').length`
Number of notes: `$=dv.pages('"Notes" and !#dashboard').length`
Number of concepts: `$=dv.pages('"Concept Board" and !#dashboard').length`

---

## 📰 Recent news

```dataviewjs
const {Navbar} = customJS;
await Navbar.createNavbar(app, dv); 
```
