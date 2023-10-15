---
aliases: 
date_created: 2023-10-05 17:28:49
date_modified: 2023-10-05 17:56:08
dependsOnSoftware:
- [[Obsidian]]
description: Track your moods & emotions easily. Visualize tracked history and browse the past entries.
fileclass: plugin
id: mood-tracker
isDesktopOnly: false
name: Mood Tracker
tags:
  - 
template: [[Add Obsidian plugin page.md]]
version: 0.3.1
---
# Mood Tracker

Track your moods & emotions easily. Visualize tracked history and browse the past entries.

>[!help]- Docs
>
>```gate  
>https://dartungar.com
>height:700
>profile:obsidian
>```

>[!bug]- Repo
>
>```gate  
>https://dartungar.com
>height:700
>profile:obsidian
>```

## Translation

### Swedish setting

```json
	{
  "emotionSections": [
    {
      "name": "",
      "color": "#76de91",
      "emotions": [
        "glädjefull",
        "nöjd",
        "belåten",
        "tillfredsställd",
        "lycklig",
        "road",
        "förtjust",
        "glad",
        "gladlynt",
        "salig",
        "stolt",
        "triumferande",
        "optimistisk",
        "ivrig",
        "hoppfull",
        "entusiastisk",
        "uppspelt",
        "euforisk",
        "förtrollad",
        "kärleksfull",
        "romantisk",
        "öm",
        "passionerad",
        "attraherad",
        "sentimental",
        "medkännande",
        "fridfull",
        "lättad"
      ]
    },
    {
      "name": "",
      "color": "#f2d05e",
      "emotions": [
        "okej",
        "bra",
        "uttråkad",
        "överraskad",
        "chockad",
        "bestört",
        "förvirrad",
        "desillusionerad",
        "förbryllad",
        "förvånad",
        "förbluffad",
        "berörd",
        "rörd"
      ]
    },
    {
      "name": "",
      "color": "#f04a1d",
      "emotions": [
        "stressad",
        "arg",
        "rasande",
        "hatfull",
        "fientlig",
        "upprörd",
        "frustrerad",
        "irriterad",
        "störd",
        "förargad",
        "avundsjuk",
        "svartsjuk",
        "äcklad",
        "föraktfull"
      ]
    },
    {
      "name": "",
      "color": "#837ff0",
      "emotions": [
        "ledsen",
        "sårad",
        "plågsam",
        "deprimerad",
        "sorgsen",
        "besviken",
        "bestört",
        "missnöjd",
        "skamlig",
        "ångerfull",
        "skyldig",
        "förbisedd",
        "isolerad",
        "ensam",
        "förtvivlad",
        "sörjande",
        "maktlös",
        "rädd",
        "skrämd",
        "hjälplös",
        "förskräckt",
        "panikslagen",
        "hysterisk",
        "osäker",
        "underlägsen",
        "otillräcklig",
        "nervös",
        "ängslig",
        "oroad",
        "fruktansvärd",
        "förlägen"
      ]
    }
  ],
  "folderPath": "./System/Storage/",
  "moodRatingLabelDict": {
    "1": "😨",
    "2": "☹️",
    "3": "😐",
    "4": "🙂",
    "5": "😊"
  },
  "template": "- {{ICON}} {{NOTE}}"
}
```

### English setting

```json
	{
  "emotionSections": [
    {
      "name": "",
      "color": "#76de91",
      "emotions": [
        "joyful",
        "content",
        "pleased",
        "satisfied",
        "happy",
        "amused",
        "delighted",
        "cheerful",
        "jovial",
        "blissful",
        "proud",
        "triumphant",
        "optimistic",
        "eager",
        "hopeful",
        "enthusiastic",
        "excited",
        "euphoric",
        "enchanted",
        "loving",
        "romantic",
        "affectionate",
        "passionate",
        "attracted",
        "sentimental",
        "compassionate",
        "peaceful",
        "relieved"
      ]
    },
    {
      "name": "",
      "color": "#f2d05e",
      "emotions": [
        "ok",
        "fine",
        "bored",
        "surprised",
        "shocked",
        "dismayed",
        "confused",
        "disillusioned",
        "perplexed",
        "amazed",
        "astonished",
        "moved",
        "touched"
      ]
    },
    {
      "name": "",
      "color": "#f04a1d",
      "emotions": [
        "stressed",
        "angry",
        "enraged",
        "hateful",
        "hostile",
        "agitated",
        "frustrated",
        "irritated",
        "annoyed",
        "aggravated",
        "envious",
        "jealous",
        "disgusted",
        "contemptful "
      ]
    },
    {
      "name": "",
      "color": "#837ff0",
      "emotions": [
        "sad",
        "hurt",
        "agonizing",
        "depressed",
        "sorrowful",
        "disappointed",
        "dismayed",
        "displeased",
        "shameful",
        "regretful",
        "guilty",
        "neglected",
        "isolated",
        "lonely",
        "despaired",
        "grieving",
        "powerless",
        "fearful",
        "scared",
        "helpless",
        "frightened",
        "panicking",
        "hystetical",
        "insecure",
        "inferior",
        "inadequate",
        "nervous",
        "anxious",
        "worried",
        "dreadful",
        "mortified"
      ]
    }
  ],
  "folderPath": "./System/Storage/",
  "moodRatingLabelDict": {
    "1": "😨",
    "2": "☹️",
    "3": "😐",
    "4": "🙂",
    "5": "😊"
  },
  "template": "- {{ICON}} {{NOTE}}"
}
```

## Förenklad beskrivning av känslornas hjul

Absolut! Robert Plutchiks "känslornas hjul" är en teori som visualiserar känslor som åtta primära dikotomier (motsatser), och dessa kan kombineras för att skapa sekundära och tertiära känslor.

| Primär känsla   | Sekundär känsla (kombination)       | Tertiär känsla (kombination)          |
|-----------------|------------------------------------|----------------------------------------|
| Glädje          | Optimism (Glädje + Tillit)         | Kärlek (Optimism + Tillgivenhet)       |
| Tillit          | Kärlek (Tillit + Glädje)           | Tillgivenhet (Kärlek + Överraskning)   |
| Överraskning    | Förhoppning (Överraskning + Glädje)| Optimism (Förhoppning + Glädje)        |
| Förväntan       | Aggressivitet (Förväntan + Ilska)  | Dominans (Aggressivitet + Förakt)      |
| Ilska           | Förakt (Ilska + Förväntan)         | Aggressivitet (Förakt + Förväntan)     |
| Förakt          | Cynism (Förakt + Ilska)            | Dominans (Cynism + Ilska)              |
| Rädsla          | Undergivenhet (Rädsla + Ledsamhet) | Skrämsel (Undergivenhet + Ledsamhet)   |
| Ledsamhet       | Skrämsel (Ledsamhet + Rädsla)      | Undergivenhet (Skrämsel + Rädsla)      |

- Primär känsla: De åtta grundläggande känslorna enligt Plutchik.
- Sekundär känsla (kombination): Uppstår genom kombination av två primära känslor som ligger nära varandra i hjulet.
- Tertiär känsla (kombination): Uppstår genom kombination av en primär och en sekundär känsla.

Observera att detta är en förenklad tabell och att "känslornas hjul" i sin fulla form innehåller fler nyanser och kombinationer av känslor.
