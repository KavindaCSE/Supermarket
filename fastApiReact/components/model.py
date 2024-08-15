from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Products(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    quantity_in_stock = Column(Integer)
    quantity_sold = Column(Integer)
    unit_price = Column(Float)
    revenue = Column(Float)
    brand = Column(String)
    supplier_id = Column(Integer, ForeignKey('suppliers.id'))
    supplier = relationship("Suppliers", back_populates='products')

class Suppliers(Base):
    __tablename__ = "suppliers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    company = Column(String)
    email = Column(String)
    phone = Column(String)

    products = relationship("Products", back_populates='supplier')

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String)
    email = Column(String)
    post = Column(String)
    password = Column(String)    
