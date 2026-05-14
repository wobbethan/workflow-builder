# Plugins

This directory contains optional features that extend the app’s functionality when they are included and enabled.

If you are looking for an adapter that connects them to the app, check out `@/features/plugins-core`.

## Plugins enabled in this repository

Every plugin listed in `apps/frontend/src/app/features/plugins-core/index.ts` is imported on startup. Each plugin under `apps/frontend/src/app/plugins/<name>/` includes a `plugin-exports.ts` or `plugin-exports.tsx` file so Vite resolves a real module (no “Fallback used for missing plugin…” for those paths).

Most optional plugins ship as **UI shells** (toolbar buttons, app-bar controls, or overflow menu rows). Interacting with a shell calls `globalThis.alert` with a not-yet-implemented message until you replace that plugin’s exports with real behavior.

Toolbar, overflow-menu, and right-hand app-bar **shell clusters** are registered together in `plugins/app-bar-plugin-shells` so icons stay in a single flex row and are not squeezed out by the header layout.

## Workflow Builder with plugins

https://app.workflowbuilder.io/

Here is the full version of the Workflow Builder with plugins (e.g., edges, layout, validation).

You can compare it with your local version.

## Main features of plugins

- Allows users to create plugins in the plugin directory and remove them without breaking the app
- Vite serves stubs only when an import in `plugins-core/index.ts` points at a path with **no** `plugin-exports` module (`plugin-exports.ts` / `plugin-exports.tsx`)
- ESLint warns users that they cannot import files directly from @/plugins and must use adapters
- Plugins can modify the base code, alter function inputs and outputs, add hooks, and customize prompts
- Plugins have an additional parameter priority, allowing the user to define which plugin should be applied first

## How plugins work?

If you want to see how the plugin logic works in a smaller example, we have prepared a showcase repository: https://github.com/synergycodes/optional-plugins-demo

## How to add plugin?

1. Create your plugin directory, for example: `plugins/example`.
2. Add your `<ExampleComponent />` to `plugins/example/components/example-component.tsx`.
3. In `plugins/example/plugin-exports.tsx` (or `.ts`) import dependencies and add:

```ts
registerComponentDecorator('OptionalFooterContent', {
  content: ExampleComponent,
  place: 'after',
});
```

4. Import your plugin to `apps/frontend/src/app/features/plugins-core/index.ts` with line `import '@/plugins/example/plugin-exports';`
5. Refresh the page.

Your component should now be displayed in the left sidebar (palette) footer.

### How to remove plugin?

Simply remove the import from `apps/frontend/src/app/features/plugins-core/index.ts` and delete the plugin folder if you no longer need it. If you keep the import, keep a `plugin-exports.ts` or `plugin-exports.tsx` (even empty) so the build does not fall back to the generic stub.

#### How to remove "Fallback used for missing plugin..."?

Go to `apps/frontend/src/app/features/plugins-core/index.ts` and remove the import there.

### How do I change the position of a plugin?

You have place and priority. Set place: 'before' to add your component before the content. The priority determines which plugin is shown first.

```ts
registerComponentDecorator('OptionalFooterContent', {
  content: ExampleComponent,
  place: 'after',
  priority: 1,
});
```

### How to modify properties with an optional plugin?

With the modifyProps property, you can change the properties passed to the plugin. For example, below we added a new label type dottedEdge to the diagram.

```tsx
type DiagramContainerProps = React.ComponentProps<typeof DiagramContainer>;

registerComponentDecorator<DiagramContainerProps>('DiagramContainer', {
  modifyProps: (props) => ({
    ...props,
    edgeTypes: {
      ...props.edgeTypes,
      dottedEdge: DottedEdge,
    },
  }),
});
```

### How to check if a plugin was added?

Set the `name` property for the injected content:

```tsx
registerComponentDecorator('OptionalAppBarControls', {
  content: TreeButton,
  place: 'before',
  name: 'TreeButton',
});
```

Use the `name` property:

```ts
const wasTreePluginAdded = hasRegisteredComponentDecorator('OptionalAppBarControls', 'TreeButton');
```

### How to add a plugin conditionally?

In your `plugin-exports.ts` or `plugin-exports.tsx` file, you can add an if statement.

```tsx
if (SHOULD_ADD_TREE_BUTTON === true) {
  registerComponentDecorator('OptionalAppBarControls', {
    content: TreeButton,
    place: 'before',
  });
}
```

### How to add a plugin conditionally if another plugin was added earlier?

Set `name` property.

```tsx
registerComponentDecorator('OptionalAppBarControls', {
  content: TreeButton,
  place: 'before',
  name: 'TreeButton',
});
```

Use `name` property.

```tsx
if (hasRegisteredComponentDecorator('OptionalAppBarControls', 'TreeButton')) {
  registerComponentDecorator('OptionalAppBarControls', {
    content: SecondTreeButton,
    place: 'before',
  });
}
```

The order in which plugins are imported in @features/plugins-core/index is important.
