---
date_created: 2023-10-08 03:59:52
date_modified: 2023-10-11 16:53:55
include_in_navbar: false
obsidianUIMode: source
---
# Documentation

```dataviewjs
dv.view('toc')
```

## How to Set up

Visit [alangrainger and his obsidian-gtd](https://github.com/alangrainger/obsidian-gtd), he is the one that should have the cred.

## Next Actions

### What is a Next Action?

A "task" in GTD is more correctly termed a Next Action. A Next Action is "[the next visible physical activity required to move something forward](https://gettingthingsdone.com/2011/02/how-is-a-next-action-list-different-from-a-to-do-list/)". It may be part of a larger project, or it may be a single standalone item.

_"Buy a new car"_ is not a Next Action; it is a project which needs to be broken down into smaller component steps. The Next Action for that project might be to _"Spend 20 minutes researching the current safest car models."_

#### Why a "Next Action list" is so Critical Compared to a Task List

The reason that Next Actions are so critical in GTD is because of the mental load required when looking at a classic task list.

Have a read through this task list, written the way that most people write them:

##### The Standard Task List

1. Renovate the bathroom
1. Start a fitness blog
1. Plan company annual retreat
1. Do personal tax return
1. Launch 3 new products by January
1. Learn French
1. Plan surprise party for Bob

How do you feel when you look at that? Probably quite stressed out, and certainly very easy to procrastinate.

_Plan annual company retreat??_ Sounds awful and like a lot of work!

Compare the exact same list of projects, but written in a Next Actions style:

##### The Next Actions List

1. Stop at the hardware store on the way home, and take photos of different tap
options.
1. Brainstorm 3 ideas for my fitness blog title.
1. Ask Julie what the budget is for the annual retreat.
1. Download tax form 1040 from the IRS website.
1. Ring Adam in marketing and ask him to send through the new product
briefings.
1. Ask Anne what was the name of the French school she recommended.
1. Call the Bluestone Bar on 555-1234 and book for the 17th of July.

Ask Julie what the budget is for the annual retreat? Well that's easy - I could do that right now! Writing your tasks out like this is a brilliant way to cut procrastination and speed up your output.

### Master Task List

Your tasks from everywhere in your vault are collected into a single master task list: [[Planning/✅ Tasks|✅ Tasks]]. It is split up into five sections:

1. **⚠️ Projects without next actions**. Any project that shows up in this list needs you to go in and add "the next visible physical activity required to move the project forward" [(see GTD docs)](https://gettingthingsdone.com/2011/02/how-is-a-next-action-list-different-from-a-to-do-list/).
1. **🔼 Priority**. These are next actions that you have marked as priority.
1. **⏳ Waiting on**. Tasks which are waiting for someone else to take an action before you can move to the next step.
1. **✅ Next actions**. Every other actionable item that is not priority.
1. **💤 Someday**. A someday/maybe list is where you track anything that you might want to do "some day".

### Next Actions List

Add individual tasks in [[Planning/📝 Next actions list|📝 Next actions list]]

### Excluding Tasks

Sometimes you want to add tasks/todos that you don't want included in your master task list.

#### Exclude All Tasks in a Note

To exclude all tasks in a note from your master task list, add the tag #exclude-master-tasklist anywhere in the note.

#### Exclude Tasks under a Named Heading

There is a Habits header where I'm tracking the habits I want to do each day. I don't want these to show up in my master task list, so I have excluded it as "globalExclude" in [[System/scripts/dvViews/tasks.js]]

#### Exclude Tasks under a Heading via Tag #exclude

You can also exclude tasks under a heading by adding #exclude to that heading.

## Projects

### Creating a Project

Add the tag #project into any note and you're done - it's now a project.

### Master Projects List

You can find a list of all your projects in the [📑 Projects list](Planning/📑%20Projects%20list.md) page.

### Sequencing Tasks

Inside a project, by default tasks inside each heading block are treated as steps that need to be completed sequentially (i.e. each task is dependent on the one before). If you don't want that, you can include the 🟰 emoji anywhere in the heading for that section, and the tasks will be treated as if they are to be done in parallel.

## Sorting

### Priority

Pure GTD [doesn't make distinctions for priority](https://gettingthingsdone.com/2008/08/determining-priority-gtd-style/) in the context of your actions list, but it's nice to have a way to indicate what you should be working on first. In my Obsidian setup, there are no levels of priority, just a flag for "is priority" or not.

To mark any task as priority, add a 🔺 or ⏫ anywhere in the task text.

To mark a project as priority, add a #🔺 or #⏫ tag. All of the tasks in this project will be marked as priority automatically.

### Tags

Add the tag #waiting-on to the task. to task.

Add the tag #someday to the task.

## Clean-up/Archive Completed Tasks

If you have a lot of completed tasks on a page and want to archive them to a central location, there's a handy shortcut for that.

On any page press `Alt+T` and choose `Archive/Remove completed tasks`. This will move tasks from that page to the [🗄️ Completed tasks](Archive/🗄️%20Completed%20tasks.md) page. You'll need to set up the [Task menu template](Task%20menu%20template.md) for this to work.
