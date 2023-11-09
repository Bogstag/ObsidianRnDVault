---
date_created: 2023-10-08 03:59:52
date_modified: 2023-10-14 22:35:52
is_active: true
---
# Progress bar Documentation

## The Result

### SVG

```xml
	<svg width="${tot.width}" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" 
		mlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
		<linearGradient id="a" x2="0" y2="100%">
			<stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
			<stop offset="1" stop-opacity=".1"/>
		</linearGradient>
		<rect rx="4" x="0" width="${tot.width}" height="20" fill="#${tF.title_color}"/>
		<rect rx="4" x="${tF.title_width}" width="${tF.progress_width}" height="20" fill="#555"/>
		<rect rx="4" x="${tF.title_width}" width="${tot.progress.width}" height="20" fill="${tF.progress_color}"/>
		${tF.title	? `<path fill="${tF.progress_color}" d="M${tF.title_width} 0h4v20h-4z"/>`	: ""}
		<rect rx="4" width="${tot.width}" height="20" fill="url(#a)"/>
		${tF.title	? `<g fill="#fff" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
		<text x="4" y="15" fill="#010101" fill-opacity=".3">${tF.title}</text>
		<text x="4" y="14">${tF.title}</text>
		</g>`	: ""	}<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
		<text x="${tot.%.text.bar}" y="15" fill="#010101" fill-opacity=".3">${tF.progress}${tF.suffix}</text>
		<text x="${tot.%.text.bar}" y="14">${tF.progress}${tF.suffix}</text>
		</g>
	</svg>
```

### Mockup

![[Attachments/Excalidraw/excalidraw/Drawing SVG ProgressBar Breakdown|600]]

## The Road to the Result

### SVG Värden Och Beräkningar

- Total längd default: 118
- Titel.bredd + progress.bredd
- progress.bredd defult varierande: 60 (width)
- Titel.bredd defult varierande: 58 (x)
- Summa: 118

#### Värden in

tF.title_width = 58
tF.progress_width = 60
tF.scale = 100
tF.progress = 0-100

#### Beräkningar

>[!multi-column]
>
>>[!summary]+ ${tot.bar.width}
>>tot.width = ${tF.title_width + tF.progress_width}
>>58 + 60 = 118
>
>>[!summary]+ ${tot.progress.width}
>>tot.progress.width = ${Math.min(tF.progress / tF.scale, 1) * tF.progress_width}
>>Width of total progress
>>
>>- Retunera det minsta värdet: Math.min(tF.progress / tF.scale, 1)
>>- Så vid 50 % progress och en skala på 100 = 50/100 = 0,5 Då retuneras 0,5 vidare.
>>- progress.width 60 = 60 * 0,5 = 30
>>- Så width 30 på rect 3.
>>- Det är den gula progress baren.
>
>>[!summary]+ ${tot.%.text.bar}
>>
>>${Math.floor(tF.progress_width / 2) + tF.title_width}
>>
>>- Avrunda nedåt: Math.floor(tF.progress_width / 2)
>>- Enligt tidigare exempel så blir detta: 60 / 2 = 30
>>- addera titel width: 30 + 58 = 88
>>- Så x = 88 på de två text rutorna längst ner. PRocent siffran står.

##### De Tre Rect

>[!multi-column]
>
>>[!example]+
>>
>>```html
>><rect rx="4" x="0" width="${tot.width}" height="20" fill="#${tF.title_color}"/>
>><rect rx="4" x="${tF.title_width}" width="${tF.progress_width}" height="20" fill="#555"/>
>><rect rx="4" x="${tF.title_width}" width="${tot.progress.width}" height="20" fill="${tF.progress_color}"/>
>>```
>>
>>![[Attachments/Images/ThreeColorsOfAProgressbar.png|300]]
>
>>[!Reason]+
>>- Den översta är den blåa färgen. (här rosa)
>>- Den är ${tot.width}(118) bredd. Dvs den täcker hela.
>>- Den andra är 58 width och har färgen grå på bilden.
>>- Den har width ${tF.progress_width}(60)
>>- Den har även ett x värde: ${tF.title_width}(58)
>>- Den tredje är den guldiga delen
>>- Den har en bredd: ${tot.progress.width}(30).
>>- X-värde på ${tF.title_width}(58)
>
>>[!summary]+
>>Summerar man det så borde det bli så här:
>>1. Blå (x:0, w:188), sträcker sig över hela
>>1. Guld (x:58, w:30), 0 är vänster hörnet och 58 till höger. Så börjar Guld stapeln där + 30. Så den slutar vid 88.
>>1. Grå (x:58, w:60), så den börjar på samma ställe som Guld + 60 så den slutar vid 118.

#### Info

##### Math.min

Math.min(value1, value2, /* …, */ valueN)'
Zero or more numbers among which the lowest value will be selected and returned.
