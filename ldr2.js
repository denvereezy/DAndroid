var five = require("johnny-five"),
    board, myPhotoresistor, myPhotoresistor2, myPhotoresistor3 /*myServo*/;
 board = new five.Board();
board.on("ready", function() {
  //myServo = new five.Servo(13);

function lineSensor(robot){
        this.ldr1 = myPhotoresistor;
        this.ldr2 = myPhotoresistor2;
        this.ldr3 = myPhotoresistor3;
}

function robot(){
        this.turnLeft()
        this.turnRight()
        if (value < 100) {
        robot = turnLeft;
}
} 




  myPhotoresistor = new five.Sensor({
    pin: "A0",
    freq: 2000
  });

  myPhotoresistor2 = new five.Sensor({
    pin: "A1",
    freq: 2000
  });
  

  myPhotoresistor3 = new five.Sensor({
    pin: "A2",
    freq: 2000
  });


  myPhotoresistor.on("calibrated", function(err,value ) {
    console.log("calibrated",value );
    console.log(myPhotoresistor);
  });


 myPhotoresistor.on("read", function( err, value ) {
   console.log(value, direction);


  });

  myPhotoresistor2.on("read", function( err, value ) {
   console.log(value, "2");
   
  });

  myPhotoresistor3.on("read", function( err, value ) {
  console.log(value, "3");
  });
});
