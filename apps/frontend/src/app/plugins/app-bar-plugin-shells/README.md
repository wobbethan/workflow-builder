# App bar plugin shells

Registers a **single** `OptionalAppBarTools` row (undo/redo, copy/paste) and a **single** `OptionalAppBarControls` cluster (ELK auto layout and change layout direction), plus an overflow menu entry for diagram validation.

Keeping these in one module avoids layout issues from many sibling injectors next to the save control and fixes plugin-registry deduplication for named entries.

When you implement a real plugin, remove the matching controls from here and register them from that plugin’s `plugin-exports` instead.
