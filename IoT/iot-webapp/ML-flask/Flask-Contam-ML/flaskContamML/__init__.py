from flask import Flask

app = Flask(__name__)

# import routes here to ensure no circular import
from flaskContamML import routes