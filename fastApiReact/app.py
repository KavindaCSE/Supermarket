from fastapi import FastAPI,Depends
from components import model,schema,hashing,token
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from components.database import engine,get_db
from fastapi.middleware.cors import CORSMiddleware 
from Review_Products.helper import preprocessing,vectorizer,predict

app = FastAPI()

#create database
model.Base.metadata.create_all(bind=engine)

# adding cors url
origins = [
    'http://localhost:3000'
]

#add midldleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


@app.post('/supplier',tags=["supplier"])
def add_suppliers(request:schema.Supplier,db:Session = Depends(get_db)):
    new_supplier = model.Suppliers(name = request.name,company = request.company , email = request.email , phone = request.phone)
    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)
    return new_supplier


@app.get('/supplier',tags=["supplier"])
def get_all_suppliers(db:Session = Depends(get_db)):
    suppliers = db.query(model.Suppliers).all()
    return suppliers

@app.get('/supplier/{id}',tags=["supplier"])
def get_suppliers(id : int,db:Session = Depends(get_db)):
    supplier = db.query(model.Suppliers).filter(model.Suppliers.id == id).first()
    return supplier

@app.delete('/supplier/{id}',tags=["supplier"])
def delete_supplier(id : int,db:Session = Depends(get_db)):
    db.query(model.Suppliers).filter(model.Suppliers.id == id).delete(synchronize_session=False)
    db.commit()
    return "deleted"

@app.put('/supplier/{id}', tags=["supplier"])
def update_supplier(id: int, request: schema.Supplier, db: Session = Depends(get_db)):
    db.query(model.Suppliers).filter(model.Suppliers.id == id).update(request.dict())
    db.commit()
    return "updated"

@app.post('/product',tags=["product"])
def adding_product(request:schema.Products,db:Session = Depends(get_db)):
    new_product = model.Products(name = request.name,brand=request.brand,quantity_in_stock = request.quantity_in_stock , quantity_sold = request.quantity_sold,
                                 unit_price = request.unit_price , revenue = request.revenue , supplier_id = request.supplier_id)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@app.get('/products',tags=["products"])
def get_all_products(db:Session = Depends(get_db)):
    products = db.query(model.Products).all()    
    return products

@app.get('/product/{id}',tags=["product"])
def get_product(id : int,db:Session = Depends(get_db)):
    product = db.query(model.Products).filter(model.Products.id == id).first()
    return product

@app.get('/productusingname/{name}',tags=["product"])
def get_product(name : str,db:Session = Depends(get_db)):
    product = db.query(model.Products).filter(model.Products.name == name).all()
    return product 

@app.put('/updateChanges',tags=["products"])
def update_all_products(request:schema.changesList,db:Session = Depends(get_db)):
    changes = request.changes
    print(changes)
    for id,quantity in changes.items():
        product = db.query(model.Products).filter(model.Products.id == id).first()
        product.quantity_in_stock -= quantity
    db.commit()
    return "success"       

@app.get('/productcollection',tags=["product"])   
def high_revenue_products(db:Session = Depends(get_db)):
    products = db.query(model.Products).order_by(model.Products.revenue.desc()).limit(9).all()
    return products

@app.delete('/product/{id}',tags=["product"])
def delete_product(id : int , db:Session = Depends(get_db)):
    db.query(model.Products).filter(model.Products.id == id).delete(synchronize_session=False)
    db.commit()
    return "deleted"

@app.put('/product/{id}',tags=["product"])
def update_data(id:int,request:schema.Products,db:Session = Depends(get_db)):
    db.query(model.Products).filter(model.Products.id == id).update(request.dict())
    db.commit()
    return "updated"

@app.get('/getproductbysupplier/{id}',tags=["products"])
def get_relevant_products(id : int,db:Session = Depends(get_db)):
    products = db.query(model.Products).filter(model.Products.supplier_id == id).all()
    return products

@app.post('/SignIn',tags=["user"])
def create_users(request:schema.Users,db:Session = Depends(get_db)):
    hashed_pw = hashing.Hash.hashing(request.password)
    new_user = model.Users(name = request.name , email = request.email , post = request.post,password = hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post('/newpw',tags=["user"])
def change_pw(request : schema.newPw,db:Session = Depends(get_db)):
    new_hashed_pw = hashing.Hash.hashing(request.password)
    user = db.query(model.Users).filter(model.Users.email == request.username).first()
    user.password = new_hashed_pw
    db.commit()
    return "Success"

@app.get('/getuser/{email}',tags=["user"],response_model=schema.getUser)
def getUser(email:str,db:Session = Depends(get_db)):
    user = db.query(model.Users).filter(model.Users.email == email).first()
    return user

@app.put('/updateUser/{id}',tags=["user"])
def updateUser(id:int,request:schema.updateUser,db:Session = Depends(get_db)):
    db.query(model.Users).filter(model.Users.id == id).update(request.dict())
    db.commit()
    return "updated"

@app.post('/login',tags=["authentication"])
def login(request:OAuth2PasswordRequestForm = Depends(),db:Session = Depends(get_db)):
    user = db.query(model.Users).filter(model.Users.email == request.username).first()
    if not user:
        return "No such user"
    if not hashing.Hash.verify(request.password,user.password):
        return "Incorrect password"
    
    access_token = token.create_access_token(data={"sub": user.email})
    return {"access_token":access_token, "token_type":"bearer"}


@app.get('/getsuppliers',tags=["suppliers"])
def getsuppliers(db:Session = Depends(get_db)):
    suppliers = db.query(model.Suppliers).all()
    return suppliers 

@app.get('/getsupplier/{id}',tags=["suppliers"])  
def getsupplier(id: int , db:Session = Depends(get_db)) :
    supplier = db.query(model.Suppliers).filter(model.Suppliers.id == id).first()
    return supplier   

@app.put('/updatesupplier/{id}',tags=["suppliers"])
def updateSupplier(id : int ,request : schema.Supplier, db:Session = Depends(get_db)) :
    db.query(model.Suppliers).filter(model.Suppliers.id == id).update(request.dict()) 
    db.commit()
    return "updated" 

@app.get('/getsupplierbyproduct/{product_id}', tags=["suppliers"])
def getsupplier(product_id: int, db: Session = Depends(get_db)):
    product = db.query(model.Products).filter(model.Products.id == product_id).first()
    if product:
        supplier = product.supplier
        return supplier
    else:
        return {"error": "Product not found"}
    
@app.post('/neworder',tags=["orders"])
def neworder(request : schema.orders , db:Session = Depends(get_db)):
    new_order = model.Orders(no_of_items = request.no_of_items, Total_price = request.Total_price , user_id = request.user_id,status="pending") 
    db.add(new_order)
    db.commit()
    
    return "Success"

@app.get('/ordersOfuser/{id}',tags=["orders"])
def get_relevant(id:int,db:Session = Depends(get_db)):
    orders = db.query(model.Orders).filter(model.Orders.user_id == id).all()
    return orders

@app.get('/getAllorders',tags=["orders"])
def get_all_orders(db:Session = Depends(get_db)):
    orders = db.query(model.Orders).all()
    return orders

   