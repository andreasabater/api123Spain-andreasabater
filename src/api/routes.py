"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Planets, Characters, PlanetFavorites, CharacterFavorites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt

CURRENT_USER_ID = 1

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Validar con mi BD
    row = db.session.execute(db.select(Users).where(Users.email == email,
                                           Users.password == password,
                                           Users.is_active)).scalar()

    if not row:
        response_body['message'] = "Bad username or password"
        return response_body, 401
    
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_active': user['is_active'],
              'is_admin': user['is_admin']}
    response_body['message'] = 'User logged, ok'
    response_body['results'] = user 
    response_body['access_token'] = create_access_token(identity=email, additional_claims=claims)
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()  
def protected():
    response_body = {} 
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()  #devuelve elidentity email
    additional_claims= get_jwt()  #Los datos adiconales
    
    print(current_user)
    print(additional_claims['user_id'])
    response_body['message'] = "Autorizado para ver esta información"
    response_body['results'] = current_user
    return response_body, 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"}
    return response_body, 200


@api.route('/users', methods=['GET', 'POST'])
def users():
    response_body = {}

    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de usuarios'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Users(email=data.get('email'),
                    password=data.get('password'),
                    first_name=data.get('first_name'),
                    last_name=data.get('last_name'),
                    is_active=True,
                    is_admin=False)
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Usuario creado'
        return response_body, 201
    return response_body, 404


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def user(user_id):
    response_body = {}
    row = db.session.execute(db.select(Users).where(
        Users.id == user_id)).scalar()
    print('valor de row', row)
    if not row:
        response_body['message'] = 'Usuario no encontrado'
        return response_body, 404
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Detalles del usuario {user_id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.email = data.get('email', row.email)
        row.first_name = data.get('first_name', row.first_name)
        row.last_name = data.get('last_name', row.last_name)
        row.is_active = data.get('is_active', row.is_active)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = f'Usuario {user_id} modificado'
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Usuario {user_id} eliminado'
        return response_body, 200


@api.route('/planets', methods=['GET', 'POST'])
def planets():
    response_body = {}

    if request.method == 'GET':
       rows = db.session.execute(db.select(Planets)).scalars()
       response_body['results'] = [row.serialize() for row in rows]
       response_body['message'] = 'Listado de planetas'
       return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Planets(name=data.get('name'),
                      climate=data.get('climate'),
                      terrain=data.get('terrain'),
                      population=data.get('population'))
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Planeta creado'
        return response_body, 201
    
    
@api.route('/planets/<int:planet_id>', methods=['GET', 'PUT', 'DELETE'])
def planet(planet_id):
    response_body = {}
    row = db.session.execute(db.select(Planets).where
    (Planets.id == planet_id)).scalar()
    print('valor de row', row)
    if not row:
        return {"message": "Planeta no encontrado"}, 404
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Detalles del planeta {planet_id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get('name', row.name)
        row.climate = data.get('climate', row.climate)
        row.terrain = data.get('terrain', row.terrain)
        row.population = data.get('population', row.population)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = f'Planeta {planet_id} modificado'
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Planeta {planet_id} eliminado'
        return response_body, 200
    
    
@api.route('/characters', methods=['GET', 'POST'])
def characters():
    response_body = {}

    if request.method == 'GET':
        rows = db.session.execute(db.select(Characters)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de personajes'
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        row = Characters(name=data.get('name'),
                         gender=data.get('gender'),
                         birth_year=data.get('birth_year'),
                         eye_color=data.get('eye_color'))
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Personaje creado'
        return response_body, 201


@api.route('/characters/<int:character_id>', methods=['GET', 'PUT', 'DELETE'])
def character(character_id):
    response_body = {}
    row = db.session.execute(db.select(Characters).where
    (Characters.id == character_id)).scalar()

    if not row:
        response_body['message'] = 'Personaje no encontrado'
        return response_body, 404
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Detalles del personaje {character_id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get('name', row.name)
        row.gender = data.get('gender', row.gender)
        row.birth_year = data.get('birth_year', row.birth_year)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = f'Personaje {character_id} modificado'
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Personaje {character_id} eliminado'
        return response_body, 200
    
    
@api.route('/users/favorites', methods=['GET'])
def user_favorites():
    response_body = {}

    planet_favorites = db.session.execute(
        db.select(PlanetFavorites).where
        (PlanetFavorites.user_id == CURRENT_USER_ID)).scalars()

    character_favorites = db.session.execute(
        db.select(CharacterFavorites).where
        (CharacterFavorites.user_id == CURRENT_USER_ID)).scalars()

    response_body['planets'] = [fav.planet_to.serialize() for fav in planet_favorites]
    response_body['characters'] = [fav.character_to.serialize() for fav in character_favorites]
    return response_body, 200


@api.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id):

    planet = db.session.get(Planets, planet_id)
    if not planet:
        return {"message": "Planeta no encontrado"}, 404

    existing = db.session.execute(
        db.select(PlanetFavorites).where(
            PlanetFavorites.user_id == CURRENT_USER_ID,
            PlanetFavorites.planet_id == planet_id)).scalar()

    if existing:
        return {"message": "Planeta ya está en favoritos"}, 400

    fav = PlanetFavorites(
        user_id=CURRENT_USER_ID,
        planet_id=planet_id)

    db.session.add(fav)
    db.session.commit()
    return {"message": "Planeta agregado a favoritos"}, 201


@api.route('/favorite/character/<int:character_id>', methods=['POST'])
def add_favorite_character(character_id):

    character = db.session.get(Characters, character_id)
    if not character:
        return {"message": "Personaje no encontrado"}, 404

    existing = db.session.execute(
        db.select(CharacterFavorites).where(
            CharacterFavorites.user_id == CURRENT_USER_ID,
            CharacterFavorites.character_id == character_id)).scalar()

    if existing:
        return {"message": "Personaje ya está en favoritos"}, 400

    fav = CharacterFavorites(
        user_id=CURRENT_USER_ID,
        character_id=character_id)

    db.session.add(fav)
    db.session.commit()
    return {"message": "Personaje agregado a favoritos"}, 201


@api.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(planet_id):

    fav = db.session.execute(
        db.select(PlanetFavorites).where(
            PlanetFavorites.user_id == CURRENT_USER_ID,
            PlanetFavorites.planet_id == planet_id)).scalar()

    if not fav:
        return {"message": "Favorito no encontrado"}, 404

    db.session.delete(fav)
    db.session.commit()
    return {"message": "Planeta eliminado de favoritos"}, 200


@api.route('/favorite/character/<int:character_id>', methods=['DELETE'])
def delete_favorite_character(character_id):

    fav = db.session.execute(
        db.select(CharacterFavorites).where(
            CharacterFavorites.user_id == CURRENT_USER_ID,
            CharacterFavorites.character_id == character_id)).scalar()

    if not fav:
        return {"message": "Favorito no encontrado"}, 404

    db.session.delete(fav)
    db.session.commit()
    return {"message": "Personaje eliminado de favoritos"}, 200

