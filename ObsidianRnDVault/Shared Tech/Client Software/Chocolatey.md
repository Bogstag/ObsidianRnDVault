---
date_created: 2023-10-15 03:15:49
date_modified: 2023-10-22 14:45:44
description: A guide to installing and using Chocolatey, a machine-level command-line package manager for Windows software.
tags:
  - Software/Chocolatey
  - Windows
  - Software
  - Package Manager
title: Chocolatey Package Manager for Windows
---
# Chocolatey

Chocolatey is a machine-level, command-line package manager and installer for Windows software. It allows users to easily install and manage software packages from a centralized location.

## Resources

For more information about Chocolatey, visit the [Chocolatey Homepage](https://chocolatey.org) or explore the [Chocolatey Software | Packages page](https://community.chocolatey.org/packages).

## Installation

To install Chocolatey on your Windows system, follow these steps:

1. Check the Execution Policy

	Before installing Chocolatey, you need to check the execution policy on your system. Run `Get-ExecutionPolicy` in an elevated PowerShell window. If it returns "Restricted", then run `Set-ExecutionPolicy AllSigned` or `Set-ExecutionPolicy Bypass -Scope Process`.

2. Install Chocolatey

	Once you have checked the execution policy, you can install Chocolatey using the following command in an elevated PowerShell window:

	```powershell
	Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
	```

	This command will download and run the Chocolatey installer script, which will install Chocolatey on your system.

3. Check if you installed Chocolatey

	After installing Chocolatey, you can check that it was installed correctly by running the following command in an elevated PowerShell window:

	```powershell
	choco -?
	```

	This command will display a list of available commands and options for Chocolatey.

## Installing Software Packages

Once Chocolatey is installed on your system, you can use it to install software packages. To do this, follow these steps:

1. Enable global confirmation

	Before installing a package using Chocolatey, you need to enable global confirmation. Run the following command in an elevated PowerShell window:

	```powershell
	choco feature enable -n allowGlobalConfirmation
	```

	This will enable global confirmation for all future package installations.

2. Install a package

	To install a package using Chocolatey, run the following command in an elevated PowerShell window:

	```powershell
	choco install <package>
	```

	Replace `<package>` with the name of the package you want to install. For example, to install Notepad++ and its plugin manager, you would run the following commands:

	```powershell
	choco install notepadplusplus.install
	choco install notepadplusplus-npppluginmanager
	```

3. Verify the installation

	After installing a package using Chocolatey, you can verify that it was installed correctly by running the following command in an elevated PowerShell window:

	```powershell
	choco list <package>
	```

	Replace `<package>` with the name of the package you installed. This will display information about the package, including its version number and installation date.
