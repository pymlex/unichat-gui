# UniChat GUI 

<img width="960" height="412" alt="Снимок экрана (621)" src="https://github.com/user-attachments/assets/1ae222da-df58-4692-be44-58c4ce2cf106" />

A static single-page frontend that communicates with the orchestrator (`/ask`) and displays the LLM-generated Markdown output (tables, code blocks with highlighting). Includes basic saved-translations UI (localStorage) with CSV / PDF export and a Stop button that calls `/stop` on the orchestrator.

---

## Features

* Renders GFM Markdown (tables, lists, code blocks) using `marked` and `highlight.js`.
* UI: chat area, input and a send button.
* Theme: dark palette; responsive layout for desktop.

## Repo structure

```
.
├── .gitignore
├── Dockerfile
├── requirements.txt
├── setup.bat
├── app/
│   ├── main.py
│   └── server.py
└── static/
    ├── index.html
    ├── client.js
    ├── styles.css
    └── vendor libs via CDN (highlight.js, jspdf)
```

---

## Installation & run

For Windows users:

```bash
git clone https://github.com/youruser/unichat-gui.git
cd unichat-gui
setup.bat
````

Start the server:

```
call .venv\Scripts\activate
python -m uvicorn app.main:app --host 127.0.0.1 --port 8003 --reload
```

Open `http://127.0.0.1:8003/`.
