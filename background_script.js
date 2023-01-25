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
            browser.tabs.executeScript(tab.id, {
                frameId: info.frameId,
                code: `var el = browser.menus.getTargetElement(${info.targetElementId});
                    var options = lookUp(el, 0)
                    if(options[0].tagName === "OPTION") {
                        options.forEach((option) => {
                            option.selected = true;
                        });
                    } else if (options[0].tagName === "INPUT") {
                        options.forEach((option) => {
                            option.checked = true;
                        });
                    }
                    
                    function lookUp(el, depth) {
                        var options = el.parentElement.querySelectorAll('option')
                        if (options.length <= 0) options = el.parentElement.querySelectorAll('input[type="checkbox"]');
                        if (options.length > 1) return options
                        if (depth> 2) return [];
                        return lookUp(el.parentElement, depth+1)
                    }
                `,
              });
            break;
        case "selectDemAll.inverseSelection":
            browser.tabs.executeScript(tab.id, {
                frameId: info.frameId,
                code: `var el = browser.menus.getTargetElement(${info.targetElementId});
                    var options = lookUp(el, 0)
                    if(options[0].tagName === "OPTION") {
                        options.forEach((option) => {
                            if (option.selected) {
                                option.selected = false;
                            } else {
                                option.selected = true;
                            }
                        });
                    } else if (options[0].tagName === "INPUT") {
                        options.forEach((option) => {
                            if (option.checked) {
                                option.checked = false;
                            } else {
                                option.checked = true;
                            }

                        });
                    }
                    
                    function lookUp(el, depth) {
                        var options = el.parentElement.querySelectorAll('option')
                        if (options.length <= 0) options = el.parentElement.querySelectorAll('input[type="checkbox"]');
                        if (options.length > 1) return options
                        if (depth> 2) return [];
                        return lookUp(el.parentElement, depth+1)
                    }
                `,
                });
            break;
    }
});
