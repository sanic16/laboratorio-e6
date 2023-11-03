int Trig = 12;
int Echo = 13;

void setup(){  
  Serial.begin(115200);
  pinMode(Trig, OUTPUT);
  pinMode(Echo, INPUT); 
  
}

void loop(){
  long duration;
  long distance;

  digitalWrite(Trig, LOW);
  delayMicroseconds(4);
  digitalWrite(Trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trig, LOW);

  duration = pulseIn(Echo, HIGH);
  duration = duration / 2;

  distance = duration / 29;

  if(distance > 120){
    Serial.println(120); 
  }else{
  Serial.println(distance);
  }
}
