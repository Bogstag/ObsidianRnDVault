---
aliases: []
date_created: 2023-09-14 03:25:44
date_modified: 2023-09-20 20:42:11
tags: []
---

# Date and Time formating

## Momentjs

```dataviewjs
dv.span("Now: " + moment()._d)
dv.span("<br>Locale: " + moment()._locale._abbr)
dv.span("<br>Date: " + moment().format("YYYY-MM-DD"))
dv.span("<br>Date Time: " + moment().format("YYYY-MM-DD HH:mm:ss"))
dv.span("<br>Date Time: " + moment().format("dddd, DD MMMM, YYYY"))
```

### Common format strings

Date: YYYY-MM-DD
Date Time: YYYY-MM-DD HH:mm:ss

### Common format tokens

[More momentjs formating](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/)

| Description              | Token | Output                  |
| ------------------------ | ----- | ----------------------- |
| Month                    | MM    | 01 02 ... 11 12         |
| Day of Month             | DD    | 01 02 ... 30 31         |
| **Day of Week**          | d     | 0 1 ... 5 6             |
| **Day of Week (Locale)** | e     | 0 1 ... 5 6             |
| **Day of Week (ISO)**    | E     | 1 2 ... 6 7             |
| **Week of Year (ISO)**   | W     | 1 2 ... 52 53           |
| Year                     | YYYY  | 1970 1971 ... 2029 2030 |
| Week Year                | gggg  | 1970 1971 ... 2029 2030 |
| Week Year (ISO)          | GGGG  | 1970 1971 ... 2029 2030 |
| Hour                     | HH    | 00 01 ... 22 23         |
| Minute                   | mm    | 00 01 ... 58 59         |
| Second                   | ss    | 00 01 ... 58 59         |

## Luxon

### Common format strings

Date: yyyy-MM-dd
Date Time: yyyy-MM-dd HH:mm

### Common format tokens

[More Luxon formating](https://moment.github.io/luxon/#/formatting)

| Standalone token | Format token | Description                         | Example |
| ---------------- | ------------ | ----------------------------------- | ------- |
| yyyy             |              | fourto sixdigit year, pads to 4 | 2014    |
| kkkk             |              | ISO week year, padded to 4          | 2014    |
| LL               | MM           | month as a padded number            | 08      |
| dd               |              | day of the month, padded to 2       | 06      |
| HH               |              | hour in 24-hour time, padded to 2   | 13      |
| mm               |              | minute, padded to 2                 | 07      |
| ss               |              | second, padded to 2 padding         | 04      |
