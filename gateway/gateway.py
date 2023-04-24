import sys
import time
import random
from Adafruit_IO import MQTTClient
import pandas as pd
# from uart import *
# from simple_ai import *
import pymongo 

AIO_FEED_IDs = ["button1","button2","receive"]
AIO_USERNAME = "huyn02"
AIO_KEY = "aio_ZNJW41JwYsQB9DtbW52cty5gFZPK"    
def readData(feed_key, sensor_name):
    feed_data = pd.read_json('https://io.adafruit.com/api/v2/{}/feeds/{}/data'.format(AIO_USERNAME,feed_key))
    feed_data['created_at'] =  pd.to_datetime(feed_data['created_at'])
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db=client['IoT']
    collection = db["sensors"]
    data = {"Sensor":sensor_name,"Timestamp":feed_data['created_at'][0],"Value":float(feed_data['value'][0])}
    collection.insert_one(data)
def readDataStr(feed_key, sensor_name):
    feed_data = pd.read_json('https://io.adafruit.com/api/v2/{}/feeds/{}/data'.format(AIO_USERNAME,feed_key))
    feed_data['created_at'] =  pd.to_datetime(feed_data['created_at'])
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db=client['IoT']
    collection = db["sensors"]
    data = {"Sensor":sensor_name,"Timestamp":feed_data['created_at'][0],"Value":str(feed_data['value'][0])}
    collection.insert_one(data)

def connected(client):
    print("Ket noi thanh cong ...")
    for topic in AIO_FEED_IDs:
        client.subscribe(topic)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    print("Nhan du lieu: " + payload + " , feed id:" + feed_id)
    if feed_id == "receive":
        if payload == "1":
            readData("cambien1", "Temperature")
        if payload == "2":
            readData("cambien2", "Humidity")
        if payload == "3":
            readData("cambien3", "Light")
        if payload == "4":
            readDataStr("ai", "Ai")

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()
counter = 10

while True:
    pass
