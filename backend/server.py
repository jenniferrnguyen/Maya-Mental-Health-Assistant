from flask import Flask
from flask_cors import CORS
import json

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello!</p>"

# allow both GET and POST requests
@app.route('/form-example', methods=['GET', 'POST'])
def form_example():
    return '''
              <form method="POST">
                  <div><label>Language: <input type="text" name="language"></label></div>
                  <div><label>Framework: <input type="text" name="framework"></label></div>
                  <input type="submit" value="Submit">
              </form>'''

@app.route("/help", methods=['GET', 'POST'])
def help():
    return "helping"

cors = CORS(app, resources={'/*':{'origins': 'http://localhost:3000'}}) 

if __name__ == "__main__":
    app.run()