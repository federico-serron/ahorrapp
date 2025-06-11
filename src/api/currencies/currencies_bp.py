from flask import Flask, request, jsonify, url_for, Blueprint, Response
from flask_cors import CORS




currencies = Blueprint("currencies", __name__)

# Allow CORS requests to this API
CORS(currencies)


@currencies.route('/test', methods=["GET"])
def test():
    return jsonify({"msg": "Esta funcionando  la ruta currencies"}), 200

