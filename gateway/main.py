import sys
import time
import random
from Adafruit_IO import MQTTClient
from uart import *
from simple_ai import *

AIO_FEED_IDs = ["button1","button2"]
AIO_USERNAME = "huyn02"
AIO_KEY = "aio_ZNJW41JwYsQB9DtbW52cty5gFZPK"    

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
    if feed_id =="button1":
        if payload == "0":
            writeData("1")
        else: writeData("2")
    if feed_id =="button2":
        if payload == "0":
            writeData("3")
        else: writeData("4") 

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()
counter = 10
sensor_type = 0
counter_ai = 10
while True:
    counter_ai  = counter_ai - 1
    if counter_ai <=0:
        counter_ai = 10
        ai_result, image = image_detector()
        print("AI Output:", ai_result)
        client.publish("ai", ai_result)
        client.publish("ịmage", image)
    
    readSerial(client)
    time.sleep(1)
    