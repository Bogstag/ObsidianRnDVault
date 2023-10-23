---
date_created: 2023-10-16 01:12:43
date_modified: 2023-10-16 04:18:42
---
# Date and Time in PowerShell

Get-Date and PowerShell uses

```PowerShell
$date = Get-Date -Format "yyyy-MM-dd" # Date


```

`Get-Date` uses the **Format** parameter to specify several format specifiers. The format os in a .NET format. Read more here: [Custom date and time format strings - .NET | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings?view=netframework-4.8)

| Format | Description                                    |
| ------ | ---------------------------------------------- |
| yyyy   | The year as a four-digit number.               |
| MM     | The month, from 01 to 12.                      |
| dd     | The day of the month, from 01 to 31.           |
| hh     | The hour, using a 12-hour clock from 01 to 12. |
| mm     | The minute, from 00 to 59.                     |
| ss     | The second, from 00 to 59.                     |
| MMMM   | The full name of the month.                    |
| dddd   | The full name of the day of the week.          |
| K      | Time zone information.                         |
