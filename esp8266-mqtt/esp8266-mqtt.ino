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

  //randomSeed(analogRead(0));
  
}
unsigned int n = 0;
float x = 0.0;
void loop(void){
  HandleMqtt();
  x = 512*sin(2*PI*(n/25.0)) + 512;
  n++;
  
  PublishMqtt(String(analogRead(0)));
  delay(200);
}
