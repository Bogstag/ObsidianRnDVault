---
date_created: 2023-10-14 16:21:29
date_modified: 2023-10-18 23:06:17
---
# Variables in PowerShell

## Variables

A variable is a unit of memory in which values are stored. In PowerShell, variables are represented by text strings that begin with a dollar sign (`$`), such as `$a`, `$process`, or `$my_var`.

There are several different types of variables in PowerShell.

- **User-created variables**: User-created variables are created and maintained by the user. By default, the variables that you create at the PowerShell command line exist only while the PowerShell window is open.
- **Automatic variables**: Automatic variables store the state of PowerShell. These variables are created by PowerShell, and PowerShell changes their values as required to maintain their accuracy. More? see [about_Automatic_Variables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_automatic_variables?view=powershell-7.3)
- **Preference variables**: Preference variables store user preferences for PowerShell. These variables are created by PowerShell and are populated with default values. Users can change the values of these variables. More? see [about_Preference_Variables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_preference_variables?view=powershell-7.3)

### Variable Cmdlets

Everything does what you think it does.

- Get-Variable: `Get-Variable t*` => true
- New-Variable: `New-Variable -Name "xy" -Value 255`
- Set-Variable: `Set-Variable -Name xy -Value "A description"`
- Remove-Variable: `Remove-Variable xy`
- Clear-Variable: `Clear-Variable xy`

### Variable Types

Most variables will be instances of the `PSVariable` class. Other variables and their types are listed below.

- The `?` variable is an instance of the `QuestionMarkVariable` class.
- The `null` variable is an instance of the `NullVariable` class.
- The maximum count variables are instances of the `SessionStateCapacityVariable` class.
- `LocalVariable` instances contain information about current execution, such as:
	- `MyInvocation`
	- `PSCommandPath`
	- `PSScriptRoot`
	- `PSBoundParameters`
	- `args`
	- `input`

### Variable Providers

The **Variable** provider exposes its data store in the `Variable:` drive. To work with variables, you can change your location to the `Variable:` drive (`Set-Location Variable:`), or you can work from any other PowerShell drive.

>[!example]- List of my current Variable: Variables
>
>```PowerShell
>Get-ChildItem -Path Variable:
># Clean Output Example
>PSDrive  Name                                    Directory
>-------  ----                                    ---------
>Variable ?                                       True
>Variable ^                                       Get-ChildItem
>Variable $                                       }
>Variable args
>Variable ConfirmPreference                       High
>Variable DebugPreference                         SilentlyContinue
>Variable ErrorActionPreference                   Continue
>Variable ErrorView                               ConciseView
>Variable false                                   False
>Variable FormatEnumerationLimit                  4
>Variable HOME                                    C:\Users\{username}
>Variable InformationPreference                   SilentlyContinue
>Variable input
>Variable IsCoreCLR                               True
>Variable IsLinux                                 False
>Variable IsMacOS                                 False
>Variable IsWindows                               True
>Variable LASTEXITCODE                            0
>Variable MaximumHistoryCount                     4096
>Variable NestedPromptLevel                       0
>Variable null
>Variable PID                                     28940
>Variable ProgressPreference                      Continue
>Variable PSCulture                               sv-SE
>Variable PSEdition                               Core
>Variable PSEmailServer
>Variable PSNativeCommandArgumentPassing          Windows
>Variable PSNativeCommandUseErrorActionPreference False
>Variable PSScriptRoot                            C:\Users\{username}\Documents\PowerShell
>Variable PSSessionApplicationName                wsman
>Variable PSStyle                                 System.Management.Automation.PSStyle
>Variable PSUICulture                             en-GB
>Variable PSVersionTable                          System.Management.Automation.PSVersionHashTable
>Variable PWD                                     C:\Users\{username}
>Variable true                                    True
>Variable VerbosePreference                       SilentlyContinue
>Variable WarningPreference                       Continue
>Variable WhatIfPreference                        False
>```

