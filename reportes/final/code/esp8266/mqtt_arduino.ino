#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include "config.h"
#include "ESP8266_Utils.hpp"
#include "Leds_setup.hpp"
#include "MQTT.hpp"
#include "ESP8266_Utils_MQTT.hpp"


void setup(void){
  
  Serial.begin(115200);
  led_setup();
  ConnectWiFi_STA(true);

  InitMqtt();
}

int n = 0;
float data = 0.0;
void loop(void){
  data = 512*sin(4*n*(PI/180)) + 512;
  HandleMqtt();
  PublishMqtt(data);
  n++;
  delay(50);
  
}
