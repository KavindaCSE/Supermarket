from passlib.context import CryptContext

pwd_cxt = CryptContext(schemes=['bcrypt'],deprecated='auto')

class Hash():
    def hashing(password):
        return pwd_cxt.hash(password)
    
    def verify(plain_pw,hashed_pw):
        return pwd_cxt.verify(plain_pw,hashed_pw)