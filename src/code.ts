figma.showUI(__html__);

figma.ui.resize(300, 350)

function toSnakeCase(str: string): string {
  return str.replace(/\s+/g, '_').toLowerCase();
}

figma.ui.onmessage = (msg) => {
  if (msg.type === 'rename-layers') {
    const selectedLayers = figma.currentPage.selection;
    const layerNames = msg.layerNames;
    const snakeCase = msg.snakeCase;

    if (selectedLayers.length !== layerNames.length) {
      figma.notify('Number of selected layers must match the number of names provided.');
      return;
    }

    for (let i = 0; i < selectedLayers.length; i++) {
      const layer = selectedLayers[i];
      let name = layerNames[i];
      if (snakeCase) {
        name = toSnakeCase(name);
      }
      layer.name = name;
    }

    figma.notify('Layers renamed successfully.');
    figma.closePlugin();
  }

  if (msg.type === 'change-descriptions') {
    const newDescription = msg.newDescription;
    const selectedComponents = figma.currentPage.selection;

    if (selectedComponents.length === 0) {
      figma.notify("No components selected.");
      return;
    }

    selectedComponents.forEach(component => {
      if ("description" in component) {
        component.description = newDescription;
      }
    });

    figma.notify(`Updated descriptions for ${selectedComponents.length} components.`);
    figma.closePlugin();
  }
};
