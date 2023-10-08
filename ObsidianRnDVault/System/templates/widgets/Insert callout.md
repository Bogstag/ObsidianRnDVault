---
fileclass: template
---
<%* tR = "" -%>
<%*
	// fileclass: template
	const callouts = {
	abstract: '🌐 📋 Abstract',
	attention: '🟠 ⚠ Attention',
	bug: '🔴 🐞 Bug',
	caution: '🟠 ⚠ Caution',
	caution: '🟠 ⚠️ Caution',
	check: '🟢 ✔ Check',
	cite: '🔘 💬 Cite',
	danger: '🔴 ⚡ Danger',
	done: '🟢 ✔ Done',
	done: '🟢 ✔ Done',
	error: '🔴⚡ Error',
	example: '🟣 📄 Example',
	failure: '🔴 ❌ Failure',
	faq: '🟡 ❓ FAQ',
	help: '🟡 ❓ Help',
	hint: '🌐 🔥 Hint',
	important: '🌐 🔥 Important',
	info: '🔵 ℹ Info',
	missing: '🔴 ❌ Missing',
	note: '🔵 🖋️ Note',
	question: '🟡 ❓ Question',
	quote: '🔘 💬 Quote',
	success: '🟢 ✔ Success',
	summary: '🌐 📋 Summary',
	tip: '🌐 🔥 Tip',
	tldr: '🌐 📋 TLDR',
	todo: '🔵 🔳 Todo',
	warning: '🟠 ⚠ Warning',
	};
	
	const type = await tp.system.suggester(Object.values(callouts), Object.keys(callouts), true, 'Select callout type.');
	const fold = await tp.system.suggester(['None', 'Expanded', 'Collapsed'], ['', '+', '-'], true, 'Select callout fold option.');
	
	const title = await tp.system.prompt('Title:', '', true);
	let content = await tp.system.prompt('Content (New line -> Shift + Enter):', '', true, true);
	content = content.split('\n').map(line => `> ${line}`).join('\n')
	
	const calloutHead = `> [!${type}]${fold} ${title}\n`;
	
	tR += calloutHead + content
-%>
