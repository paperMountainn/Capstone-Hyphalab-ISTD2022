from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# import routes here to ensure no circular import
from flaskContamML import routes

