"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Record, Category, Wallet
from api.utils import generate_sitemap, APIException, validate_relationships, validate_required_fields, parse_date, check_user_is_admin
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


# Registrar nuevo usuario
@api.route('/signup', methods=['POST'])
def signup_user():

    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')
    role = request.json.get('role')


    if not name or not email or not password:
        return jsonify({'msg': 'Datos incompletos, por favor llenar todos los datos del usuario'}), 400

    user = User.query.filter_by(email = email).first()

    if user:
        return jsonify({'msg' : 'El email utilizado ya esta registrado, por favor utilizar otro'}), 400
    
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')


    new_user = User(name = name, password = password_hash, email = email, role=role)

    db.session.add(new_user)
    db.session.commit()


    return jsonify(new_user.serialize()), 201


# Login
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


# Ruta creada para añadir una nueva wallet a la cuenta del usuario

@api.route('/wallet/add', methods = ['POST'])
@jwt_required()
def create_wallet():
    user_id = get_jwt_identity()
    name_wallet = request.json.get('name')
    initial_value = request.json.get('total_value')
    currency_id = request.json.get('currency_id')


    # hacer verificacaciones para asegurar de que se incluya los 4 items de arriba
    if not name_wallet or initial_value == None or not currency_id:
        return jsonify({'msg': 'Por favor completar todos los campos'}), 400
    
    # Verifica si el usuario no existe
    user = User.query.filter_by(id = user_id).first()
    if not user:
        return jsonify({'msg': 'Este usuario no existe'}), 400
    
    # Si cumple, que se cree el wallet con la clase Wallet
    wallet = Wallet.query.filter_by( name = name_wallet ,user_id = user_id).first()

    if wallet:
        return jsonify({'msg': 'Este nombre de wallet ya esta registrado en tu cuenta'}),400
    
    new_wallet = Wallet(name = name_wallet, total_value = initial_value, currency_id = currency_id, user_id = user_id)

    db.session.add(new_wallet)
    db.session.commit()


    return jsonify(new_wallet.serialize()), 201

# Ruta para obtener todas las wallets registradas en la app (funcion solo para admin)
@api.route('/wallet/all', methods = ['GET'])
@jwt_required()
def get_wallets():
   
    try:

        is_not_admin = check_user_is_admin(get_jwt_identity())

        if is_not_admin:
            return is_not_admin
        
        all_wallets = Wallet.query.all()

        if not all_wallets:
            return jsonify({'msg':'No hay wallets registradas'}),400
    
        dict_wallets = list(map(lambda x: x.serialize(), all_wallets))

        return jsonify(dict_wallets)
    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500


# Ruta para obtener todas las wallets por user_id
@api.route('/wallet/get', methods = ['GET'])
@jwt_required()
def get_wallets_by_user_id():
    
    try:
        user_id = get_jwt_identity()
        
        wallets_by_user = Wallet.query.filter_by(user_id = user_id)

        if not wallets_by_user:
            return jsonify({'msg': 'No existen wallets registrados a ese usuario'}),400

        wallets_by_user = list(map(lambda wallet: wallet.serialize(),wallets_by_user))

        return jsonify(wallets_by_user)
    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500

# Crear Ruta GET para obtener la wallet por ID 
@api.route('/wallet/get/<int:wallet_id>', methods = ['GET'])
@jwt_required()
def get_wallet_from_user(wallet_id):

    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if not user: 
            return jsonify({"message":"usuario no encontrado"}), 404

        wallet_from_user = Wallet.query.filter_by(user_id = user_id,id = wallet_id).first()

        if not wallet_from_user:
            return jsonify({'msg': 'No existe ese wallet del usuario'}), 404

        return (jsonify(wallet_from_user.serialize())) 
    
    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500



# Ruta PUT para modificar el wallet
@api.route('/wallet/edit/<int:wallet_id>', methods = ['PUT'])
@jwt_required()
def modify_wallet(wallet_id):
    
    try:
        name_wallet = request.json.get('name')
        initial_value = request.json.get('total_value')
        currency_id = request.json.get('currency_id')

        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if not user: 
            return jsonify({"message":"usuario no encontrado"}), 404
        
        wallet_from_user = Wallet.query.filter_by(user_id = user_id,id = wallet_id).first()

        if not wallet_from_user:
            return jsonify({'msg': 'No existe ese wallet del usuario'}), 404
        

        if name_wallet:
            wallet_from_user.name = name_wallet

        if initial_value:
            wallet_from_user.total_value = initial_value

        if currency_id:
            wallet_from_user.currency_id = currency_id

        db.session.commit()

        return jsonify(wallet_from_user.serialize()), 201
    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500


    
