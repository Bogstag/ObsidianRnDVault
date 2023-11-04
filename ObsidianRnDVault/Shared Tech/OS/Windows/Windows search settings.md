---
date_created: 2023-11-03 13:44:48
date_modified: 2023-11-03 16:27:12
---
# Windows search Settings

_I get a feeling that this settings changes are useless and they are controlled from other sources._

## Commands

### Get-WindowsSearchSetting

Gets the values of settings for Windows Search.

```PowerShell
> Get-WindowsSearchSetting

Setting                        Value
-------                        -----
EnableWebResultsSetting        True
EnableMeteredWebResultsSetting True
SearchExperience               Personalized
WindowsSafeSearchSetting       Strict
```

#### Outputs

WindowsSearchSettingReturns the values of properties that control Windows Search:

- EnableWebResultsSetting. Whether Windows Search displays web results and suggestions.
- EnableMeteredWebResultsSetting. Whether Windows Search displays web results and suggestions while using a metered network.
- SearchExperienceSetting. The experience setting.
- WindowsSafeSearchSetting. The value of SafeSearch that Windows Search uses for queries.

SearchExperienceSetting has the following possible values:

- PersonalizedAndLocation. Personalize Windows Search and other Microsoft experiences by using search history, some Microsoft account information, and specific location of the user.
- Personalized. Personalize Windows Search and other Microsoft experiences by using search history and some Microsoft account information, but do not use specific location of the user.
- NotPersonalized. Do not personalize Windows Search and other Microsoft experiences or use specific location of the user.

WindowsSafeSearchSetting has the following possible values:

- Off. Windows Search does not remove adult content from results.
- Moderate. Windows Search excludes adult images and videos, but not text, from results.
- Strict. Windows Search excludes adult images, videos, and text from results.

## Set-WindowsSearchSetting

Modifies values that control Windows Search.

### Syntax

```PowerShell
Set-WindowsSearchSetting
   [-EnableWebResultsSetting <Boolean>]
   [-EnableMeteredWebResultsSetting <Boolean>]
   [-SearchExperienceSetting <String>]
   [-SafeSearchSetting <String>]
   [<CommonParameters>]
```

To change all the settings you need to run a series of commands because EnableMeteredWebResultsSetting, WindowsSafeSearchSetting and SearchExperience is dependent of EnableWebResultsSetting.

```PowerShell
> Get-WindowsSearchSetting

Setting                        Value
-------                        -----
EnableWebResultsSetting        True
EnableMeteredWebResultsSetting True
SearchExperience               Personalized
WindowsSafeSearchSetting       Strict

> Set-WindowsSearchSetting -EnableMeteredWebResultsSetting $False -SafeSearchSetting "Off" -SearchExperienceSetting "Personalized"
> Set-WindowsSearchSetting -EnableWebResultsSetting $False 
> Get-WindowsSearchSetting

 Setting                        Value
 -------                        -----
 EnableWebResultsSetting        False
 EnableMeteredWebResultsSetting False
 SearchExperience               Personalized
 WindowsSafeSearchSetting       Off
```
