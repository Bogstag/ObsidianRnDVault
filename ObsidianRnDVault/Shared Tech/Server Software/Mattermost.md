---
date_created: 2023-08-30 17:29:50
date_modified: 2023-10-16 11:12:39
---
# Mattermost

Links

- [Interact with channels (mattermost.com)](https://docs.mattermost.com/channels/interact-with-channels.html)
- [Custom commands (mattermost.com)](https://developers.mattermost.com/integrate/slash-commands/custom/)
- [Get started (mattermost.com)](https://developers.mattermost.com/integrate/getting-started/)
- [Using /jira commands - Jira Plugin (gitbook.io)](https://mattermost.gitbook.io/plugin-jira/end-user-guide/using-jira-commands)

## Matermost Jira Plugin

[Using /jira commands - Jira Plugin (gitbook.io)](https://mattermost.gitbook.io/plugin-jira/end-user-guide/using-jira-commands)

### Mattermost Jira Plugin - Slash Command Help

- `/jira connect [jiraURL]` - Connect your Mattermost account to your Jira account
- `/jira disconnect [jiraURL]` - Disconnect your Mattermost account from your Jira account
- `/jira [issue] assign [issue-key] [assignee]` - Change the assignee of a Jira issue
- `/jira [issue] create [text]` - Create a new Issue with 'text' inserted into the description field
- `/jira [issue] transition [issue-key] [state]` - Change the state of a Jira issue
- `/jira [issue] unassign [issue-key]` - Unassign the Jira issue
- `/jira [issue] view [issue-key]` - View the details of a specific Jira issue
- `/jira help` - Launch the Jira plugin command line help syntax
- `/jira info` - Display information about the current user and the Jira plug-in
- `/jira instance list` - List installed Jira instances
- `/jira instance settings [setting] [value]` - Update your user settings
		- [setting] can be `notifications`
		- [value] can be `on` or `off`
