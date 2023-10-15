---
date_created: 2023-10-14 16:19:51
date_modified: 2023-10-14 16:21:04
---
# Profiles in PowerShell

The `$PROFILE` automatic variable stores the paths to the PowerShell profiles that are available in the current session.

The `$PROFILE` variable has the following values in the Windows PowerShell console.

- Current User, Current Host - `$PROFILE`
- Current User, Current Host - `$PROFILE.CurrentUserCurrentHost`
- Current User, All Hosts - `$PROFILE.CurrentUserAllHosts`
- All Users, Current Host - `$PROFILE.AllUsersCurrentHost`
- All Users, All Hosts - `$PROFILE.AllUsersAllHosts`

```PowerShell
$PROFILE

# Current values of the $PROFILE
$PROFILE | Select-Object *

# Check if profile exists
Test-Path -Path $PROFILE.CurrentUserAllHosts

# Create new profile
if (!(Test-Path -Path $PROFILE.CurrentUserAllHosts)) {
  New-Item -ItemType File -Path $PROFILE.CurrentUserAllHosts -Force
}

# Start PowerShell without profile
pwsh -NoProfile

# For a complete list of the parameters
pwsh -?
```
