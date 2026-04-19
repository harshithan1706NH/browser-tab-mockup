var ARR_URL = [];
var ARR_URL_SLNO = [];
var ARR_URL_POINTER = [];
////var ARR_URL = [][];

let tabCounter = 0;

function createNewTab() {
  tabCounter++;
  const tabId = "tab" + tabCounter;

  // Create tab button
  const tabButton = document.createElement("div");
  tabButton.className = "tab";
  
  tabButton.textContent = "Tab " + tabCounter;
//  tabButton.textContent = "New Tab";
  
  tabButton.setAttribute("data-tab-id", tabId);
  
  let timestamp = Date.now();
  tabButton.setAttribute("data-uniqueid", timestamp);
  
  tabButton.onclick = function () {
	activateTab(tabId);
  };
  document.getElementById("tabButtons").appendChild(tabButton);

  // Clone from template

	const template = document.getElementById("contentTemplate");
	const clone = template.content.cloneNode(true);
	const content = clone.querySelector(".tabContent");
	content.id = tabId;

	content.dataset.uniqueid = timestamp;


	ARR_URL[timestamp] = [];
	ARR_URL_SLNO[timestamp] = 1;
	ARR_URL_POINTER[timestamp] = 1;


/*
  const template = document.getElementById("contentTemplate");
  const clone = template.content.cloneNode(true);
  const contentElement = clone.querySelector(".tabContent");
  contentElement.id = tabId;

  // Optionally customize inside the content (e.g. add tab number)
  const heading = contentElement.querySelector("h3");
  heading.textContent = "Tab " + tabCounter + " Content";
  document.getElementById("tabContents").appendChild(contentElement);

*/


  document.getElementById("tabContents").appendChild(content);
  activateTab(tabId);




}

function activateTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tabContent");

  for (let i = 0; i < tabs.length; i++) {
	tabs[i].classList.remove("active");
  }

  for (let i = 0; i < contents.length; i++) {
	contents[i].classList.remove("active");
  }

  const activeTab = document.querySelector('.tab[data-tab-id="' + tabId + '"]');
  const activeContent = document.getElementById(tabId);
  if (activeTab && activeContent) {
	activeTab.classList.add("active");
	activeContent.classList.add("active");
  }
}

// Initialize with 1 tab on load
window.onload = function () {
  createNewTab();
};





document.querySelectorAll('.CL_TXT_URL').forEach(input => {
  input.addEventListener('onkeypress', function () {
    fn_load_page(event, this);  // Pass the clicked button (this) to the function
  });
});








function fn_load_page(event, elem)
{
	if(event.keyCode === 13)
	{
		var url = elem.closest('.tabContent').querySelector('.CL_TXT_URL').value;
		
		elem.closest('.tabContent').querySelector('.CL_FRAME').src =   url;
		var uniqueid = elem.closest('.tabContent').dataset.uniqueid;

		var slno = ARR_URL_SLNO[uniqueid];
		slno++;

		ARR_URL[uniqueid][slno] = url;	
		
		ARR_URL_SLNO[uniqueid] = slno;
		
		ARR_URL_POINTER[uniqueid] = slno;
		
    }	
}


function fn_nav_back(elem)
{
	var uniqueid = elem.closest('.tabContent').dataset.uniqueid;

	var pointer = ARR_URL_POINTER[uniqueid]; 
	pointer = pointer - 1;
	
	if (pointer > 1)
		null;
	else
		pointer = 2;

	ARR_URL_POINTER[uniqueid] = pointer;
	
	var url = ARR_URL[uniqueid][pointer];

	elem.closest('.tabContent').querySelector('.CL_TXT_URL').value = url;
	
	elem.closest('.tabContent').querySelector('.CL_FRAME').src =   url;
}
function fn_nav_forward(elem)
{
	var uniqueid = elem.closest('.tabContent').dataset.uniqueid;

	var pointer = ARR_URL_POINTER[uniqueid]; 
	pointer = pointer + 1;

	var max_pointer = ARR_URL_SLNO[uniqueid];

	
	if (pointer <= max_pointer)
		null;
	else
		pointer = max_pointer;

	ARR_URL_POINTER[uniqueid] = pointer;
	
	var url = ARR_URL[uniqueid][pointer];
	
	elem.closest('.tabContent').querySelector('.CL_TXT_URL').value = url;
	
	elem.closest('.tabContent').querySelector('.CL_FRAME').src =   url;
}
function fn_nav_refresh(elem)
{
	var url = elem.closest('.tabContent').querySelector('.CL_TXT_URL').value;
	
	elem.closest('.tabContent').querySelector('.CL_FRAME').src =   url;
}
