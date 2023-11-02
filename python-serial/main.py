import serial
import paho.mqtt.client as mqtt
import re

# serial port configuration
serial_port = '/dev/ttyACM0';
baud_rate = 9600

# mqtt configuration
mqtt_broker = '23.22.94.118'
mqtt_port = 1883
mqtt_topic = 'e6'
mqtt_username = 'julio'
mqtt_password = 'borden16'

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print('Connected to MQTT Broker')
    else:
        print('Failed to connect, return code %d\n', rc)



try:
    ser = serial.Serial(serial_port, baud_rate)


    # Create an MQTT client
    client = mqtt.Client()
    client.on_connect = on_connect

    # Set the username and password for the MQTT client
    client.username_pw_set(username=mqtt_username, password=mqtt_password)

    # Connect to the MQTT broker using the IP address and port number
    client.connect(mqtt_broker, mqtt_port, keepalive=60)


    while True:
        data = ser.readline().decode('utf-8')

        # Remove non-numeric characters from the data
        data = str(data)


        # data format =   Dato recibido: 639.3292236328
        # remove all characters except numbers and the decimal point if present
        cleaned_data = re.sub('[^0-9.]', '', data)
        
        cleaned_data = int(float(cleaned_data))

        print(cleaned_data)

        # # check if the cleaned data is a valid number
        # try:
        #     number = int(cleaned_data)
        # except ValueError:
        #     print(0.00)
        #     continue

        client.publish(mqtt_topic, cleaned_data)


except serial.SerialException as e:
    print("Error opening serial port: " + str(e))

finally:
    if 'ser' in locals(): 
        ser.close()
