
var five = require("johnny-five");
var keypress = require('keypress');
var Wheel = require("./wheels");
var Robot = require("./robot");
var ldr_left;
var ldr_right;
var ldr_middle;


var board, 
    left_sensor,
    middle_sensor, 
    right_sensor;

  keypress(process.stdin);

  board = new five.Board();
  board.on("ready", function() {
        
          var wheel1 = new Wheel(9, 8),
              wheel2 = new Wheel(6,7);

          var robot = new Robot(wheel1, wheel2); 
          this.repl.inject({
          robot : robot
          });    

          process.stdin.resume(); 
          process.stdin.setEncoding('utf8'); 
          process.stdin.setRawMode(true);

          process.stdin.on('keypress', function (ch, key) {
              if ( !key ) return;

              if ( key.name == 'q' ) {

                console.log('Quitting');
                process.exit();

              } else if ( key.name == 'up' ) {

                console.log('Forward');
                robot.forward();
               
              }else if ( key.name == 'down'){
                console.log('Backwards');
                robot.reverse();
              
              }else if (key.name == 'left'){
                console.log('left');
                robot.left();
              
              }else if (key.name == 'right'){
                console.log('right');
                robot.right();
              
              }else if (key.name == 'space'){
                console.log('stop');
                robot.stop();
              }
          });
         
          left_sensor = new five.Sensor({
            pin: "A0",
            freq: 500
          });

          middle_sensor = new five.Sensor({
            pin: "A1",
            freq: 500
          });
            

          right_sensor = new five.Sensor({
            pin: "A2",
            freq: 500
          });

          left_sensor.on("calibrated", function(err,value ) {
              console.log("calibrated",value );
              

          });

          left_sensor.on("read", function( err, value ) {
        	   console.log(value, 'left');
             if(value > 250){
              robot.left();
            }else robot.stop();
          });

          middle_sensor.on("read", function( err, value ) {
            console.log(value, 'middle');
            if(value > 260){
              robot.forward();
            }else if (value > 200){
              robot.stop();
            }
            
          });

          right_sensor.on("read", function( err, value) {
            console.log(value, 'right');
            if(value > 200){
              robot.right();
            }
          });

         
});
