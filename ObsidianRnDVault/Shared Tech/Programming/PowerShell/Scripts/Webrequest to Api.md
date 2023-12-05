---
date_created: 2023-11-16 16:03:20
date_modified: 2023-12-05 18:15:58
tags:
  - Software/SharePoint
  - programming/PowerShell
---
# Webrequest to Api

## PowerShell Script to Make a Webrequest to a Sharepoint Server and Store the Response as XML File

```PowerShell
# User account details for the web request
$serviceAccountUsername = "domain\ServiceAccount"
$serviceAccountPassword = 'passwordPlaceholder'
$directoryServicePath = "LDAP://ldap.domain.com"
$searchFilter = "(cn=ServiceAccount)"

# SharePoint target and output file configuration
$sharepointUrl = "https://sharepointserver.domain.com/sitepath"
$listTitle = "SharePointListName"
$outputFilePath = "dataExport.xml"

# Constructing the API endpoint URL for the SharePoint list
$apiUrl = "$sharepointUrl/_api/web/lists/GetByTitle('$listTitle')/items"
$requestHeaders = @{
	"Accept" = "application/json;odata=verbose"
}

# Querying LDAP to verify the service account exists
(New-Object System.DirectoryServices.DirectorySearcher([ADSI]$directoryServicePath, $searchFilter)).FindOne().Properties

# Converting credentials to a secure format for the request
$secureServiceAccountPassword = ConvertTo-SecureString $serviceAccountPassword -AsPlainText -Force
$credentialObject = New-Object System.Management.Automation.PSCredential ($serviceAccountUsername, $secureServiceAccountPassword)

# Executing the web request to SharePoint
$webResponse = Invoke-WebRequest -Uri $apiUrl -Method Get -Headers $requestHeaders -Credential $credentialObject
$webResponse.Content

# Parsing and exporting the response data
$parsedItems = $webResponse.Content | ConvertFrom-Json | Select-Object -ExpandProperty d.results | Select-Object -Property Title, ID
$parsedItems | Export-Clixml -Path $outputFilePath

```
