#!/data/data/com.termux/files/usr/bin/env bash
# run-termux.sh
# Usage:
#   pkg update && pkg install python -y
#   chmod +x run-termux.sh
#   ./run-termux.sh
#
# This will serve current folder on port 8080 (local device).
python -m http.server 8080