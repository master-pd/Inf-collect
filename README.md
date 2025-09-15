# Consent Data Collector (static)

Small static page that asks for explicit consent before collecting non-sensitive info.
Everything is client-side. Nothing is sent to any server by default.

## Files
- index.html  — main HTML page
- style.css   — CSS styles
- script.js   — JavaScript logic
- run-termux.sh — serve via Python in Termux

## Run locally (Termux)
1. Install Python: `pkg update && pkg install python -y`
2. Place files in a folder (e.g., ~/consent-app)
3. `cd ~/consent-app`
4. `chmod +x run-termux.sh`
5. `./run-termux.sh`
6. Open `http://localhost:8080` in the device browser.