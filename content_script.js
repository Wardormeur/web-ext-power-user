// Put all the javascript code here, that you want to execute after page load.
function lookUp(el, depth) {
    var options = el.parentElement.querySelectorAll('option')
    if (options.length <= 0) options = el.parentElement.querySelectorAll('input[type="checkbox"]');
    if (options.length > 1) return options
    if (depth > 2) return [];
    return lookUp(el.parentElement, depth + 1)
}
browser.runtime.onMessage.addListener((message, sender) => {
    var el = browser.menus.getTargetElement(message.targetElementId);
    var options = lookUp(el, 0);
    switch (message.action) {
        case "selectDemAll.tickAll":
            if (options[0].tagName === "OPTION") {
                options.forEach((option) => {
                    option.selected = true;
                });
            } else if (options[0].tagName === "INPUT") {
                options.forEach((option) => {
                    option.checked = true;
                });
            }
            break;
        case "selectDemAll.inverseSelection":
            if (options[0].tagName === "OPTION") {
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
            break;
    }

    return Promise.resolve('done')
});