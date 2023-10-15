---
date_created: 2023-10-13 16:42:28
date_modified: 2023-10-13 16:43:29
---
# Time Measurement

```javascript  
const start = Date.now(); // Start  
  
const delta_ms = Date.now() - start; // milliseconds elapsed since start  
const delta_s = Math.floor(delta / 1000) // seconds elapsed since start
```
