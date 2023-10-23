---
date_created: 2023-10-16 19:37:01
date_modified: 2023-10-16 19:43:14
---
# Snippets in VSCode

## PowerShell

Snippets for PowerShell

```json
{
	{
		"ArgumentCompleterAttribute": {
			"prefix": "argument-completer",
			"description": "Allows you to add tab completion values to a specific parameter by writing a script block that generates zero or more CompletionResult objects. More: Get-Help about_Functions_Argument_Completion",
			"body": [
				"[ArgumentCompleter({",
				"\t[OutputType([System.Management.Automation.CompletionResult])]",
				"\tparam(",
				"\t\t[string] \\$CommandName,",
				"\t\t[string] \\$ParameterName,",
				"\t\t[string] \\$WordToComplete,",
				"\t\t[System.Management.Automation.Language.CommandAst] \\$CommandAst,",
				"\t\t[System.Collections.IDictionary] \\$FakeBoundParameters",
				"\t)",
				"\t",
				"\t\\$CompletionResults = [System.Collections.Generic.List[System.Management.Automation.CompletionResult]]::new()",
				"\t",
				"\t${0:$TM_SELECTED_TEXT}",
				"\t",
				"\treturn \\$CompletionResults",
				"})]"
			]
		},
		"Calculated Property": {
			"prefix": "calculated-property",
			"description": "Typically used with Select-Object or Sort-Object. More: Get-Help about_Calculated_Properties",
			"body": [
				"@{Name='${1:PropertyName}';Expression={${2:${TM_SELECTED_TEXT:<# Desired result. You can reference this object via \\$_ and \\$PSItem #>}}}}$0"
			]
		},
		"Class": {
			"prefix": "class",
			"description": "A blueprint used to create instances of objects at run time. More: Get-Help about_Classes",
			"body": [
				"class ${1:ClassName} {",
				"\t${0:${TM_SELECTED_TEXT:<# Define the class. Try constructors, properties, or methods. #>}}",
				"}"
			]
		},
		"Class Constructor": {
			"prefix": [
				"ctor-class",
				"class-constructor"
			],
			"description": "Set default values and validate object logic at the moment of creating the instance of the class. Constructors have the same name as the class. Constructors might have arguments, to initialize the data members of the new object. More: Get-Help about_Classes",
			"body": [
				"${1:ClassName}(${2:<#OptionalParameters#>}) {",
				"\t${0:${TM_SELECTED_TEXT:<# Initialize the class. Use \\$this to reference the properties of the instance you are creating #>}}",
				"}"
			]
		},
		"Class Method": {
			"prefix": "class-method",
			"description": "Defines the actions that a class can perform. Methods may take parameters that provide input data. Methods can return output. Data returned by a method can be any defined data type. More: Get-Help about_Classes",
			"body": [
				"[${1:void}] ${2:MethodName}($${3:OptionalParameters}) {",
				"\t${0:${TM_SELECTED_TEXT:<# Action to perform. You can use $$this to reference the current instance of this class #>}}",
				"}"
			]
		},
		"Class Property": {
			"prefix": "class-property",
			"description": "Properties are variables declared at class scope. A property may be of any built-in type or an instance of another class. Classes have no restriction in the number of properties they have. More: Get-Help about_Classes",
			"body": [
				"[${1:propertyType}] $${0:PropertyName}"
			]
		},
		"Comment Block": {
			"prefix": [
				"block-comment"
			],
			"description": "A multi-line comment.",
			"body": [
				"$BLOCK_COMMENT_START",
				" # ${0:{$TM_SELECTED_TEXT:Enter a comment or description}}",
				"$BLOCK_COMMENT_END"
			]
		},
		"do-until": {
			"prefix": "do-until",
			"description": "Runs a statement list repeatedly until a condition is met More: Get-Help about_Do",
			"body": [
				"do {",
				"\t${0:$TM_SELECTED_TEXT}",
				"} until (",
				"\t${1:<# Condition that stops the loop if it returns true #>}",
				")"
			]
		},
		"do-while": {
			"prefix": "do-while",
			"description": "Runs a statement list repeatedly as long as a condition is met. More: Get-Help about_Do",
			"body": [
				"do {",
				"\t${0:$TM_SELECTED_TEXT}",
				"} while (",
				"\t${1:<# Condition that stops the loop if it returns false #>}",
				")"
			]
		},
		"else": {
			"prefix": "else",
			"description": "else defines what is done when all if and elseif conditions are false. More: Get-Help about_If",
			"body": [
				"else {",
				"\t${0:${TM_SELECTED_TEXT:<# Action when all if and elseif conditions are false #>}}",
				"}"
			]
		},
		"elseif": {
			"prefix": "elseif",
			"description": "elseif provides an alternative path when an if condition is false. More: Get-Help about_If",
			"body": [
				"elseif (${1:<#condition#>}) {",
				"\t${0:${TM_SELECTED_TEXT:<# Action when this condition is true #>}}",
				"}"
			]
		},
		"Enum": {
			"prefix": "enum",
			"description": "An enumeration is a distinct type that consists of a set of named labels called the enumerator list. More: Get-Help about_Enum",
			"body": [
				"enum ${1:<#EnumName#>} {",
				"\t${0:${TM_SELECTED_TEXT:<# Specify a list of distinct values #>}}",
				"}"
			]
		},
		"for": {
			"prefix": "for",
			"description": "Creates a loop that runs commands in a command block while a specified condition evaluates to $true. A typical use of the for loop is to iterate an array of values and to operate on a subset of these values. More: Get-Help about_For",
			"body": [
				"for ($${1:i} = 0; $${1:i} -lt $${2:array}.Count; $${1:i}++) {",
				"\t${0:${TM_SELECTED_TEXT:<# Action that will repeat until the condition is met #>}}",
				"}"
			]
		},
		"for-reversed": {
			"prefix": "forr",
			"description": "reversed for loop snippet",
			"body": [
				"for ($${1:i} = $${2:array}.Count - 1; $${1:i} -ge 0 ; $${1:i}--) {",
				"\t${0:${$TM_SELECTED_TEXT}}",
				"}"
			]
		},
		"foreach": {
			"prefix": "foreach",
			"description": "Iterate through a collection, assigning a variable to the current item on each loop rather than using the automatic variable $PSItem. More: Get-Help about_Foreach",
			"body": [
				"foreach ($${1:currentItemName} in $${2:collection}) {",
				"\t${0:${TM_SELECTED_TEXT:<# $${1} is the current item #>}}",
				"}"
			]
		},
		"foreach-item": {
			"prefix": "foreach-item",
			"description": "Quicker definition of foreach, just highlight the variable name of the collection you want to use and type 'item' then enter then tab. More: Get-Help about_Foreach",
			"body": [
				"foreach (${1/(.*)/$1Item/} in ${1:${TM_SELECTED_TEXT:collection}}) {",
				"\t${0:${1/(.*)/$1Item/}}",
				"}"
			]
		},
		"ForEach-Object -Parallel": {
			"prefix": "foreach-parallel",
			"description": "[PS 7+] Process multiple objects in parallel using runspaces. This has some limitations compared to a regular ForEach-Object. More: Get-Help ForEach-Object",
			"body": [
				"${1:\\$collection} | Foreach-Object -ThrottleLimit ${2:5} -Parallel {",
				"  ${0:${TM_SELECTED_TEXT:#Action that will run in Parallel. Reference the current object via \\$PSItem and bring in outside variables with \\$USING:varname}}",
				"}"
			]
		},
		"function": {
			"prefix": "function",
			"description": "A simple function with a parameter block to specify function arguments. More: Get-Help about_Functions",
			"body": [
				"function ${1:FunctionName} {",
				"\tparam (",
				"\t\t${2:OptionalParameters}",
				"\t)",
				"\t${0:$TM_SELECTED_TEXT}",
				"}"
			]
		},
		"Function Help": {
			"prefix": [
				"help-function",
				"comment-help"
			],
			"description": "Comment-based help for an advanced function. More: Get-Help about_Comment_Based_Help",
			"body": [
				"<#",
				".SYNOPSIS",
				"\t${1:A short one-line action-based description, e.g. 'Tests if a function is valid'}",
				".DESCRIPTION",
				"\t${2:A longer description of the function, its purpose, common use cases, etc.}",
				".NOTES",
				"\t${3:Information or caveats about the function e.g. 'This function is not supported in Linux'}",
				".LINK",
				"\t${4:Specify a URI to a help page, this will show when Get-Help -Online is used.}",
				".EXAMPLE",
				"\t${5:Test-MyTestFunction -Verbose}",
				"\t${6:Explanation of the function or its result. You can include multiple examples with additional .EXAMPLE lines}",
				"#>",
				"",
				"${0:$TM_SELECTED_TEXT}"
			]
		},
		"Function-Advanced": {
			"prefix": [
				"function-advanced",
				"cmdlet"
			],
			"description": "Script advanced function definition snippet. More: Get-Help about_Functions_Advanced",
			"body": [
				"function ${1:Verb-Noun} {",
				"\t[CmdletBinding()]",
				"\tparam (",
				"\t\t$0",
				"\t)",
				"\t",
				"\tbegin {",
				"\t\t",
				"\t}",
				"\t",
				"\tprocess {",
				"\t\t$TM_SELECTED_TEXT",
				"\t}",
				"\t",
				"\tend {",
				"\t\t",
				"\t}",
				"}"
			]
		},
		"Function-Inline": {
			"prefix": "function-inline",
			"description": "Function definition snippet that does not contain a param block, but defines parameters inline. This syntax is commonly used in other languages. More: Get-Help about_Functions",
			"body": [
				"function ${1:FunctionName} (${2:OptionalParameters}) {",
				"\t${0:$TM_SELECTED_TEXT}",
				"}"
			]
		},
		"Function: Suppress PSScriptAnalyzer Rule": {
			"prefix": [
				"suppress-message-rule-function",
				"[SuppressMessageAttribute]"
			],
			"description": "Suppress a PSScriptAnalyzer rule for a function. More: https://docs.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/overview?view=ps-modules#suppressing-rules",
			"body": [
				"[Diagnostics.CodeAnalysis.SuppressMessageAttribute(",
				"\t<#Category#>'${1:PSProvideDefaultParameterValue}', <#CheckId>\\$null, Scope='Function',",
				"\tJustification = '${0:${TM_SELECTED_TEXT:Reason for suppressing}}'",
				")]"
			]
		},
		"Hashtable": {
			"prefix": "hashtable",
			"description": "A key/value store that are very efficient for finding and retrieving data. More: Get-Help about_Hash_Tables",
			"body": [
				"\\$${1:Var} = @{",
				"\t${2:Name} = ${3:Value}",
				"}"
			]
		},
		"Here-String": {
			"prefix": [
				"hs",
				"here-string"
			],
			"description": "Escape all text but evaluate variables. More: Get-Help about_Quoting_Rules",
			"body": [
				"@\"",
				"${0:TM_SELECTED_TEXT}",
				"\"@",
				""
			]
		},
		"Here-String (Literal)": {
			"prefix": [
				"hsl",
				"literal-here-string"
			],
			"description": "Escape all text literally. More: Get-Help about_Quoting_Rules",
			"body": [
				"@'",
				"${0:TM_SELECTED_TEXT}",
				"'@",
				""
			]
		},
		"Hidden Property": {
			"prefix": "class-proph-hidden",
			"description": "Useful for creating internal properties and methods within a class that are hidden from users. More: Get-Help about_Hidden",
			"body": [
				"hidden [${1:string}] $${0:PropertyName}"
			]
		},
		"IArgumentCompleter Class": {
			"prefix": "iargument-completer",
			"description": "Implementation of the IArgumentCompleter interface that can be directly attached to parameters (e.g. [MyCustomArgumentCompleter]). More: Get-Help about_Functions_Argument_Completion",
			"body": [
				"class ${1:ArgumentCompleter} : System.Management.Automation.IArgumentCompleter {",
				"\t[System.Collections.Generic.IEnumerable[System.Management.Automation.CompletionResult]] CompleteArgument(",
				"\t\t[string] \\$CommandName,",
				"\t\t[string] \\$ParameterName,",
				"\t\t[string] \\$WordToComplete,",
				"\t\t[System.Management.Automation.Language.CommandAst] \\$CommandAst,",
				"\t\t[System.Collections.IDictionary] \\$FakeBoundParameters",
				"\t) {",
				"\t\t\\$CompletionResults = [System.Collections.Generic.List[System.Management.Automation.CompletionResult]]::new()",
				"\t\t",
				"\t\t${0:$TM_SELECTED_TEXT}",
				"\t\t",
				"\t\treturn \\$CompletionResults",
				"\t}",
				"}"
			]
		},
		"if": {
			"prefix": "if",
			"description": "Run code blocks if a specified conditional test evaluates to true. More: Get-Help about_If",
			"body": [
				"if (${1:condition}) {",
				"\t${0:${TM_SELECTED_TEXT:<# Action to perform if the condition is true #>}}",
				"}"
			]
		},
		"IfShouldProcess": {
			"prefix": "if-should-process",
			"description": "Defines a condition that only executes if -WhatIf is not set, and returns a message otherwise. More: https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-shouldprocess",
			"body": [
				"if (\\$PSCmdlet.ShouldProcess(\"${1:Target}\", \"${2:Operation}\")) {",
				"\t${0:$TM_SELECTED_TEXT}",
				"}"
			]
		},
		"ModuleManifest": {
			"prefix": "manifest",
			"description": "Basic skeleton for a PowerShell module manifest, complete with PowerShell Gallery metadata. More: https://docs.microsoft.com/en-us/powershell/scripting/developer/module/how-to-write-a-powershell-module-manifest",
			"body": [
				"@{",
				"\t# If authoring a script module, the RootModule is the name of your .psm1 file",
				"\tRootModule = '${module:MyModule}.psm1'",
				"",
				"\tAuthor = '${author:Cool Person <coolperson@email.local>}'",
				"",
				"\tCompanyName = '${company:Contoso Inc.}'",
				"",
				"\tModuleVersion = '${ModuleVersion:0.1}'",
				"",
				"\t# Use the New-Guid command to generate a GUID, and copy/paste into the next line",
				"\tGUID = '<pasteNewGUIDhere>'",
				"",
				"\tCopyright = '2017 ${company:Copyright Holder}'",
				"",
				"\tDescription = '${Description:What does this module do?}'",
				"",
				"\t# Minimum PowerShell version supported by this module (optional, recommended)",
				"\t# PowerShellVersion = ''",
				"",
				"\t# Which PowerShell Editions does this module work with? (Core, Desktop)",
				"\tCompatiblePSEditions = @('Desktop', 'Core')",
				"",
				"\t# Which PowerShell functions are exported from your module? (eg. Get-CoolObject)",
				"\tFunctionsToExport = @('')",
				"",
				"\t# Which PowerShell aliases are exported from your module? (eg. gco)",
				"\tAliasesToExport = @('')",
				"",
				"\t# Which PowerShell variables are exported from your module? (eg. Fruits, Vegetables)",
				"\tVariablesToExport = @('')",
				"",
				"\t# PowerShell Gallery: Define your module's metadata",
				"\tPrivateData = @{",
				"\t\tPSData = @{",
				"\t\t\t# What keywords represent your PowerShell module? (eg. cloud, tools, framework, vendor)",
				"\t\t\tTags = @('${tag1:cooltag1}', '${tag2:cooltag2}')",
				"",
				"\t\t\t# What software license is your code being released under? (see https://opensource.org/licenses)",
				"\t\t\tLicenseUri = ''",
				"",
				"\t\t\t# What is the URL to your project's website?",
				"\t\t\tProjectUri = ''",
				"",
				"\t\t\t# What is the URI to a custom icon file for your project? (optional)",
				"\t\t\tIconUri = ''",
				"",
				"\t\t\t# What new features, bug fixes, or deprecated features, are part of this release?",
				"\t\t\tReleaseNotes = @'",
				"'@",
				"\t\t}",
				"\t}",
				"",
				"\t# If your module supports updatable help, what is the URI to the help archive? (optional)",
				"\t# HelpInfoURI = ''",
				"}"
			]
		},
		"Parallel Pipeline Function": {
			"prefix": "function-parallel-pipeline",
			"description": "Collects everything in the process block and does work in the end block. Useful when making a 'fan out' function that acts on multiple items simultaneously because the pipeline only does one item at a time in the process block. More: Get-Help about_Functions_Advanced",
			"body": [
				"function $1 {",
				"  [CmdletBinding()]",
				"  param(",
				"    [parameter(ValueFromPipeline)]$$2",
				"  )",
				"",
				"  begin {",
				"    [Collections.ArrayList]\\$inputObjects = @()",
				"  }",
				"  process {",
				"    [void]\\$inputObjects.Add($$2)",
				"  }",
				"  end {",
				"    \\$inputObjects | Foreach -Parallel {",
				"      $0",
				"    }",
				"  }",
				"}"
			]
		},
		"Parameter": {
			"prefix": "parameter",
			"description": "A parameter definition for a method or function. More: Get-Help about_Functions",
			"body": [
				"# ${1:Parameter help description}",
				"[Parameter(${2:AttributeValues})]",
				"[${3:ParameterType}]",
				"$${0:ParameterName}"
			]
		},
		"Parameter_Block": {
			"prefix": "param-block-advanced-function",
			"description": "A parameter block for an advanced function. More: Get-Help about_Functions_Advanced",
			"body": [
				"[CmdletBinding()]",
				"param (",
				"    [Parameter()]",
				"    [${1:TypeName}]",
				"    $${2:ParameterName}$0",
				")"
			]
		},
		"Parameter-LiteralPath": {
			"prefix": "parameter-literalpath",
			"description": "Parameter declaration snippet for a LiteralPath parameter",
			"body": [
				"# Specifies a path to one or more locations. Unlike the Path parameter, the value of the LiteralPath parameter is",
				"# used exactly as it is typed. No characters are interpreted as wildcards. If the path includes escape characters,",
				"# enclose it in single quotation marks. Single quotation marks tell Windows PowerShell not to interpret any",
				"# characters as escape sequences.",
				"[Parameter(Mandatory=\\$true,",
				"           Position=${1:0},",
				"           ParameterSetName=\"${2:LiteralPath}\",",
				"           ValueFromPipelineByPropertyName=\\$true,",
				"           HelpMessage=\"Literal path to one or more locations.\")]",
				"[Alias(\"PSPath\")]",
				"[ValidateNotNullOrEmpty()]",
				"[string[]]",
				"$${2:LiteralPath}$0"
			]
		},
		"Parameter-Path": {
			"prefix": "parameter-path",
			"description": "Parameter declaration snippet for Path parameter that does not accept wildcards. Do not use with parameter-literalpath.",
			"body": [
				"# Specifies a path to one or more locations.",
				"[Parameter(Mandatory=\\$true,",
				"           Position=${1:0},",
				"           ParameterSetName=\"${2:ParameterSetName}\",",
				"           ValueFromPipeline=\\$true,",
				"           ValueFromPipelineByPropertyName=\\$true,",
				"           HelpMessage=\"Path to one or more locations.\")]",
				"[Alias(\"PSPath\")]",
				"[ValidateNotNullOrEmpty()]",
				"[string[]]",
				"$${3:ParameterName}$0"
			]
		},
		"Parameter-Path-Wildcards": {
			"prefix": "parameter-path-wildcards",
			"description": "Parameter declaration snippet for Path parameter that accepts wildcards. Add parameter-literalpath to handle paths with embedded wildcard chars.",
			"body": [
				"# Specifies a path to one or more locations. Wildcards are permitted.",
				"[Parameter(Mandatory=\\$true,",
				"           Position=${1:Position},",
				"           ParameterSetName=\"${2:ParameterSetName}\",",
				"           ValueFromPipeline=\\$true,",
				"           ValueFromPipelineByPropertyName=\\$true,",
				"           HelpMessage=\"Path to one or more locations.\")]",
				"[ValidateNotNullOrEmpty()]",
				"[SupportsWildcards()]",
				"[string[]]",
				"$${3:ParameterName}$0"
			]
		},
		"Parameter: Suppress PSScriptAnalyzer Rule": {
			"prefix": [
				"suppress-message-rule-parameter",
				"[SuppressMessageAttribute]"
			],
			"description": "Suppress a PSScriptAnalyzer rule on a parameter. More: https://docs.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/overview?view=ps-modules#suppressing-rules",
			"body": [
				"[Diagnostics.CodeAnalysis.SuppressMessageAttribute(<#Category#>'${1:PSUseDeclaredVarsMoreThanAssignments}',",
				"\t<#ParameterName#>'${0:${TM_SELECTED_TEXT:ParamName}}",
				"\tJustification = '${0:${TM_SELECTED_TEXT:Reason for suppressing}}'",
				")]"
			]
		},
		"Pipeline Function": {
			"prefix": "function-pipeline",
			"description": "Basic function that accepts pipeline input. More: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pipelines",
			"body": [
				"function $1 {",
				"  [CmdletBinding()]",
				"  param(",
				"    [parameter(ValueFromPipeline)]$2",
				"  )",
				"",
				"  process {",
				"    $0",
				"  }",
				"}"
			]
		},
		"PSCustomObject": {
			"prefix": [
				"pscustomobject",
				"[PSCustomObject]"
			],
			"description": "Create a custom object from a hashtable of properties. More: Get-Help about_PSCustomObject",
			"body": [
				"[PSCustomObject]@{",
				"\t${1:Name} = ${2:Value}",
				"}"
			]
		},
		"Region Block": {
			"prefix": "region",
			"description": "Region block for organizing and folding of your code",
			"body": [
				"#region ${1}",
				"${0:$TM_SELECTED_TEXT}",
				"#endregion"
			]
		},
		"Scope: Suppress PSScriptAnalyzer Rule": {
			"prefix": "suppress-message-rule-scope",
			"description": "Suppress a PSScriptAnalyzer rule based on a function/parameter/class/variable/object's name by setting the SuppressMessageAttribute's Target property to a regular expression or a glob pattern. More: https://docs.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/overview?view=ps-modules#suppressing-rules",
			"body": [
				"[Diagnostics.CodeAnalysis.SuppressMessageAttribute(",
				"\t<#Category#>'${1:PSUseDeclaredVarsMoreThanAssignments}', <#CheckId#>\\$null, Scope='Function',",
				"\tTarget='${1:${TM_SELECTED_TEXT:RegexOrGlobPatternToMatchName}}'",
				"\tJustification = '${0:Reason for suppressing}}'",
				")]"
			]
		},
		"splat": {
			"prefix": "splat",
			"description": "Use a hashtable to capture the parameters of a function and then pass them to a function in a concise way. More: Get-Help about_Splatting",
			"body": [
				"$${1/[^\\w]/_/}Params = @{",
				"\t${2:Parameter} = ${0:Value}",
				"}",
				"${1:${TM_SELECTED_TEXT}} @${1/[^\\w]/_/}Params"
			]
		},
		"Suppress PSScriptAnalyzer Rule": {
			"prefix": [
				"suppress-message-rule",
				"[SuppressMessageAttribute]"
			],
			"description": "Suppress a PSScriptAnalyzer rule. More: https://docs.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/overview?view=ps-modules#suppressing-rules",
			"body": [
				"[Diagnostics.CodeAnalysis.SuppressMessageAttribute(",
				"\t<#Category#>'${1:PSUseDeclaredVarsMoreThanAssignments}',<#CheckId#>\\$null,",
				"\tJustification = '${0:${TM_SELECTED_TEXT:Reason for suppressing}}'",
				")]"
			]
		},
		"switch": {
			"prefix": "switch",
			"description": "Equivalent to a series of if statements, but it is simpler. The switch statement lists each condition and an optional action. If a condition obtains, the action is performed. More: Get-Help about_Switch",
			"body": [
				"switch (${1:\\$x}) {",
				"\t${2:condition} { ${0:$TM_SELECTED_TEXT} }",
				"\tDefault {}",
				"}"
			]
		},
		"Ternary Operator": {
			"prefix": "ternary",
			"description": "[PS 7+] Simplified version of if-else popular in other languages that works in Powershell. More: Get-Help about_If",
			"body": [
				"(${1:${TM_SELECTED_TEXT:condition}}) ? $(${2:<#Action if True#>}) : $(${0:<#Action If False#>})"
			]
		},
		"try-catch": {
			"prefix": "try-catch",
			"description": "Attempt a block of code and if a terminating exception occurs, perform another block of code rather than terminate the program More: Get-Help about_Try_Catch_Finally",
			"body": [
				"try {",
				"\t${0:$TM_SELECTED_TEXT}",
				"}",
				"catch {",
				"\t${1:<#Do this if a terminating exception happens#>}",
				"}"
			]
		},
		"try-catch-finally": {
			"prefix": "try-catch-finally",
			"description": "Attempt a block of code and if a terminating exception occurs, perform another block of code, finally performing a final block of code regardless of the outcome. More: Get-Help about_Try_Catch_Finally",
			"body": [
				"try {",
				"\t${0:$TM_SELECTED_TEXT}",
				"}",
				"catch {",
				"\t${1:<#Do this if a terminating exception happens#>}",
				"}",
				"finally {",
				"\t${2:<#Do this after the try block regardless of whether an exception occurred or not#>}",
				"}"
			]
		},
		"try-finally": {
			"prefix": "try-finally",
			"description": "Attempt a block of code and perform an action regardless of the outcome. Useful for cleanup or gracefully disconnecting active sessions even if there was a terminating error. More: Get-Help about_Try_Catch_Finally",
			"body": [
				"try {",
				"\t${0:$TM_SELECTED_TEXT}",
				"}",
				"finally {",
				"\t${2:<#Do this after the try block regardless of whether an exception occurred or not#>}",
				"}"
			]
		},
		"while": {
			"prefix": "while",
			"description": "Repeatedly perform an action after verifying a condition is true first. More: Get-Help about_While",
			"body": [
				"while (${1:condition}) {",
				"\t${0:$TM_SELECTED_TEXT}",
				"}"
			]
		}
	}
}
```