@api.route('/wallet/delete/<int:wallet_id>', methods = ['DELETE'])
@jwt_required()
def delete_wallet(wallet_id):

    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if not user: 
            return jsonify({"message":"usuario no encontrado"}), 404

        wallet_from_user = Wallet.query.filter_by(user_id = user_id,id = wallet_id).first()

        if not wallet_from_user:
            return jsonify({'msg': 'No existe ese wallet del usuario'}), 404
        
        db.session.delete(wallet_from_user)
        db.session.commit()

        return (jsonify({'msg': 'Wallet eliminada con exito'})) 
    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500


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
            "category_name": fields.get("category_name"),
            "wallet_id": fields.get("wallet_id"),
        }

        error_fields = validate_required_fields(required_fields)
        if error_fields:
            return error_fields

        error_relationships = validate_relationships({"Wallet": (Wallet, fields.get('wallet_id'))})
        if error_relationships:
            return error_relationships

        selected_category = Category.query.filter_by(name=fields.get('category_name', 'General')).first()

        if not selected_category:
            new_cat = Category(name='General', description="Categoria por defecto")
            db.session.add(new_cat)
            db.session.commit()
            selected_category = new_cat
        
        new_record = Record(
        description=fields['description'],
        amount=fields['amount'],
        type=fields['type'],
        category_id= selected_category.id,
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
@api.route('/records/edit/<int:id>', methods=["PUT"])
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
@api.route('/records/delete/<int:id>', methods=["DELETE"])
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



# Crea una nueva categoria
@api.route('/categories/add', methods=["POST"])
@jwt_required()
def create_category():
    try:
        is_admin = check_user_is_admin(get_jwt_identity())
        if is_admin:
            return is_admin

        data = request.get_json()

        if 'name' not in data or 'description' not in data:
            return jsonify({"msg": "Todos los campos son obligatorios"}), 400
        
        category = Category.query.filter_by(name=data['name']).first()

        if category:
            return jsonify({"msg": "Ya existe una categoria con este nombre, intente con uno diferente"}), 400
            
        new_category = Category(name=data['name'], description=data['description'])
        db.session.add(new_category)
        db.session.commit()

        return jsonify(new_category.serialize()), 200

    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500



# Lista todas las categorias existentes
@api.route('/categories/', methods=["GET"])
@jwt_required()
def get_categories():
    try:
        user_id = get_jwt_identity()

        categories = Category.query.all()
        categories_list = [category.serialize() for category in categories]

        
        return jsonify({"categories": categories_list}), 200


    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500



# Actualiza una categoria existente
@api.route('/categories/edit/<int:id>', methods=["PUT"])
@jwt_required()
def edit_category(id):
    try:
        is_admin = check_user_is_admin(get_jwt_identity())
        if is_admin:
            return is_admin
        
        name = request.json.get('name')
        descripttion = request.json.get('description')

        category = Category.query.filter_by(id=id).first()

        if not category:
            return jsonify({"msg": "No se encuentra la categoria"}), 404
        
        if name:
            category.name = name
        if descripttion:
            category.description = descripttion

        db.session.commit()
        
        return jsonify(category.serialize()), 200


    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500
    


# Elimina una categoria existente
@api.route('/categories/delete/<int:id>', methods=["DELETE"])
@jwt_required()
def delete_category(id):
    try:
        is_admin = check_user_is_admin(get_jwt_identity())
        if is_admin:
            return is_admin
        
        category = Category.query.filter_by(id=id).first()
        records = Record.query.filter_by(category_id=id).first()

        if not category:
            return jsonify({"msg": "No se encuentra la categoria"}), 404
        
        if records:
            return jsonify({"msg": "Esta categoria esta en uso por uno o mas registros, no se puede eliminar"}), 404

        
        db.session.delete(category)
        db.session.commit()
        
        return jsonify({"msg": "Categoria eliminada exitosamente"}), 200


    except Exception as e:
        return jsonify({"msg": f"El siguiente error acaba de ocurrir: {e}"}), 500
      
      
# Nueva ruta 1 Jose

# Nueva ruta 2 Fede
