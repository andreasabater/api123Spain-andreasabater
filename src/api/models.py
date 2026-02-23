from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)
    first_name = db.Column(db.String(80), nullable=True)
    last_name = db.Column(db.String(80), nullable=True)
    

    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'

    # do not serialize the password, its a security breach
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "is_admin": self.is_admin,
            "first_name": self.first_name,
            "last_name": self.last_name}
    
class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    diameter = db.Column(db.String(80))
    rotation_period = db.Column(db.String(80))
    orbital_period = db.Column(db.String(80))
    gravity = db.Column(db.String(80))
    population = db.Column(db.String(80))
    climate = db.Column(db.String(80))
    terrain = db.Column (db.String(80))

    def __repr__(self):
        return f'<Planet: {self.id}>'
    

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "diameter": self.diameter,
            "rotation_period": self.rotation_period,
            "orbital_period": self.orbital_period,
            "gravity": self.gravity,
            "population": self.population,
            "climate": self.climate,
            "terrain": self.terrain}

class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    height = db.Column(db.String(50))
    mass = db.Column(db.String(50))
    hair_color = db.Column(db.String(50))
    skin_color = db.Column(db.String(50))
    eye_color = db.Column(db.String(50))
    birth_year = db.Column(db.String(20))
    gender = db.Column(db.String(20))

    def __repr__(self):
        return f'<Character: {self.id}>'
    

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "height": self.height,
            "mass": self.mass,
            "hair_color": self.hair_color,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "birth_year": self.birth_year,
            "gender": self.gender}
    
class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255))
    body = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date, nullable=False)
    image_url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to =db.relationship('Users', foreign_keys=[user_id], backref=db.backref('post_to', lazy='select'))
    
    def __repr__(self):
        return f'<Post: {self.id}>'
    
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "body": self.body,
            "date": self.date,
            "image_url": self.image_url,
            "user_id": self.user_id}
    
class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum("image", "video", name="media_type"), nullable=False)
    url = db.Column(db.String(255), nullable=False)   
    post_id = db.Column(db.Integer,  db.ForeignKey("posts.id"), nullable=False)
    post_to =db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('media_to', lazy='select'))

    def __repr__(self):
        return f'<Media: {self.id}>'
    
    
    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "url": self.url,
            "post_id": self.post_id}

class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('character_favorites_to', lazy='select'))
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"), nullable=False)
    character_to = db.relationship('Characters', foreign_keys=[character_id], backref=db.backref('user_favorite_to', lazy='select'))


    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "character_id": self.character_id}

class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('Planet_favorites_to', lazy='select'))
    planet_id = db.Column(db.Integer, db.ForeignKey("planets.id"), nullable=False)
    planet_to = db.relationship('Planets', foreign_keys=[planet_id], backref=db.backref('planet_favorite_to', lazy='select'))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "planet_id": self.planet_id}

class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to', lazy='select'))
    following_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to', lazy="select"))

    def serialize(self):
        return {
            "id": self.id,
            "follower_id": self.follower_id,
            "following_id": self.following_id}
    
class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('comments_to', lazy='select'))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('user_comment_to', lazy='select'))

    def serialize(self):
        return {
            "id": self.id,
            "body": self.body,
            "user_id": self.user_id,
            "post_id": self.post_id}
