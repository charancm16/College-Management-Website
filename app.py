"""
Flask Backend – Smt T.K.R. Polytechnic Contact Form
======================================================
Serves the college website and persists every contact-form
submission (name, email, subject, message) to Database.txt.
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import re
from datetime import datetime

# ── App setup ──────────────────────────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
DB_FILE    = os.path.join(BASE_DIR, "Database.txt")
STATIC_DIR = BASE_DIR          # index.html lives in the same folder

app = Flask(__name__, static_folder=STATIC_DIR, static_url_path="")
CORS(app)                       # allow the browser page to call /api/contact


# ── Helpers ────────────────────────────────────────────────────────────────
def is_valid_email(email: str) -> bool:
    """Basic e-mail format check."""
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email.strip()))


def append_to_db(entry: dict) -> None:
    """Append one formatted record to Database.txt."""
    separator = "-" * 60
    lines = [
        separator,
        f"  Timestamp : {entry['timestamp']}",
        f"  Full Name : {entry['name']}",
        f"  Email     : {entry['email']}",
        f"  Subject   : {entry['subject']}",
        f"  Message   :",
        f"  {entry['message']}",
        separator,
        "",                     # blank line between records
    ]
    with open(DB_FILE, "a", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")


# ── Routes ─────────────────────────────────────────────────────────────────

# Serve index.html at root
@app.route("/")
def index():
    return send_from_directory(STATIC_DIR, "index.html")


# Serve every other static file (CSS, JS, images...)
@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(STATIC_DIR, filename)


# ── Contact-form API ───────────────────────────────────────────────────────
@app.route("/api/contact", methods=["POST"])
def contact():
    """
    Accepts JSON: { name, email, subject, message }
    Validates -> saves to Database.txt -> returns JSON response.
    """
    data = request.get_json(silent=True) or {}

    # Extract & sanitise fields
    name    = data.get("name",    "").strip()
    email   = data.get("email",   "").strip()
    subject = data.get("subject", "").strip() or "No Subject"
    message = data.get("message", "").strip()

    # Validate required fields
    errors = []
    if not name:
        errors.append("Full Name is required.")
    if not email:
        errors.append("Email Address is required.")
    elif not is_valid_email(email):
        errors.append("Please enter a valid email address.")
    if not message:
        errors.append("Message is required.")

    if errors:
        return jsonify({"success": False, "errors": errors}), 400

    # Build record & persist
    entry = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "name":      name,
        "email":     email,
        "subject":   subject,
        "message":   message,
    }

    try:
        append_to_db(entry)
    except OSError as exc:
        return jsonify({
            "success": False,
            "errors":  [f"Server error while saving data: {exc}"]
        }), 500

    print(f"[{entry['timestamp']}] New message from {name} <{email}> -- \"{subject}\"")

    return jsonify({
        "success": True,
        "message": "Thank you! Your message has been received and saved."
    }), 200


# ── Entry point ────────────────────────────────────────────────────────────
if __name__ == "__main__":
    # Ensure Database.txt exists with a header on first run
    if not os.path.exists(DB_FILE) or os.path.getsize(DB_FILE) == 0:
        with open(DB_FILE, "w", encoding="utf-8") as fh:
            fh.write("=" * 60 + "\n")
            fh.write("  Smt T.K.R. Polytechnic -- Contact Form Submissions\n")
            fh.write("=" * 60 + "\n\n")

    print("\n  Smt T.K.R. Polytechnic - Flask Server")
    print("   ->  http://127.0.0.1:5000\n")
    app.run(debug=True, port=5000)
