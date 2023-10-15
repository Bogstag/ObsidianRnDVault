---
aliases: 
tags: 
modified: 2023-09-14 13:50:25
title: ELRRA Method
created: 2023-09-14 09:15:57
---
# ELRRA Method

I am trying to build something that is loosely based on the P.A.R.A Method. However, I need (want is probably the more correct word here) to change some names and add one folder.

![](https://fortelabs.com/wp-content/uploads/2017/02/3-BASB_Illos_Gray_211015_PARA-1024x537.jpg|400)

## The Methodology

The E.L.R.R.A.(M+) method is surprisingly simple at first glance but very powerful when applied, I hope.

1. Ego
1. Life
1. Responsibilities
1. Resources
1. Archive
1. (Meta) Folder to enable this system. Give Obsidian what it needs, so you can get what you want.

### Definition

1. Ego: From Latin ego ("I"). This is me and it's hard to understand and/or change.
	- Everything that is related to my inner life, conscious and subconscious. An effort to get to know me on a deeper level. Things I need to know about me and things I may want to change. Keeping tabs on me in the long term. It's too important and too fluffy that its own category is needed.
	- Long-term goals, self-reflection and understanding.
	- The name "Ego" might carry certain connotations for some people. An alternative could be "Self" or "Inner Life".
1. Life: Where Ego does things.
	- Efforts (in your work or personal life) that you take on with a certain goal in mind. For example:

	```js
let life_object = {
	"Complete webpage design": {
		goal: "Redesign the company website for better user experience.",
		tasks: [
			"Choose a color scheme",
			"Sketch initial design",
			"Gather user feedback",
			"Implement responsive design",
		],
		deadline: "30th September",
		resources: [
			"Design software",
			"Feedback from marketing team",
			"UI/UX best practices guide",
		],
	},
	"Buy a new computer": {
		goal: "Upgrade to a more powerful workstation for development tasks.",
		tasks: [
			"Research latest models",
			"Determine budget",
			"Check reviews",
			"Make purchase",
		],
		deadline: "15th October",
		resources: [
			"Tech review sites",
			"Budget spreadsheet",
			"Software compatibility list",
		],
	},
	"Write research report": {
		goal: "Complete and submit the research report for Q3 projects.",
		tasks: [
			"Gather data",
			"Analyze results",
			"Draft initial version",
			"Review and finalize",
		],
		deadline: "20th October",
		resources: [
			"Data visualization tools",
			"Previous reports",
			"Team feedback",
		],
	},
	"Renovate the bathroom": {
		goal: "Modernize the bathroom with new fixtures and design.",
		tasks: [
			"Choose a design",
			"Hire contractors",
			"Purchase materials",
			"Oversee work",
		],
		deadline: "10th November",
		resources: [
			"Interior design magazines",
			"Contractor recommendations",
			"Budget allocation",
		],
	},
	"Dance course": {
		goal: "Learn salsa dancing for the upcoming holiday party.",
		tasks: [
			"Enroll in a class",
			"Attend weekly sessions",
			"Practice at home",
			"Participate in group dances",
		],
		deadline: "5th December",
		resources: ["Dance shoes", "Tutorial videos", "Dance partner"],
	},
	"Set up new living room furniture": {
		goal: "Redesign the living room for better comfort and aesthetics.",
		tasks: [
			"Choose a theme",
			"Purchase furniture",
			"Decide layout",
			"Assemble and set up",
		],
		deadline: "25th November",
		resources: [
			"Interior design apps",
			"Furniture store catalogs",
			"Family opinions",
		],
	},
};
	```
	- If you have a project that requires notes or files, it should have a folder.
	- Since this folder is for this Life you are living _right now_, it's the most actionable and probably where you will spend most of your time.
	- Regularly archiving completed projects or tasks from the "Life" category can help keep it clean and focused. (or just stop adding things)
1. Responsibilities (Demands): Zone of responsibility with standards to uphold over long periods, parent, animals, friend, house.
	- Responsibilities are **the personal** bucket of your life for important things that don't have an end date and that require ongoing attention.
	- Responsibilities that were forced upon you or that you have taken on.
	- Demands that you want to lose or meet.
	- Finally, because they are personal, Responsibilities contain information you wrote for _yourself only_ about those Responsibilities in your Life. Which is opposite to 3. Resources.
1. Resources: Zone of interest for various topics that don't require standard/responsibility. For example:
	```js
let resources_object = {
	"Graphic design": {
		articles: ["Basics of Graphic Design", "Impact of Color in Design"],
		videos: ["Intro to Graphic Design", "Typography 101"],
		"personal notes": ["My thoughts on minimalism", "Favorite design tools"],
	},
	"Personal productivity": {
		articles: ["Boosting Daily Productivity", "Time Management Techniques"],
		videos: ["Productivity Hacks", "Efficient Task Management"],
		"personal notes": ["My daily routine", "Favorite productivity apps"],
	},
	"Organic gardening": {
		articles: ["Basics of Organic Gardening", "Natural Pest Control"],
		videos: ["Starting an Organic Garden", "Composting Essentials"],
		"personal notes": ["My gardening journey", "List of organic fertilizers"],
	},
	Coffee: {
		articles: ["History of Coffee", "Brewing the Perfect Cup"],
		videos: ["Coffee Bean Processing", "Latte Art Techniques"],
		"personal notes": ["My favorite coffee brands", "Best brewing methods"],
	},
	"Modern architecture": {
		articles: ["Evolution of Modern Architecture", "Famous Modern Architects"],
		videos: ["Intro to Modern Design", "Innovative Building Materials"],
		"personal notes": [
			"Architectural styles I love",
			"Dream home design ideas",
		],
	},
};
	```
	- It's more of a static thing and not a living thing. For example, if someone was to ask you for information about cooking, you could zip that folder and send it to them.
	- They are not always actual "resources" as in PDFs, pictures, etc. They can also be notes about those subjects but more factual, truthful and slowly changing.
	- The folders in there will very often reflect your various interests, knowledge and wisdom you have learned more about.
1. Archives: Where stuff from all the other categories become unused (finished project, change of responsibility, etc.)
	- This folder will be where you put things you won't need for a while, as the name suggests. For the most part, something in there won't be seen for a time, and that's why it has the lowest actionability. But sometimes a new project could use things in there or a change of Responsibilities might mean you need to get stuff out of there.
	- For example, if you have lots of notes on living with a pet in a small apartment and then move to a new bigger one, you could move all those to the archive. If one day you have to go back to a small apartment again take them out.
	```js
let archives_object = {
	"Completed Projects": [
		"Webpage design 2022",
		"Research report 2021",
		"Marketing campaign 2020",
		"Product launch 2019",
		"User feedback analysis 2018",
	],
	"Old Responsibilities": [
		"Pet care for Max (2010-2020)",
		"Weekly team meetings (2015-2019)",
		"Organizing annual company retreat (2017-2020)",
		"School committee chair (2016-2018)",
		"Neighborhood watch coordinator (2012-2015)",
	],
	"Outdated Resources": [
		"Web design 2010 trends",
		"SEO best practices 2009",
		"Top marketing strategies 2008",
		"Popular programming languages 2007",
		"E-commerce growth statistics 2006",
	],
};
	```
### Setup

The setup for it is pretty simple. Create root folders for each category. From there, move all of your current notes into `Archives` as is with the same existing hierarchy. Then create one folder for each of your current things you're working on in `Life` and one for `Ego`. For `Responsibilities`, if you already know some of them, you can create the folders already, but no empty folders (ok, but not empty for long). Finally, `Resources` should stay empty for now unless you already can take out something from `Archives`. The idea is that each time you go into `Archives` to take one of the "old" notes or files, you then move it to the right spot in the new taxonomy. Doing it this way will highlight the most used notes, and what's left behind can stay in Archive until it's finally used (or not).

#### Setup Guide:
1. Create root folders for each category: Ego, Life, Responsibilities, Resources, Archives.
1. Migrate current notes: Move all existing notes into the `Archives` folder, maintaining the current hierarchy.
1. Set up active projects: Create individual folders within the `Life` category for current projects/tasks.
1. Personal Reflection: Begin your self-reflection journey with a dedicated folder in the `Ego` category.
1. Identify Responsibilities: If you're aware of ongoing responsibilities, set up corresponding folders within the `Responsibilities` category.

However, some users might find this gradual approach a bit slow, especially if you looking for a note they know exists but hasn't been moved yet. As you engage with your notes, gradually move relevant items from `Archives` to the appropriate category. This approach ensures your most active and useful notes are at the forefront. However, if you prefer immediate organization, consider allocating time to categorize and move your archived notes to their respective folders.

Then setup so your vault gets synced to all your devices. Doing that will make it very quick and easy to find things you might need for work or something in the same zone across all your apps. For this reason, the more systems you integrate the taxonomy into, the easier finding things will be.

>[!NOTE] Syncthing
>Using Syncthing for synchronization is a great way to ensure that your notes are always up-to-date across devices. But it only my preferred choice, there are other alternatives.
>Utilize Syncthing to synchronize your note vault across all devices. This ensures seamless access regardless of where you are. If you're new to Syncthing, check out [this tutorial about Sync Mobile app through Syncthing](https://forum.obsidian.md/t/sync-mobile-app-through-syncthing-android-windows-10/29575). Don't forget to set up regular backups to safeguard your data.

Basically, when you die, your `Ego` folder gets stale and disappears with you. Your `Life` folder is what you dump in the `Archives` folder. Your `Responsibilities` folder can finally be deleted for good. Your `Resources` folder is your legacy.

Think of your `Resources` folder as your legacy. This is the knowledge, insights, and information you've gathered over a lifetime. Consider periodically reviewing and curating this folder, focusing on what you believe holds lasting value for you and others.

#### Setup tips
- When categorizing a note or file that fits multiple folders, prioritize by immediate relevance. Place it in the category where you anticipate its next use. Remember, this system is dynamic; notes can transition between categories based on their evolving relevance.
- It's possible to replicate sub-folder names across categories, but always with distinct contexts. Consider the 'Health' example:
	- `Ego/Health`: Pertains to your current health status, including known or unknown conditions.
	- `Life/Health`: Actions or projects you're undertaking related to health.
	- `Responsibilities/Health`: Motivations or reasons behind your health decisions.
	- `Resources/Health`: General knowledge and resources about health and all relevant to your need.
	- `Archives/Health`: Historical health records or outdated health information.
- Ensure that the context differentiates these similarly named sub-folders.
