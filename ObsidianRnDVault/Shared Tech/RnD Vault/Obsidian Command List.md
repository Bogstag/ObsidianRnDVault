---
author: Matthias C. Hormann a.k.a. Moonbase59
date: 2021-06-26
date_created: 2023-09-30 17:09:12
date_modified: 2023-10-02 12:46:47
tags:
  - Software/Obsidian
  - commands
  - hotkeys
---
# Obsidian command list

## Assigned commands sorted by assigned keyboard shortcut

Commands with - as keyboard shortcuts, are default hotkeys removed by user.

```dataviewjs

const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

function hilite(keys, how) {
    // need to check if existing key combo is overridden by undefining it
    if (keys && keys[1][0] !== undefined) {
        return how + keys.flat(2).join('+').replace('Mod', 'Ctrl') + how;
    } else {
        return how + '–' + how;
    }
}

function getHotkey(arr, highlight=true) {
    let hi = highlight ? '**' : '';
    let defkeys = arr.hotkeys ? [[getNestedObject(arr.hotkeys, [0, 'modifiers'])],
    [getNestedObject(arr.hotkeys, [0, 'key'])]] : undefined;
    let ck = app.hotkeyManager.customKeys[arr.id];
    var hotkeys = ck ? [[getNestedObject(ck, [0, 'modifiers'])], [getNestedObject(ck, [0, 'key'])]] : undefined;
    return hotkeys ? hilite(hotkeys, hi) : hilite(defkeys, '');
}

let cmds = dv.array(Object.entries(app.commands.commands))
    .where(v => getHotkey(v[1]) != '–')
    .sort(v => v[1].id, 'asc')
    .sort(v => getHotkey(v[1], false), 'asc');

dv.paragraph(cmds.length + " commands with assigned hotkeys; " +
    "non-default hotkeys <strong>bolded</strong>.<br><br>");

dv.table(["Command ID", "Name in current locale", "Hotkeys"],
  cmds.map(v => [
    v[1].id,
    v[1].name,
    getHotkey(v[1]),
    ])
  );
```

## Commands sorted by command id

```dataviewjs

const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

function hilite(keys, how) {
    // need to check if existing key combo is overridden by undefining it
    if (keys && keys[1][0] !== undefined) {
        return how + keys.flat(2).join('+').replace('Mod', 'Ctrl') + how;
    } else {
        return how + '–' + how;
    }
}

function getHotkey(arr, highlight=true) {
    let hi = highlight ? '**' : '';
    let defkeys = arr.hotkeys ? [[getNestedObject(arr.hotkeys, [0, 'modifiers'])],
    [getNestedObject(arr.hotkeys, [0, 'key'])]] : undefined;
    let ck = app.hotkeyManager.customKeys[arr.id];
    var hotkeys = ck ? [[getNestedObject(ck, [0, 'modifiers'])], [getNestedObject(ck, [0, 'key'])]] : undefined;
    return hotkeys ? hilite(hotkeys, hi) : hilite(defkeys, '');
}

let cmds = dv.array(Object.entries(app.commands.commands))
    .sort(v => v[1].id, 'asc');

dv.paragraph(cmds.length + " commands currently enabled; " +
    "non-default hotkeys <strong>bolded</strong>.<br><br>");

dv.table(["Command ID", "Name in current locale", "Hotkeys"],
  cmds.map(v => [
    v[1].id,
    v[1].name,
    getHotkey(v[1]),
    ])
  );
```
