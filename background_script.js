// Put all the javascript code here, that you want to execute in background.


function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}
let parentMenu = browser.contextMenus.create(
    {
        id: "selectDemAll",
        contexts: ["selection", "page"],
        enabled: false,
    },
    onCreated
);

let tickAllAction = browser.contextMenus.create(
    {
        id: "selectDemAll.tickAll",
        parentId: parentMenu.id,
        title: "Select/Tick all",
        contexts: ["selection", "page"],
    },
    onCreated
);
let inverseSelection = browser.contextMenus.create(
    {
        id: "selectDemAll.inverseSelection",
        parentId: parentMenu.id,
        title: "Reverse selected/ticked",
        contexts: ["selection", "page"],
    },
    onCreated
);

/*let tickAllButHovered = browser.contextMenus.create(
    {
        id: "selectDemAll.tickAllBut",
        parentId: parentMenu.id,
        title: "Tick all Except hovered",
        contexts: ["selection", "page"],
    },
    onCreated
);*/

browser.contextMenus.onClicked.addListener((info, tab) => {
    let el = browser.menus.getTargetElement(info.targetElementId);
    switch (info.menuItemId) {
        case "selectDemAll.tickAll":
            browser.tabs.sendMessage(tab.id, { action: 'selectDemAll.tickAll', targetElementId: info.targetElementId });
            break;
        case "selectDemAll.inverseSelection":
            browser.tabs.sendMessage(tab.id, { action: 'selectDemAll.inverseSelection', targetElementId: info.targetElementId });
            break;
    }
});
