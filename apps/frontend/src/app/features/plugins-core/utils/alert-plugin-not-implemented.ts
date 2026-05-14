export function alertPluginNotImplemented(pluginDisplayName: string): void {
  globalThis.alert(`The "${pluginDisplayName}" plugin is not yet implemented.`);
}
