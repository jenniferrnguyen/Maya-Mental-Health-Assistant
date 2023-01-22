import os
import json as JSON

from flask import Flask



def create_app(test_config = None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent = True)
    else:
        app.config.from_mapping('test_config')

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass


    @app.route("/")
    def hello_world():
        return "<p>Hello, World!</p>"

    @app.route("/welcome")
    def welcome():
        return JSON.dumps("Hi Grace, can you tell me a little bit about how you're doing and what brings you here today?")

    @app.route("/confid") 
    def confidential():
        return JSON.dumps("I'm sorry to hear that. Can you tell me a little bit more about it? "
        + "Everything we talk about here is confidential so it's important that you feel safe "
        + "and comfortable, even when you are talking about sensitive information.")

    @app.route("/happy/studies")
    def studies():
        return JSON.dumps("I understand that you are very stressed about your studies, Grace. Why do you feel this way?")

    @app.route("/happy/valid")
    def valid():
        return JSON.dumps("It seems like you find yourself in a place where things aren’t going "
        + "as you had planned, and that’s why you think you are to blame. Your emotions are justified and normal. ")
    
    @app.route("/happy/affirm")
    def affirm():
        return JSON.dumps("I hear you, Grace, and I also understand why you might feel "
        + "disappointed. Right now, I think you are overgeneralizing and jumping to conclusions "
        + "- you are extending the negative thoughts that come from from a small negative experience. "
        + "After all, messing up on one single exam does not hinder your chances to get into medical school. ")

    @app.route("/happy/hot_tip")
    def hot_tip():
        return JSON.dumps("Disappointing situations are a part of life, and your response "
        + "can affect how quickly you can move forward. Someone going through a breakup might "
        + "blame him or herself or even gain weight, thinking, \"What’s the point in looking good? "
        + "I’ll never meet anyone else.\" \n" 
        + "A better approach might be to allow yourself to feel disappointed and remember that "
        + "some things are out of your control. You can work on what is within your control by doing "
        + "this exercise - Write down what happened, what you learned from this experience, and what you "
        + "can do differently next time, watching out for overly negative thoughts. I hope this can help you "
        + "move on and feel better about your future, Grace.")

    @app.route("/happy/end")
    def end():
        return JSON.dumps("No problem, Grace. I’m happy to help anytime.")

    return app

# if __name__ == "__main__":
#     app.run()