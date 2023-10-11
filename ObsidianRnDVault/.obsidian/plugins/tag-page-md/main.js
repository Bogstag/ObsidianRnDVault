/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => TagPagePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/utils/obsidianApi.ts
var import_obsidian = require("obsidian");
var isTagPage = (app, tagPageFrontmatterKey, providedFile, tagOfInterest) => {
  var _a, _b, _c;
  const file = providedFile || ((_a = app.workspace.getActiveViewOfType(import_obsidian.MarkdownView)) == null ? void 0 : _a.file) || null;
  if (!file)
    return false;
  const frontmatterValue = (_c = (_b = app.metadataCache.getFileCache(file)) == null ? void 0 : _b.frontmatter) == null ? void 0 : _c[tagPageFrontmatterKey];
  if (tagOfInterest !== void 0) {
    return frontmatterValue === tagOfInterest;
  }
  return !!frontmatterValue;
};

// src/utils/tagSearch.ts
var isIndentationGreater = (line, threshold) => {
  return line.search(/\S/) > threshold;
};
var containsTag = (stringToSearch, tag) => stringToSearch.includes(tag);
var findSmallestUnitsContainingTag = (content, tag, excludeBullets = false) => {
  const escapedSubstring = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const exclusionPattern = excludeBullets ? "(?!\\s*- )" : "";
  const regex = new RegExp(
    `(?<=^|[
.!?])${exclusionPattern}[^.!?\\n]*?${escapedSubstring}[^.!?\\n]*?(?:[.!?\\n]|$)`,
    "gm"
  );
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[0].trim());
  }
  return matches.length > 0 ? matches : [];
};
var findBulletListsContainingTag = (content, tag) => {
  const capturedBulletLists = [];
  const fileLines = content.split("\n").filter((l) => l.trim() !== "");
  let capturingContent = false;
  let currentBulletIndentation = 0;
  let currentBulletContent = [];
  for (const line of fileLines) {
    const hasTag = containsTag(line, tag);
    if (!hasTag && !capturingContent)
      continue;
    const lineTrim = line.trim();
    const startsWithBullet = lineTrim.startsWith("- ");
    switch (true) {
      case (startsWithBullet && hasTag):
        capturingContent = true;
        currentBulletContent.push(lineTrim);
        currentBulletIndentation = line.search(/\S/);
        break;
      case (capturingContent && isIndentationGreater(line, currentBulletIndentation)):
        const indentationCharacters = line.substring(
          0,
          line.search(/\S/) - currentBulletIndentation
        );
        currentBulletContent.push(indentationCharacters + lineTrim);
        break;
      case capturingContent:
        capturedBulletLists.push(currentBulletContent.join("\n"));
        capturingContent = false;
        currentBulletContent = [];
        break;
    }
  }
  if (capturingContent)
    capturedBulletLists.push(currentBulletContent.join("\n"));
  return capturedBulletLists;
};
var processFile = async (vault, settings, file, tagOfInterest) => {
  const tagInfos = [];
  const fileContents = await vault.cachedRead(file);
  if (!containsTag(fileContents, tagOfInterest))
    return tagInfos;
  switch (true) {
    case (settings.bulletedSubItems && settings.includeLines):
      tagInfos.push({
        fileLink: `[[${file.basename}|*]]`,
        tagMatches: [
          ...findSmallestUnitsContainingTag(
            fileContents,
            tagOfInterest,
            true
          ),
          ...findBulletListsContainingTag(
            fileContents,
            tagOfInterest
          )
        ]
      });
      break;
    case (settings.bulletedSubItems && !settings.includeLines):
      tagInfos.push({
        fileLink: `[[${file.basename}|*]]`,
        tagMatches: findBulletListsContainingTag(
          fileContents,
          tagOfInterest
        )
      });
      break;
    case (!settings.bulletedSubItems && settings.includeLines):
    default:
      tagInfos.push({
        fileLink: `[[${file.basename}|*]]`,
        tagMatches: findSmallestUnitsContainingTag(
          fileContents,
          tagOfInterest,
          false
        )
      });
  }
  return tagInfos;
};
var fetchTagData = async (app, settings, tagOfInterest) => {
  const vault = app.vault;
  const allFiles = vault.getMarkdownFiles();
  return await Promise.all(
    allFiles.filter(
      (file) => !isTagPage(
        app,
        settings.frontmatterQueryProperty,
        file,
        tagOfInterest
      )
    ).map((file) => processFile(vault, settings, file, tagOfInterest))
  ).then((tagInfos) => tagInfos.flat());
};

