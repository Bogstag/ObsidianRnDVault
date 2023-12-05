---
date_created: 2023-10-05 09:00:00
date_modified: 2023-10-14 16:16509:47
tags:
  - programming/PowerShell
  - os/Windows
  - Software/Starship
  - os/ubuntu
---
# Setup PowerShell

PowerShell is a task automation and configuration management program from Microsoft, consisting of a command-line shell and the associated scripting language.

## Install PowerShell

PowerShell was made open-source and cross-platform with PowerShell Core, and can be installed on multiple operating systems.

### Windows

Use Scoop

```sh
scoop search pwsh
scoop info pwsh
```

### Linux (Ubuntu)

```sh
# Update the list of packages
sudo apt-get update
# Install pre-requisite packages.
sudo apt-get install -y wget apt-transport-https software-properties-common
# Download the Microsoft repository GPG keys
wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb
# Register the Microsoft repository GPG keys
sudo dpkg -i packages-microsoft-prod.deb
# Update the list of packages after we added packages.microsoft.com
sudo apt-get update
# Install PowerShell
sudo apt-get install -y powershell
# Start PowerShell
pwsh
```

## Profile

Set up a PowerShell Profile by opening the profile script :

```powershell
code $PROFILE
```

## (Optional) Set up Starship Prompt

You can customize the look and feel of PowerShell with the Starship Prompt ([[starship]]).
