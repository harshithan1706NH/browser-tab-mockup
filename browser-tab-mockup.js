var ARR_URL = [];
var ARR_URL_SLNO = [];
var ARR_URL_POINTER = [];

let tabCounter = 0;

function createNewTab() {
  tabCounter++;
  const tabId = "tab" + tabCounter;

  // Create tab button
  const tabButton = document.createElement("div");
  tabButton.className = "tab";
  tabButton.textContent = "Tab " + tabCounter;
  tabButton.setAttribute("data-tab-id", tabId);

  let timestamp = Date.now();
  tabButton.setAttribute("data-uniqueid", timestamp);

  tabButton.onclick = function () {
    activateTab(tabId);
  };

  document.getElementById("tabButtons").appendChild(tabButton);

  // Clone template
  const template = document.getElementById("contentTemplate");
  const clone = template.content.cloneNode(true);
  const content = clone.querySelector(".tabContent");

  content.id = tabId;
  content.dataset.uniqueid = timestamp;

  // init history arrays
  ARR_URL[timestamp] = [];
  ARR_URL_SLNO[timestamp] = 1;
  ARR_URL_POINTER[timestamp] = 1;

  document.getElementById("tabContents").appendChild(content);

  activateTab(tabId);
}

function activateTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tabContent");

  tabs.forEach(t => t.classList.remove("active"));
  contents.forEach(c => c.classList.remove("active"));

  const activeTab = document.querySelector('.tab[data-tab-id="' + tabId + '"]');
  const activeContent = document.getElementById(tabId);

  if (activeTab && activeContent) {
    activeTab.classList.add("active");
    activeContent.classList.add("active");
  }
}

// Load page on Enter key
function fn_load_page(event, elem) {
  if (event.key === "Enter") {

    const tabContent = elem.closest('.tabContent');
    const iframe = tabContent.querySelector('.CL_FRAME');

    const url = elem.value.trim();
    if (!url) return;

    iframe.src = url;

    const uniqueid = tabContent.dataset.uniqueid;

    let slno = ARR_URL_SLNO[uniqueid] || 1;
    slno++;

    if (!ARR_URL[uniqueid]) ARR_URL[uniqueid] = [];
    ARR_URL[uniqueid][slno] = url;

    ARR_URL_SLNO[uniqueid] = slno;
    ARR_URL_POINTER[uniqueid] = slno;
  }
}

function fn_nav_back(elem) {
  const tabContent = elem.closest('.tabContent');
  const uniqueid = tabContent.dataset.uniqueid;

  let pointer = ARR_URL_POINTER[uniqueid] || 1;
  pointer = pointer - 1;

  if (pointer < 1) pointer = 1;

  ARR_URL_POINTER[uniqueid] = pointer;

  const url = ARR_URL[uniqueid]?.[pointer];

  if (url) {
    tabContent.querySelector('.CL_TXT_URL').value = url;
    tabContent.querySelector('.CL_FRAME').src = url;
  }
}

function fn_nav_forward(elem) {
  const tabContent = elem.closest('.tabContent');
  const uniqueid = tabContent.dataset.uniqueid;

  let pointer = ARR_URL_POINTER[uniqueid] || 1;
  let max_pointer = ARR_URL_SLNO[uniqueid] || 1;

  pointer = pointer + 1;

  if (pointer > max_pointer) pointer = max_pointer;

  ARR_URL_POINTER[uniqueid] = pointer;

  const url = ARR_URL[uniqueid]?.[pointer];

  if (url) {
    tabContent.querySelector('.CL_TXT_URL').value = url;
    tabContent.querySelector('.CL_FRAME').src = url;
  }
}

function fn_nav_refresh(elem) {
  const tabContent = elem.closest('.tabContent');
  const url = tabContent.querySelector('.CL_TXT_URL').value;

  if (url) {
    tabContent.querySelector('.CL_FRAME').src = url;
  }
}

// Initialize first tab
window.onload = function () {
  createNewTab();
};
