(()=>{"use strict";class e{constructor(e){console.log("CREATED TASK LIST 2!"),this.taskData=e,this.rootElement=document.createElement("div"),this.rootElement.classList.add("container","taskListContainer"),e.forEach((e=>{this.createCategoryTitle(e.categoryName),e.taskData.forEach((e=>{this.createRow(e[0],e[1])}))})),document.body.appendChild(this.rootElement)}createCategoryTitle(e){const t=document.createElement("div");t.classList.add("row");const o=document.createElement("div");o.classList.add("col","categoryTitleFont"),o.innerText=e,t.appendChild(o),this.rootElement.appendChild(t)}createRow(e,t){const o=document.createElement("div");o.classList.add("row");const a=document.createElement("div");a.classList.add("col");const s=document.createElement("div");s.classList.add("form-check");const c=document.createElement("input");c.classList.add("form-check-input","checkboxSize"),c.type="checkbox",c.value="",c.checked=t,c.id=e;const n=document.createElement("label");n.classList.add("form-check-label","formCheckLabel"),n.setAttribute("for",e),n.innerText=e,s.appendChild(c),s.appendChild(n),a.appendChild(s),o.appendChild(a),this.rootElement.appendChild(o),c.addEventListener("change",(()=>{this.taskData.forEach((t=>{t.taskData.forEach((t=>{t[0]===e&&(t[1]=c.checked)}))})),this.logRows(),this.sendDataToServer()}))}logRows(){console.log("Current Task List:"),this.taskData.forEach((e=>{console.log(`Category: ${e.categoryName}`),e.taskData.forEach((e=>{const[t,o]=e;console.log(`Task: ${t}, Completed: ${o}`)}))}))}sendDataToServer(){const e=JSON.stringify(this.taskData);console.log("Sending taskData:",e),fetch("/api/taskdata",{method:"POST",headers:{"Content-Type":"application/json"},body:e}).then((e=>{if(!e.ok)throw new Error("Failed to send data to server");console.log("Data sent to server successfully")})).catch((e=>{console.error("Error sending data to server:",e)}))}}(async function(){try{const e=await fetch("http://localhost:3000/api/data",{method:"GET",headers:{"Content-Type":"application/json"}});if(e.ok)return await e.json();throw new Error("Request failed.")}catch(e){throw console.error(e),e}})().then((t=>{new e(t),console.log(t)})).catch((e=>{console.error(e)}))})();