const API = (location.hostname === "127.0.0.1" || location.hostname === "localhost")
	? "http://127.0.0.1:8002/ask"
	: "/ask";

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

function renderMarkdown(md){
	const html = marked.parse(md, {gfm: true});
	const wrapper = document.createElement("div");
	wrapper.className = "markdown";
	wrapper.innerHTML = html;
	hljs.highlightAll();
	return wrapper;
}

function append(text, cls){
	const d = document.createElement("div");
	d.className = "msg " + cls;
	const mdEl = renderMarkdown(text);
	d.appendChild(mdEl);
	chat.appendChild(d);
	chat.scrollTop = chat.scrollHeight;
}

send.onclick = async () => {
	const t = input.value.trim();
	if(!t) return;
	append(escapeHtml(t), "user");
	input.value = "";
	append("Generating...", "bot");
	try{
		const resp = await fetch(API, {
			method: "POST",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({query: t})
		});
		const j = await resp.json();
		chat.lastChild.remove();
		if(j.answer_md){
			append(j.answer_md, "bot");
		} else {
			append("Error: " + (j.detail || "no answer"), "bot");
		}
	}catch(e){
		chat.lastChild.remove();
		append("Network error: " + e.message, "bot");
	}
}

function escapeHtml(s){
	return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

input.addEventListener("keydown", (e) => {
	if(e.key === "Enter" && !e.shiftKey){
		e.preventDefault();
		send.click();
	}
});