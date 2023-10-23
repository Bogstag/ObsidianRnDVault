---
date_created: 2023-10-19 00:22:56
date_modified: 2023-10-19 00:25:54
---
# PSReadLine

[PSReadLine Module - PowerShell | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/psreadline/?view=powershell-7.3)

|   |   |
|---|---|
|[Get-PSReadLineKeyHandler](https://learn.microsoft.com/en-us/powershell/module/psreadline/get-psreadlinekeyhandler?view=powershell-7.3)|Gets the key bindings for the PSReadLine module.|
|[Get-PSReadLineOption](https://learn.microsoft.com/en-us/powershell/module/psreadline/get-psreadlineoption?view=powershell-7.3)|Gets values for the options that can be configured.|
|[PSConsoleHostReadLine](https://learn.microsoft.com/en-us/powershell/module/psreadline/psconsolehostreadline?view=powershell-7.3)|This function is the main entry point for PSReadLine.|
|[Remove-PSReadLineKeyHandler](https://learn.microsoft.com/en-us/powershell/module/psreadline/remove-psreadlinekeyhandler?view=powershell-7.3)|Removes a key binding.|
|[Set-PSReadLineKeyHandler](https://learn.microsoft.com/en-us/powershell/module/psreadline/set-psreadlinekeyhandler?view=powershell-7.3)|Binds keys to user-defined or PSReadLine key handler functions.|
|[Set-PSReadLineOption](https://learn.microsoft.com/en-us/powershell/module/psreadline/set-psreadlineoption?view=powershell-7.3)|Customizes the behavior of command line editing in **PSReadLine**.|

````powershell
# Install
Install-Module -Name PSReadLine -AllowClobber -Force	

# Settings
Get-PSReadLineOption
#Output
EditMode                               : Windows
AddToHistoryHandler                    : System.Func`2[System.String,System.Object]
HistoryNoDuplicates                    : True
HistorySavePath                        : C:\Users\{username}\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\Console
                                         Host_history.txt
HistorySaveStyle                       : SaveIncrementally
HistorySearchCaseSensitive             : False
HistorySearchCursorMovesToEnd          : False
MaximumHistoryCount                    : 4096
ContinuationPrompt                     : ∙
ExtraPromptLineCount                   : 1
PromptText                             :
BellStyle                              : None
DingDuration                           : 50
DingTone                               : 1221
CommandsToValidateScriptBlockArguments : {ForEach-Object, %, Invoke-Command, icm…}
CommandValidationHandler               :
CompletionQueryItems                   : 100
MaximumKillRingCount                   : 10
ShowToolTips                           : True
ViModeIndicator                        : Script
ViModeChangeHandler                    :
                                                     [Microsoft.PowerShell.PSConsoleReadLine]::InvokePrompt()

WordDelimiters                         : ;:,.[]{}()/\|!?^&*-=+'"–—―
AnsiEscapeTimeout                      : 100
PredictionSource                       : HistoryAndPlugin
PredictionViewStyle                    : InlineView
TerminateOrphanedConsoleApps           : False
CommandColor                           : "`e[93m"
CommentColor                           : "`e[32m"
ContinuationPromptColor                : "`e[37m"
DefaultTokenColor                      : "`e[37m"
EmphasisColor                          : "`e[96m"
ErrorColor                             : "`e[91m"
InlinePredictionColor                  : "`e[95m"
KeywordColor                           : "`e[92m"
ListPredictionColor                    : "`e[33m"
ListPredictionSelectedColor            : "`e[48;5;238m"
ListPredictionTooltipColor             : "`e[97;2;3m"
MemberColor                            : "`e[37m"
NumberColor                            : "`e[97m"
OperatorColor                          : "`e[90m"
ParameterColor                         : "`e[90m"
SelectionColor                         : "`e[30;47m"
StringColor                            : "`e[36m"
TypeColor                              : "`e[37m"
VariableColor                          : "`e[92m"
```
