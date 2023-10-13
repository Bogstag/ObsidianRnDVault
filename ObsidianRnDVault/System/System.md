---
date_created: 2023-10-07 06:08:28
date_modified: 2023-10-07 06:10:52
include_in_navbar: true
tags: 
  - dashboard/system
  - system/dashboard
---
# System

```dataviewjs
const {Navbar} = customJS;
//await Navbar.createNavbar(app, dv, "#dashboard", 0, 1);
await Navbar.getDashboard(dv, "#dashboard", 	false, 0, 1);
```

```dataviewjs
const {Navbar} = customJS;
await Navbar.createNavbar(app, dv, "#system/dashboard", 2); 
```

## Waypoint
%% Begin Waypoint %%
- **[[System]]**
	- **fileclass**
		- [[all]]
		- [[dashboard]]
		- **[[journal]]**
			- [[daily]]
			- [[monthly]]
			- [[quarterly]]
			- [[weekly]]
			- [[yearly]]
		- [[plugin]]
		- **[[project]]**
			- [[task]]
		- [[resource]]
		- [[responsibilities]]
		- [[software]]
		- [[task]]
		- [[template]]
		- [[test]]
	- **janitor**
		- [[Find nonexisting notes]]
	- **[[scripts]]**
		- **classes**

		- **dvViews**

		- **functions**

		- **RunJS**
			- **Ego**
				- **API**

				- **Daily**

				- **Habit**

			- **RunJS**
				- [[RunJS Examples]]
		- **secrets**

		- **Utils**

	- **storage**
		- [[excalibrain]]
	- **[[templates]]**
		- **fileclass**
			- [[Add Obsidian plugin page]]
		- **Journal**
			- **Daily**
				- [[Daily Journal Template]]
				- [[Daily Work Journal Template]]
			- **Weekly**
				- [[Weekly Journal Template]]
				- [[Weekly Work Journal Template]]
			- **Yearly**
				- [[Yearly Journal Template]]
		- **Planning**
			- [[Project]]
			- **Projects**
				- [[Project boilerplate page]]
				- [[Project feature]]
				- [[Project meeting]]
				- [[Project note]]
				- [[Project setup meetings]]
				- [[Project setup notes]]
				- [[Project setup references]]
				- [[Project setup tasks]]
				- [[Project setup]]
				- [[Project task]]
		- [[Templater Startup script]]
		- **widgets**
			- [[Insert callout]]
			- [[Insert Gate at cursor]]
			- [[Insert TOC]]
			- [[Insert Y-M progressbar]]
	- **typing**

	- **views**
		- [[Sidebar Navigation]]
		- [[sortspec]]

%% End Waypoint %%