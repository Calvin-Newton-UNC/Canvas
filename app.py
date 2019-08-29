from flask import Flask
from datetime import datetime
import re
from flask import render_template

app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug = True)

# Replace the existing home function with the one below
@app.route("/")
def canvas():
    return render_template("canvas.html")


# New functions
@app.route("/paint/")
def paint():
    return render_template("paint.html")


@app.route("/hello/<name>")
def hello_there(name):
    return render_template(
        "hello_there.html",
        name=name,
        date=datetime.now()
    )

@app.route("/api/data")
def get_data():
    return app.send_static_file("data.json")
