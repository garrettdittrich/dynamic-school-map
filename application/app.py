from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.ext.restless import APIManager
from time import sleep
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:abc123@localhost/dynmap'
db = SQLAlchemy(app)

#Calls system level ping (must be run as root for icmp to work)
def ping_host(hostname):
    response = os.system("ping -c 1 " + hostname)
    return response == 0


class Dynmap(db.Model):
    __tablename__ = 'node'
    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.Unicode)
    alive = db.Column('alive', db.Unicode)
    ip = db.Column('ip', db.Unicode)
    location = db.Column('location', db.Unicode)

    def __init__(self, id, name, alive):
        self.id = id
        self.name = name
        self.alive = alive
        self.ip = ip
        self.location = location

def preproc_test(instance_id=None, **kw):
    """
    This function is called before the POST method returns a reponse.
    In this case it pings the ip of the node (device) that is referenced by the
    id of the model in the database, it then updates the alive value accordingly
    and returns the correct value(s) to the client
    """
    node = Dynmap.query.filter_by(id=instance_id).first()
    hostname = node.ip
    if ping_host(hostname) == True:
        node.alive = 'true'
        print('The Host is Alive !!!')
    else:
        node.alive = 'false'
        print('The Host is Down !!!')

#Manager instance for the flask restless    
manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Dynmap, methods=['GET', 'POST', 'DELETE'],
preprocessors={
                       'GET_SINGLE': [preproc_test]
                      
                       },
)

if __name__ == "__main__":
    app.run(debug=True)