```powershell
# List
Get-ChildItem -Path Env:

# Get
$Env:UserDomain
$Env:ComputerName
$Env:$PROFILE

# Set
$MyVariable = 1, 2, 3
$Path = "C:\Windows\System32"
$Today = (Get-Date).DateTime

# Unset
Clear-Variable -Name MyVariable
$MyVariable = $null

# Remove
Remove-Variable -Name MyVariable
Remove-Item -Path Variable:\MyVariable

# Add path by Appending
$Env:Path += ';C:\Tools'

# Use in terminal
Set-Location $env:repos
Write-Output $PROFILE # PowerShell profile

# Using the System.Environment methods
[Environment]::GetEnvironmentVariable('Foo')
[Environment]::SetEnvironmentVariable('Foo','Bar')
[Environment]::SetEnvironmentVariable('Foo','') # Removes

```

## Environment Variables

Environment Variables can be used in PowerShell with the prefix `$env:`.

More on [[Shared Tech/OS/Windows/environment-variables|Environment Variables in Windows]]

```powershell
# List
Get-ChildItem -Path Env:

# Get
$Env:UserDomain
$Env:ComputerName
$Env:$PROFILE

# Set
$Env:<variable-name> = "<new-value>"

# Add path by Appending
$Env:Path += ';C:\Tools'

# Use in terminal
Set-Location $env:repos
Write-Output $PROFILE # PowerShell profile

# Using the System.Environment methods
[Environment]::GetEnvironmentVariable('Foo')
[Environment]::SetEnvironmentVariable('Foo','Bar')
[Environment]::SetEnvironmentVariable('Foo','') # Removes

```

>[!example]- List of my current Env Variables
>
>```PowerShell
>Get-ChildItem -Path Env: | Format-Table -Property PSDrive, Name, Value
># Clean Output Example
>PSDrive Name                       Directory
>------- ----                       ---------
>Env     ALLUSERSPROFILE            C:\ProgramData
>Env     APPDATA                    C:\Users\{username}\AppData\Roaming
>Env     CommonProgramFiles         C:\Program Files\Common Files
>Env     CommonProgramFiles(x86)    C:\Program Files (x86)\Common Files
>Env     CommonProgramW6432         C:\Program Files\Common Files
>Env     COMPUTERNAME               {computername}
>Env     ComSpec                    C:\WINDOWS\system32\cmd.exe
>Env     DriverData                 C:\Windows\System32\Drivers\DriverData
>Env     HOMEDRIVE                  C:
>Env     HOMEPATH                   \Users\{username}
>Env     LOCALAPPDATA               C:\Users\{username}\AppData\Local
>Env     LOGONSERVER                \\{computername}
>Env     NUMBER_OF_PROCESSORS       12
>Env     OneDrive                   C:\Users\{username}\OneDrive
>Env     OneDriveConsumer           C:\Users\{username}\OneDrive
>Env     OS                         Windows_NT
>Env     PROCESSOR_ARCHITECTURE     AMD64
>Env     PROCESSOR_LEVEL            6
>Env     PROCESSOR_REVISION         9a03
>Env     ProgramData                C:\ProgramData
>Env     ProgramFiles               C:\Program Files
>Env     ProgramFiles(x86)          C:\Program Files (x86)
>Env     ProgramW6432               C:\Program Files
>Env     PUBLIC                     C:\Users\Public
>Env     REPOS                      D:\repos
>Env     SESSIONNAME                Console
>Env     STARSHIP_CONFIG            C:\Users\{username}\.config\starship.toml
>Env     STARSHIP_SESSION_KEY       kWiOKBeGtynaw25N
>Env     STARSHIP_SHELL             pwsh
>Env     SystemDrive                C:
>Env     SystemRoot                 C:\WINDOWS
>Env     TEMP                       C:\Users\{username}\AppData\Local\Temp
>Env     TMP                        C:\Users\{username}\AppData\Local\Temp
>Env     USERDOMAIN                 {computername}
>Env     USERDOMAIN_ROAMINGPROFILE  {computername}
>Env     USERNAME                   {username}
>Env     USERPROFILE                C:\Users\{username}
>Env     VIRTUAL_ENV_DISABLE_PROMPT 1
>Env     windir                     C:\WINDOWS
>Env     WSLENV                     WT_SESSION:WT_PROFILE_ID:
>Env     WT_PROFILE_ID              {574e775e-4f2a-5b96-ac1e-a2962a402336}
>Env     WT_SESSION                 6c2c3364-5c61-4229-b889-3b37e4d792a6
>Env     ZES_ENABLE_SYSMAN          1
>```
