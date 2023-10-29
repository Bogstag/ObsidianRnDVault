---
aliases: []
date_created: 2023-09-16 02:55:13
date_modified: 2023-10-03 12:14:57
---
# Ontology mapping

## Property in use

| Property          | Role w property | Direction | "Target" |
| ----------------- | --------------- |:---------:| -------- |
| dependsOnSoftware | Child           |    ->     | Parent   |
| supports          | Parent          |    ->     | Child    |
| dependsOnScript   | Child           |    ->     | Parent   |
|                   |                 |           |          |

### The way of the arrow

1. Parent -> Child
	- The arrow points from the parent to the child, indicating the direction of the hierarchy or ownership.
	- E.g., "A folder contains files." would be represented as "Folder -> File"
	- Top -> Down

1. Left <-> Right
	 - These are typically peers or items at the same hierarchical level, so arrows can point in both directions, or you might use a bidirectional arrow.

1. Before -> After
	 - The arrow points from the "before" item to the "after" item, indicating the direction of time or sequence.
	 - E.g., "Task A must be completed before Task B." would be represented as "Task A -> Task B".

### Names parent child

1. hasPart / isPartOf
	- Example: "Computer hasPart CPU"
	- Inverse: "CPU isPartOf Computer"

1. hasChild / hasParent
	- Example: "Mary hasChild John"
	- Inverse: "John hasParent Mary"

1. owns / isOwnedBy
	- Example: "John owns Car"
	- Inverse: "Car isOwnedBy John"

1. produces / isProducedBy
	- Example: "Factory produces Product"
	- Inverse: "Product isProducedBy Factory"

1. livesIn / isHabitatOf
	- Example: "Lion livesIn Savanna"
	- Inverse: "Savanna isHabitatOf Lion"

1. contains / isContainedBy
	- Example: "Library contains Books"
	- Inverse: "Book isContainedBy Library"

1. worksFor / employs
	- Example: "Alice worksFor CompanyX"
	- Inverse: "CompanyX employs Alice"

1. hasAttribute / isAttributeOf
	- Example: "Product hasAttribute Color"
	- Inverse: "Color isAttributeOf Product"

1. isMadeOf / comprises
	- Example: "Cake isMadeOf Flour"
	- Inverse: "Flour comprises Cake"

1. locatedIn / locationOf
	- Example: "Building locatedIn City"
	- Inverse: "City locationOf Building"

1. precedes / followedBy
	- Example: "EventA precedes EventB"
	- Inverse: "EventB followedBy EventA"

1. isSiblingOf
	- Example: "Alice isSiblingOf Bob"

1. isFriendOf
	- Example: "Carol isFriendOf Dave"

1. uses / isUsedBy
	- Example: "Recipe uses Ingredient"
	- Inverse: "Ingredient isUsedBy Recipe"

### Names all directions

(Parent, Child, Left, Right, Before, After)

1. Parent / Child:
	- isParentOf / isChildOf
	- Example: "FolderA isParentOf FileX" (FolderA -> FileX)
	- Inverse: "FileX isChildOf FolderA" (FileX -> FolderA)

1. Left / Right:
	- isToLeftOf / isToRightOf
	- Example: "ItemA isToLeftOf ItemB" (ItemA -> ItemB)
	- Inverse: "ItemB isToRightOf ItemA" (ItemB -> ItemA)

1. Before / After:
	- comesBefore / comesAfter
	- Example: "Task1 comesBefore Task2" (Task1 -> Task2)
	- Inverse: "Task2 comesAfter Task1" (Task2 -> Task1)

1. Contains / ContainedBy:
	- contains / isContainedBy
	- Example: "Library contains Book1" (Library -> Book1)
	- Inverse: "Book1 isContainedBy Library" (Book1 -> Library)

1. AdjacentToLeft / AdjacentToRight:
	- isAdjacentToLeftOf / isAdjacentToRightOf
	- Example: "NodeA isAdjacentToLeftOf NodeB" (NodeA -> NodeB)
	- Inverse: "NodeB isAdjacentToRightOf NodeA" (NodeB -> NodeA)

