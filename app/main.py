from uvicorn import run
from app.server import app

if __name__ == "__main__":
	run(
		"app.server:app",
		host="0.0.0.0",
		port=8003,
		reload=True
	)