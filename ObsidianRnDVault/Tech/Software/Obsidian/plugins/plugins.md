# plugins

```dataviewjs
const {VaultPlugins} = customJS;
let element = this.container.createEl('nav', {cls: ["tailwind"]});
let data = VaultPlugins.listInstalledPlugins(app, element);
console.log(await data);
```