1. PrecedesInSequence / FollowsInSequence:
	- precedesInSeq / followsInSeq
	- Example: "Step1 precedesInSeq Step2" (Step1 -> Step2)
	- Inverse: "Step2 followsInSeq Step1" (Step2 -> Step1)

1. HigherHierarchy / LowerHierarchy:
	- isAboveInHierarchy / isBelowInHierarchy
	- Example: "Tier1 isAboveInHierarchy Tier2" (Tier1 -> Tier2)
	- Inverse: "Tier2 isBelowInHierarchy Tier1" (Tier2 -> Tier1)

1. Supports / DependsOn:
	- supports / dependsOn
	- Example: "Base supports Layer1" (Base -> Layer1)
	- Inverse: "Layer1 dependsOn Base" (Layer1 -> Base)

1. Initiates / Concludes:
	- initiates / concludes
	- Example: "Intro initiates Content" (Intro -> Content)
	- Inverse: "Outro concludes Content" (Outro -> Content)

1. AssociatesWithLeft / AssociatesWithRight:
	- associatesToLeft / associatesToRight
	- Example: "Tag1 associatesToLeft Note1" (Tag1 -> Note1)
	- Inverse: "Tag2 associatesToRight Note2" (Tag2 -> Note2)

### Relations, mindless mapping

1. Parent/Parents:
	 - OS: Hardware (since an operating system runs on hardware)
	 - Server software, Client software: OS (they operate atop an OS)
	 - Database, API, VR, AI: Server software (often these are hosted or run on server environments, though they can also exist independently)
	 - Docker: OS (Docker runs atop an OS but can host other software components)
	 - source code: Any software component (since source code is the blueprint for building them)

1. Child/Children:
	 - OS: Applications, Utilities
	 - Docker: Containers (which can host APIs, databases, etc.)
	 - Database: Tables, Schemas
	 - Network: Connected devices, Protocols, IP Addresses

1. Friend/Friends (Left side):
	 - Client software: Users, Developers
	 - API: Developers, Client software (that uses the API)
	 - Database: Applications, Backend software
	 - Network: All other hardware and software that connects to it

1. Missing/Opposes (Right side):
	 - Hardware: Software (in the sense that hardware is physical and software is logical)
	 - OS: Malware, Viruses
	 - API: Non-compliant clients
	 - Network: Isolation, Offline mode

1. Before/Previous (Previous Friends):
	 - most software components: Their earlier versions or legacy systems.

1. After/Next (Next Friends):
	 - most software components: Their future versions, updates, or patches.

1. Parent:
	 - Hardware: The foundational physical component.
		 - Child: OS, Network
	 - OS: The interface between the hardware and software.
		 - Child: Docker, Server software, Client software, AI, VR, Shell, Scripts
	 - Server Software: Provides services or data.
		 - Child: Database, API (internal), Web (Backend)
	 - Client Software: Consumes services or data.
		 - Child: API (external), Web (Frontend), Plugin
	 - Docker: Containers applications and dependencies.
		 - Child: Any software component that's containerized.
	 - Source Code: The foundation for all software.
		 - Child: All software components, JavaScript, Python, Markdown
	 - Network: Allows communication.
		 - Child: All other components, given they need to communicate.
	 - Markdown: A language for text formatting.
		 - Child: Any rendered view of a markdown file.
	 - JavaScript: A programming language.
		 - Child: Web applications, Scripts, Plugins.
	 - Python: A programming language.
		 - Child: AI models, Scripts, Backend services.

1. Left:
	 - Database: Holds data.
		 - Right: Server software, API (to fetch data)
	 - API (external): Accessed by external clients.
		 - Right: Client software, Web (Frontend)
	 - API (internal): Used internally.
		 - Right: Server software, Web (Backend)
	 - JavaScript: Used mainly in frontend development.
		 - Right: Web (Frontend)
	 - Python: Used in various domains.
		 - Right: AI, Backend services, Scripts

1. Before:
	 - Source Code: The raw code.
		 - After: Any compiled or interpreted software, Docker (since Docker containers are often built from source code)