// src/utils/pageContent.ts
var generateTagPageContent = async (app, settings, tagsInfo, tagOfInterest) => {
  const tagPageContent = [];
  tagPageContent.push(
    `---
${settings.frontmatterQueryProperty}: "${tagOfInterest}"
---`
  );
  tagPageContent.push(`## Tag Content for ${tagOfInterest}`);
  tagsInfo.forEach((tagInfo) => {
    tagInfo.tagMatches.forEach((tagMatch) => {
      if (tagMatch.trim().startsWith("-")) {
        const [firstBullet, ...bullets] = tagMatch.split("\n");
        const firstBulletWithLink = `${firstBullet} ${tagInfo.fileLink}`;
        tagPageContent.push(
          [firstBulletWithLink, ...bullets].join("\n").replace(
            tagOfInterest,
            `**${tagOfInterest.replace("#", "")}**`
          )
        );
      } else {
        tagPageContent.push(
          `- ${tagMatch} ${tagInfo.fileLink}`.replace(
            tagOfInterest,
            `**${tagOfInterest.replace("#", "")}**`
          )
        );
      }
    });
  });
  const filesWithFrontmatterTag = app.vault.getMarkdownFiles().filter((file) => {
    var _a, _b, _c;
    const metaMatter = (_a = app.metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter;
    return ((_b = metaMatter == null ? void 0 : metaMatter["tags"]) == null ? void 0 : _b.includes(tagOfInterest)) || ((_c = metaMatter == null ? void 0 : metaMatter["tags"]) == null ? void 0 : _c.includes(tagOfInterest.replace("#", "")));
  }).map((file) => `- [[${file.basename}]]`);
  if (filesWithFrontmatterTag.length > 0) {
    tagPageContent.push(`## Files with ${tagOfInterest} in frontmatter`);
    tagPageContent.push(...filesWithFrontmatterTag);
  }
  return tagPageContent.join("\n");
};
var extractFrontMatterTagValue = (app, view, frontMatterTag) => {
  var _a;
  if (view.file) {
    try {
      const metaMatter = (_a = app.metadataCache.getFileCache(view.file)) == null ? void 0 : _a.frontmatter;
      return metaMatter == null ? void 0 : metaMatter[frontMatterTag];
    } catch (err) {
      console.log(err);
      return;
    }
  }
};
var swapPageContent = (activeLeaf, newPageContent) => {
  var _a;
  (_a = activeLeaf == null ? void 0 : activeLeaf.currentMode) == null ? void 0 : _a.set(newPageContent, true);
};

// main.ts
var DEFAULT_SETTINGS = {
  tagPageDir: "Tags/",
  frontmatterQueryProperty: "tag-page-query",
  bulletedSubItems: true,
  includeLines: true,
  autoRefresh: true
};
var TagPagePlugin = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new TagPageSettingTab(this.app, this));
    this.ribbonIcon = this.addRibbonIcon(
      "tag-glyph",
      "Refresh tag page",
      () => {
        this.refreshTagPageContent();
      }
    );
    this.ribbonIcon.style.display = "none";
    this.addCommand({
      id: "create-tag-page",
      name: "Create Tag Page",
      callback: () => {
        new CreateTagPageModal(this.app, this).open();
      }
    });
    this.registerEvent(
      this.app.workspace.on("layout-change", () => {
        this.updateRibbonIconVisibility();
        this.autoRefreshTagPage();
      })
    );
    this.registerEvent(
      this.app.workspace.on("file-open", () => {
        this.updateRibbonIconVisibility();
        this.autoRefreshTagPage();
      })
    );
    this.updateRibbonIconVisibility();
    await this.autoRefreshTagPage();
  }
  updateRibbonIconVisibility() {
    this.ribbonIcon.style.display = isTagPage(
      this.app,
      this.settings.frontmatterQueryProperty
    ) ? "block" : "none";
  }
  async autoRefreshTagPage() {
    if (this.settings.autoRefresh && isTagPage(this.app, this.settings.frontmatterQueryProperty)) {
      await this.refreshTagPageContent();
    }
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    );
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  /**
   * Refreshes the content of the active tag page based on the current settings.
   *
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async refreshTagPageContent() {
    const activeLeaf = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (!activeLeaf)
      return;
    const tagOfInterest = extractFrontMatterTagValue(
      this.app,
      activeLeaf,
      this.settings.frontmatterQueryProperty
    );
    if (!tagOfInterest)
      return;
    const tagsInfo = await fetchTagData(
      this.app,
      this.settings,
      tagOfInterest
    );
    const tagPageContentString = await generateTagPageContent(
      this.app,
      this.settings,
      tagsInfo,
      tagOfInterest
    );
    swapPageContent(activeLeaf, tagPageContentString);
  }
  /**
   * Creates a new tag page or navigates to an existing one.
   *
   * @param {string} tag - The tag for which to create or navigate to a page.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  async createTagPage(tag) {
    const tagOfInterest = tag.startsWith("#") ? tag : `#${tag}`;
    const tagPage = this.app.vault.getAbstractFileByPath(
      `${this.settings.tagPageDir}${tagOfInterest}.md`
    );
    if (!tagPage) {
      const tagsInfo = await fetchTagData(
        this.app,
        this.settings,
        tagOfInterest
      );
      const tagPageContentString = await generateTagPageContent(
        this.app,
        this.settings,
        tagsInfo,
        tagOfInterest
      );
      const filename = `${tagOfInterest.replace("#", "")}_Tags.md`;
      const exists = await this.app.vault.adapter.exists(
        (0, import_obsidian2.normalizePath)(this.settings.tagPageDir)
      );
      if (!exists) {
        await this.app.vault.createFolder(this.settings.tagPageDir);
      }
      const createdPage = await this.app.vault.create(
        `${this.settings.tagPageDir}${filename}`,
        tagPageContentString
      );
      await this.app.workspace.getLeaf().openFile(createdPage);
    } else {
      await this.app.workspace.getLeaf().openFile(tagPage);
    }
  }
};
var CreateTagPageModal = class extends import_obsidian2.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.setText("Tag to create page for:");
    const tagForm = contentEl.createEl("form");
    contentEl.addClass("create-page-modal");
    const input = tagForm.createEl("input", { type: "text" });
    input.placeholder = "#tag";
    input.value = "#";
    input.addEventListener("keydown", (e) => {
      const cursorPosition = input.selectionStart;
      if (cursorPosition === 1 && (e.key === "Backspace" || e.key === "Delete")) {
        e.preventDefault();
      }
    });
    const submitButton = tagForm.createEl("button", { type: "submit" });
    submitButton.innerText = "Create Tag Page";
    tagForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const tag = input.value;
      this.contentEl.empty();
      this.contentEl.setText(`Creating tag page for ${tag}...`);
      await this.plugin.createTagPage(tag);
      this.close();
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var TagPageSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian2.Setting(containerEl).setName("Tag page directory").setDesc("The directory in which to create tag pages.").addText(
      (text) => text.setValue(this.plugin.settings.tagPageDir).onChange(async (value) => {
        if (!value.endsWith("/")) {
          value = `${value}/`;
        }
        this.plugin.settings.tagPageDir = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(containerEl).setName("Frontmatter query property").setDesc(
      "The frontmatter property to use storing the query tag within the tag page. Required for page refresh."
    ).addText(
      (text) => text.setValue(this.plugin.settings.frontmatterQueryProperty).onChange(async (value) => {
        this.plugin.settings.frontmatterQueryProperty = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(containerEl).setName("Include lines").setDesc("Include lines containing the tag in the tag page.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.includeLines).onChange(async (value) => {
        this.plugin.settings.includeLines = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(containerEl).setName("Bulleted sub-items").setDesc(
      "Include bulleted sub-items containing the tag in the tag page."
    ).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.bulletedSubItems).onChange(async (value) => {
        this.plugin.settings.bulletedSubItems = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(containerEl).setName("Auto refresh").setDesc(
      "Automatically refresh tag pages when they are opened or become active."
    ).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoRefresh).onChange(async (value) => {
        this.plugin.settings.autoRefresh = value;
        await this.plugin.saveSettings();
      })
    );
  }
};
