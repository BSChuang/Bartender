import os
from datetime import datetime, timedelta
from flask import Flask, request, abort, jsonify

def fParallelServer(q):
    WEBHOOK_VERIFY_TOKEN = 'baaartender'
    CLIENT_AUTH_TIMEOUT = 24 # in Hours

    app = Flask(__name__)

    authorised_clients = {}

    @app.route('/webhook', methods=['POST'])
    def webhook():
        verify_token = request.args.get('verify_token')
        print(verify_token)
        if verify_token == WEBHOOK_VERIFY_TOKEN:
            q.put({'process': 'assistant', 'args': request.json['drink']})
            return jsonify({'status':'success'}), 200
        else:
            return jsonify({'status':'not authorised'}), 401

    print('Starting webhook')
    app.run('0.0.0.0')