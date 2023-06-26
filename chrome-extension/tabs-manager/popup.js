const tabs = await chrome.tabs.query({
    url: [
        "https://developer.chrome.com/docs/webstore/*",
        "https://developer.chrome.com/docs/extensions/*",
        "https://developer.mozilla.org/en-US/docs/Web/*"
    ],
});

const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();

for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);

    const classname = new URL(tab.url).host.slice("develiper.".length, -4);
    const pathname = new URL(tab.url).pathname.slice("/docs".length);
    const title = `${classname}: ${tab.title.split("-")[0].trim()}`;

    element.querySelector(".title").textContent = title;
    element.querySelector(".pathname").textContent = pathname;
    element.querySelector("a").addEventListener("click", async () => {
        // need to focus window as well as the active tab
        await chrome.tabs.update(tab.id, { active: true });
        await chrome.windows.update(tab.windowId, { focused: true });
    });
    element.classList.add(`${classname}`);

    elements.add(element);
}
document.querySelector("ul").append(...elements);

const button = document.querySelector("button");
button.addEventListener("click", async () => {
    let chromeIds = [];
    let mozillaIds = [];
    const tabIds = tabs.map(({ id }) => id);
    const tabNames = tabs.map(({ title }) => title);
    for (let i = 0; i < tabIds.length; i++) {
        if (tabNames[i].includes('Chrome')) {
            chromeIds.push(tabIds[i]);
        } else {
            mozillaIds.push(tabIds[i]);
        }
    }
    if (tabIds.length) {
        if (chromeIds.length != 0) {
            console.log("chromeIds > 0");
            const groupChrome = await chrome.tabs.group({ tabIds: chromeIds });
            await chrome.tabGroups.update(groupChrome, { 
                title: "CHROME",
                collapsed: true,
                color: "blue"
            });
        }
        if (mozillaIds.length != 0) {
            console.log("mozillaIds > 0");
            const groupMozilla = await chrome.tabs.group({ tabIds: mozillaIds });
            await chrome.tabGroups.update(groupMozilla, { 
                title: "MOZILLA",
                collapsed: true,
                color: "red"
            });
        }
    }
});