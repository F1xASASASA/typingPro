from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import datetime
import requests  # <--- Не забудь импортировать

app = Flask(__name__)
CORS(app)

# --- НАСТРОЙКИ ЯНДЕКСА ---
YANDEX_API_KEY = "AQVN2bO6XJGfWdVb-1ETP6RATVFOmUvBIxFSfNK5"
YANDEX_URL = "https://rest-assistant.api.cloud.yandex.net/v1/responses"

# ... (Твой код базы данных init_db оставь как был) ...

# ... (Код лидерборда get_leaderboard и save_score оставь как был) ...

# === НОВЫЙ РОУТ ДЛЯ НЕЙРОСЕТИ ===
@app.route('/api/generate-ai', methods=['POST'])
def generate_ai_text():
    data = request.json
    prompt_id = data.get('prompt_id')
    user_input = data.get('input')

    headers = {
        "Authorization": f"Api-Key {YANDEX_API_KEY}",
        "Content-Type": "application/json"
    }
    
    body = {
        "prompt": { "id": prompt_id },
        "input": user_input
    }

    try:
        # Сервер Python делает запрос к Яндексу (тут CORS не мешает)
        response = requests.post(YANDEX_URL, headers=headers, json=body)
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Важно: host='0.0.0.0' нужен для деплоя на внешние хостинги
    app.run(host='0.0.0.0', port=5000)