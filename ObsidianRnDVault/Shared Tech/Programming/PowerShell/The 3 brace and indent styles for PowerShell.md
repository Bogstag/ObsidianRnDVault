---
date_created: 2023-10-15 22:12:23
date_modified: 2023-10-15 22:15:58
---
# The 3 Brace and Indent Styles for PowerShell

There are many styles regarding Brace and Indent, in PowerShell there are 3 main ones. They are listed here.

## BSD/Allman Style

The Allman style is named after Eric Allman, who wrote many of the BSD utilities. It puts braces on their own lines, indented to the same level as the control statement, and indents statements within the braces.

This style is the Visual Studio default indenting style for C# and is the standard for [dotnet](https://github.com/dotnet/corefx/blob/master/Documentation/coding-guidelines/coding-style.md), [PowerShell](https://github.com/PowerShell/PowerShell/blob/master/docs/dev-process/coding-guidelines.md), [asp.net](https://github.com/aspnet/Home/wiki/Engineering-guidelines#coding-guidelines), and basically, all Microsoft C# projects.

```PowerShell
enum Color
{
    Black,
    White
}

function Test-Code
{
    [CmdletBinding()]
    param
    (
        [int]$ParameterOne
    )
    end
    {
        if(10 -gt $ParameterOne)
        {
            "Greater"
        }
        else
        {
            "Lesser"    
        }
    }
}
```

## K&R/OTBS

K&R is named for Kernighan and Ritchie, who used it in their book _The C Programming Language_. According to Wikipedia it originated in Kernighan and Plauger's _The Elements of Programming Style and Software Tools_. It puts braces on the same line as control statements.

```PowerShell
enum Color {
    Black, 
    White
}

function Test-Code {
    [CmdletBinding()]
    param(
        [int]$ParameterOne
    )
    end {
        if (10 -gt $ParameterOne) {
            "Greater"
        } else {
            "Lesser"    
        }
    }
}
```

## Stroustroup

Named after Bjarne Stroustrup, who created it while writing his _Programming: Principles and Practice using C++_ and _The C++ Programming Language_, this style is a long time favorite of those who learned C++ as their first language. It is essentially a variant on K&R discussed earlier, with [some variations](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rl-knr): "else" blocks are placed on a new line. Unlike the OTBS variation, it follows K&R's suggestion that although the opening brace for a class and a struct are not on a separate line, for a function it is. It also allows skipping the braces for single line statements, but that's not allowed by PowerShell's parser.

```PowerShell
enum Color {
    Black,
    White
}

function Test-Code
{
    [CmdletBinding()]
    param(
        [int]$ParameterOne
    )
    end {
        if(10 -gt $ParameterOne) {
            "Greater"
        }
        else {
            "Lesser"    
        }
    }
}
```