## JavaScript

This is the javascript snippets that i use in VSCode.

```json
{
	"import": {
	  "prefix": "imp",
	  "body": "import ${2:moduleName} from '${1:module}';$0",
	  "description": "Imports entire module statement in ES6 syntax"
	},
	"importNoModuleName": {
	  "prefix": "imn",
	  "body": "import '${1:module}';$0",
	  "description": "Imports entire module in ES6 syntax without module name"
	},
	"importDestructing": {
	  "prefix": "imd",
	  "body": "import { $2 } from '${1:module}';$0",
	  "description": "Imports only a portion of the module in ES6 syntax"
	},
	"importEverything": {
	  "prefix": "ime",
	  "body": "import * as ${2:alias} from '${1:module}';$0",
	  "description": "Imports everything as alias from the module in ES6 syntax"
	},
	"importAs": {
	  "prefix": "ima",
	  "body": "import { ${2:originalName} as ${3:alias} } from '${1:module}';$0",
	  "description": "Imports a specific portion of the module by assigning a local alias in ES6 syntax"
	},
	"require": {
	  "prefix": "rqr",
	  "body": "require('${1:package}');",
	  "description": "Require a package"
	},
	"requireToConst": {
	  "prefix": "req",
	  "body": "const ${1:packageName} = require('${1:package}');$0",
	  "description": "Require a package to const"
	},
	"moduleExports": {
	  "prefix": "mde",
	  "body": "module.exports = {\n\t$0\n};\n",
	  "description": "Module exports from Common JS, node syntax at ES6"
	},
	"exportNamedVariable": {
	  "prefix": "env",
	  "body": "export const ${1:exportVariable} = ${2:localVariable};\n",
	  "description": "Export named variable in ES6 syntax"
	},
	"exportNamedFunction": {
	  "prefix": "enf",
	  "body": "export const ${1:functionName} = (${2:params}) => {\n\t$0\n};\n",
	  "description": "Export named function in ES6 syntax"
	},
	"exportDefaultFunction": {
	  "prefix": "edf",
	  "body": "export default function ${1:${TM_FILENAME_BASE}}(${2:params}) {\n\t$0\n};\n",
	  "description": "Export default function in ES6 syntax"
	},
	"exportClass": {
	  "prefix": "ecl",
	  "body": "export default class ${1:className} {\n\t$0\n};\n",
	  "description": "Export default class in ES6 syntax"
	},
	"exportClassExtends": {
	  "prefix": "ece",
	  "body": "export default class ${1:className} extends ${2:baseclassName} {\n\t$0\n};\n",
	  "description": "Export default class which extends a base one in ES6 syntax"
	},
  
	"constructor": {
	  "prefix": "con",
	  "body": "constructor(${1:params}) {\n\t${0}\n}",
	  "description": "Add default constructor in a class in ES6 syntax"
	},
	"method": {
	  "prefix": "met",
	  "body": "${1:methodName}(${2:params}) {\n\t${0}\n}",
	  "description": "Creates a method inside a class in ES6 syntax"
	},
	"propertyGet": {
	  "prefix": "pge",
	  "body": "get ${1:propertyName}() {\n\treturn this.${0};\n}",
	  "description": "Creates a getter property inside a class in ES6 syntax"
	},
	"propertyset": {
	  "prefix": "pse",
	  "body": "set ${1:propertyName}(${2:value}) {\n\t${0};\n}",
	  "description": "Creates a setter property inside a class in ES6 syntax"
	},
  
	"forEach": {
	  "prefix": "fre",
	  "body": "${1:array}.forEach(${2:currentItem} => {\n\t${0}\n});",
	  "description": "Creates a forEach statement in ES6 syntax"
	},
	"forOf": {
	  "prefix": "fof",
	  "body": "for (const ${1:item} of ${2:object}) {\n\t${0}\n}",
	  "description": "Iterating over property names of iterable objects"
	},
	"forIn": {
	  "prefix": "fin",
	  "body": "for (const ${1:item} in ${2:object}) {\n\t${0}\n}",
	  "description": "Iterating over property values of iterable objects"
	},
	"anonymousFunction": {
	  "prefix": "anfn",
	  "body": "(${1:params}) => {\n\t${2}\n}",
	  "description": "Creates an anonymous function in ES6 syntax"
	},
	"namedFunction": {
	  "prefix": "nfn",
	  "body": "const ${1:name} = (${2:params}) => {\n\t${3}\n}",
	  "description": "Creates a named function in ES6 syntax"
	},
	"destructingObject": {
	  "prefix": "dob",
	  "body": "const {${2:propertyName}} = ${1:objectToDestruct};",
	  "description": "Creates and assigns a local variable using object destructing"
	},
	"destructingArray": {
	  "prefix": "dar",
	  "body": "const [${2:propertyName}] = ${1:arrayToDestruct};",
	  "description": "Creates and assigns a local variable using array destructing"
	},
	"setInterval": {
	  "prefix": "sti",
	  "body": "setInterval(() => {\n\t${2}\n}, ${0:intervalInms});",
	  "description": "Executes the given function at specified intervals in ES6 syntax"
	},
	"setTimeOut": {
	  "prefix": "sto",
	  "body": "setTimeout(() => {\n\t${2}\n}, ${1:delayInms});",
	  "description": "Executes the given function after the specified delay in ES6 syntax"
	},
	"promise": {
	  "prefix": "prom",
	  "body": "return new Promise((resolve, reject) => {\n\t${1}\n});",
	  "description": "Creates and returns a new Promise in the standard ES6 syntax"
	},
	"thenCatch": {
	  "prefix": "thenc",
	  "body": ".then((${1:result}) => {\n\t${2}\n}).catch((${3:err}) => {\n\t${4}\n});",
	  "description": "Add the .then and .catch methods to handle promises"
	},
  
	"consoleAssert": {
	  "prefix": "cas",
	  "body": "console.assert(${1:expression}, ${2:object});",
	  "description": "If the specified expression is false, the message is written to the console along with a stack trace"
	},
	"consoleClear": {
	  "prefix": "ccl",
	  "body": "console.clear();",
	  "description": "Clears the console"
	},
	"consoleCount": {
	  "prefix": "cco",
	  "body": "console.count(${1:label});",
	  "description": "Writes the the number of times that count() has been invoked at the same line and with the same label"
	},
	  "consoleDebug": {
	  "prefix": "cdb",
	  "body": "console.debug(${1:object});",
	  "description": "Displays a message in the console. Also display a blue right arrow icon along with the logged message in Safari"
	},
	"consoleDir": {
	  "prefix": "cdi",
	  "body": "console.dir(${1:object});",
	  "description": "Prints a JavaScript representation of the specified object"
	},
	"consoleError": {
	  "prefix": "cer",
	  "body": "console.error(${1:object});",
	  "description": "Displays a message in the console and also includes a stack trace from where the method was called"
	},
	"consoleGroup": {
	  "prefix": "cgr",
	  "body": "console.group('${1:label}');",
	  "description": "Groups and indents all following output by an additional level, until console.groupEnd() is called."
	},
	"consoleGroupEnd": {
	  "prefix": "cge",
	  "body": "console.groupEnd();",
	  "description": "Closes out the corresponding console.group()."
	},
	"consoleLog": {
	  "prefix": "clg",
	  "body": "console.log(${1:object});",
	  "description": "Displays a message in the console"
	},
	"consoleLogObject": {
	  "prefix": "clo",
	  "body": "console.log('${1:object} :>> ', ${1:object});",
	  "description": "Displays an object in the console with its name"
	},
	"consoleTrace": {
	  "prefix": "ctr",
	  "body": "console.trace(${1:object});",
	  "description": "Prints a stack trace from the point where the method was called"
	},
	"consoleWarn": {
	  "prefix": "cwa",
	  "body": "console.warn(${1:object});",
	  "description": "Displays a message in the console but also displays a yellow warning icon along with the logged message"
	},
	"consoleInfo": {
	  "prefix": "cin",
	  "body": "console.info(${1:object});",
	  "description": "Displays a message in the console but also displays a blue information icon along with the logged message"
	},
	"consoleTable": {
	  "prefix": "clt",
	  "body": "console.table(${1:object});",
	  "description": "Displays tabular data as a table."
	},
	"consoleTime": {
	  "prefix": "cti",
	  "body": "console.time(${1:object});",
	  "description": "Sets starting point for execution time measurement"
	},
	"consoleTimeEnd": {
	  "prefix": "cte",
	  "body": "console.timeEnd(${1:object});",
	  "description": "Sets end point for execution time measurement"
	}
  }
```
