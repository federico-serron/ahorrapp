from flask import render_template, current_app, jsonify
from datetime import timedelta
from .models import User, db
import os
from flask_mail import  Message
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()




def send_email_forgot_password(email):
    existing_user = User.query.filter_by(email=email).first()
        
    if not existing_user:
        return jsonify({"msg": "User not found"}), 404
        
    mail = current_app.extensions['mail']
        
        
    expires = timedelta(hours=1)
    reset_token = create_access_token(identity=email, expires_delta=expires, additional_claims={"reset": True})
    reset_link = f"{os.getenv('MAIL_RETURN')}?token={reset_token}"

        
    msg = Message("Password Recovery - AhorrApp",
                    recipients=[existing_user.email])
        
    msg.html = render_template("pass-recovery-email.html", user=existing_user.name, reset_link=reset_link )
    mail.send(msg)
    
    return jsonify({"msg": "Message successflly sent!"}), 200



def reset_pass(new_password, identity):
    
    try:        
        
        user = User.query.filter_by(email=identity).first()
        
        if not user:
            return jsonify({"msg": "User not found"}), 404
        
        password_hash = bcrypt.generate_password_hash(new_password).decode("utf-8")

        user.password = password_hash
        db.session.commit()
        return jsonify({"msg": "Password resetted successfully!"}), 200
    
    except Exception as e:
        return jsonify({"msg": f"Error: {e}"}), 500

    
    