from pydantic import BaseModel
from typing import Optional,Dict


class Supplier(BaseModel):
    name : str
    company : str
    email : str
    phone : str

class Products(BaseModel):
    name : str
    quantity_in_stock : int
    quantity_sold : int
    unit_price : float
    revenue : float
    brand : str
    supplier_id : int 


class changesList(BaseModel):
    changes: Dict[int, int]

class orders(BaseModel):
    no_of_items : int
    Total_price : float
    user_id : int


class Users(BaseModel):
    name:str
    email:str
    password:str
    post:str

class newPw(BaseModel):
    username:str
    password:str

class Login(BaseModel):
    username:str
    password:str

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] | None = None    

class updateUser(BaseModel):
    id:int
    name:str
    email:str
    post:str

class getUser(BaseModel):
    id:int
    name:str
    email:str
    post:str
    class Config():
        orm_ode = True        

class review(BaseModel):
    product_id : int
    feedback : str
           