"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Record, Category, Wallet
from api.utils import generate_sitemap, APIException, validate_relationships, validate_required_fields, parse_date
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import timedelta, timezone, datetime

api = Blueprint('api', __name__)

bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup_user():

    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')


    if not name or not email or not password:
        return jsonify({'msg': 'Datos incompletos, por favor llenar todos los datos del usuario'}), 400
    

    user = User.query.filter_by(email = email).first()

    if user:
        return jsonify({'msg' : 'El email utilizado ya esta registrado, por favor utilizar otro'}), 400
    
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')


    new_user = User(name = name, password = password_hash, email = email)

    db.session.add(new_user)
    db.session.commit()


    return jsonify(new_user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
   
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
       
        return jsonify({'message': 'Correo y contraseña son obligatorios'}), 400

    user = User.query.filter_by(email=email).first()
    

    if not user: 
        return jsonify({"message":"usuario no encontrado"}), 404
       
    password_db = user.password 
        
    true_false= bcrypt.check_password_hash(password_db,password)
    if true_false: 
        expires= timedelta(days=1)
        user_id=user.id
        access_token=create_access_token(identity=str(user_id),expires_delta=expires)
        return jsonify({
                "messagge": "Logueado exitosamente",
                "access_token": access_token
            }), 200
    else:
        return jsonify({
            "messagge": "contraseña incorrecta"
        }), 400


# Ruta 1

# Ruta 2

# Ruta 3

# Ruta 4



# Crea un nuevo registro
@api.route('/records/add', methods=["POST"])
@jwt_required()
def add_record():

    try:
    
        fields = request.get_json()
        user_id = get_jwt_identity()

        if not user_id:
            return jsonify({"msg": "Debe estar logueado para agregar un registro."}), 401

        required_fields = {
            "description": fields.get("description"),
            "amount": fields.get("amount"),
            "type": fields.get("type"),
            "category_id": fields.get("category_id"),
            "wallet_id": fields.get("wallet_id"),
        }

        error_fields = validate_required_fields(required_fields)
        if error_fields:
            return error_fields

        error_relationships = validate_relationships({"Category": (Category, fields.get('category_id')),"Wallet": (Wallet, fields.get('wallet_id'))})
        if error_relationships:
            return error_relationships

        
        if fields.get('amount') <= 0:
            return jsonify({"msg": "El monto debe ser mayor a 0"}), 400
        
        new_record = Record(
        description=fields['description'],
        amount=fields['amount'],
        type=fields['type'],
        category_id=fields['category_id'],
        wallet_id=fields['wallet_id'],
        user_id=user_id
    )

        db.session.add(new_record)
        db.session.commit()

        return jsonify(new_record.serialize()), 201
    
    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500




# Lista todos los registros del usuario logueado, lo puede filtrar por Categoria y/o Fecha de inicio
@api.route('/records/list', methods=["GET"])
@jwt_required()
def get_records():

    try:

        user_id = get_jwt_identity()

        category_id = request.args.get('category_id', type=int, default=None)
        start_date = parse_date(request.args.get('start_date'), datetime(2025, 1, 1, tzinfo=timezone.utc))
        end_date = parse_date(request.args.get('end_date'), datetime.now(timezone.utc))

        query = Record.query.filter(Record.user_id == user_id)

        if category_id:
            query = query.filter(Record.category_id == category_id)
        if start_date:
            query = query.filter(Record.timestamp >= start_date)
        if end_date:
            query = query.filter(Record.timestamp <= end_date)

        records = query.all()

        if category_id and not records:
            return jsonify({"msg": "No hay registros para la categoria solicitada"}), 404


        return jsonify({
                        "records": [record.serialize() for record in records]
                        }),200

    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500
    



# Muestra la info de un registro especifico segun el id que viene ne la URL
@api.route('/records/<int:id>', methods=["GET"])
@jwt_required()
def get_record(id):

    try:
        user_id = get_jwt_identity()
        record = Record.query.filter_by(id=id, user_id=user_id).first()

        if not record:
            return jsonify({"msg": "No se encuentra el registro solicitado"}), 404


        return jsonify(record.serialize()), 200
    
    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500
    



# Edita la info de un registro especifico segun el id que viene ne la URL
@api.route('/records/<int:id>', methods=["PUT"])
@jwt_required()
def edit_record(id):

    try:
        user_id = get_jwt_identity()
        record = Record.query.filter_by(id=id, user_id=user_id).first()

        data = request.get_json()

        if not record:
            return jsonify({"msg": "No se encuentra el registro solicitado"}), 404
        
        if 'description' in data:
            record.description = data['description']
        if 'amount' in data:
            record.amount = data['amount']
        if 'type' in data:
            record.type = data['type']
        if 'category_id' in data:
            record.category_id = data['category_id']

        db.session.commit()

        return jsonify(record.serialize()), 200
    
    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500
    


# Elimina un registro especifico segun el id que viene ne la URL
@api.route('/records/<int:id>', methods=["DELETE"])
@jwt_required()
def delete_record(id):

    try:
        user_id = get_jwt_identity()
        record = Record.query.filter_by(id=id, user_id=user_id).first()

        if not record:
            return jsonify({"msg": "No se encuentra el registro solicitado"}), 404
        
        db.session.delete(record)
        db.session.commit()

        return jsonify({"msg": "Registro eliminado exitosamente"}), 200
    
    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500