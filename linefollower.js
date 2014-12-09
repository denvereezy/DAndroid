
var five = require("johnny-five");
var keypress = require('keypress');
var Wheel = require("./wheels");
var Robot = require("./robot");

var ldr_left;
var ldr_right;
var ldr_middle;

var LineSensor = function(location, pinNr, cb, freq){

  var self = this;

  var sensor = new five.Sensor({
            pin: pinNr,
            freq:  freq || 250,
          });

  self.reading = 0;

  sensor.on('data', function(){
     self.reading = this.value;
     if(cb){
        cb(location, this.value);
     }
  });
};

var board, 
    left_sensor,
    middle_sensor, 
    right_sensor,
    runNow = false;

  keypress(process.stdin);

  board = new five.Board();
  board.on("ready", function() {
        
          var wheel1 = new Wheel(9, 8, 180),
              wheel2 = new Wheel(6,7, 180);

          var robot = new Robot(wheel1, wheel2); 
          this.repl.inject({
          robot : robot
          });    

          process.stdin.resume(); 
          process.stdin.setEncoding('utf8'); 
          process.stdin.setRawMode(true);

          var onTheLineReadings = {
            left : 300,
            forward : 240,
            right : 290
          };

          var readings = {};

          var getSensorWithHighestReading = function(list){

            var entry = {
              key : "",
              val : 0
            };

            for(value in list){
              if (list[value] > entry.val){
                entry.val = list[value];
                entry.key = value;
              }
            }
            return entry
          }


          //todo 
          //  * how to stop if it's of the line
          //  * how to find the line again? 
          var orientation = function(direction, value){
            
            if (runNow){
              readings[direction] = value;

              if (onTheLineReadings[direction] <= value){
                robot.go(direction, 100);
              }
              else{
                var direction = getSensorWithHighestReading(readings);
                robot.go(direction.key, 100); 
              }
            }
            else{
              robot.stop();
            }

          };

          left_sensor = new LineSensor('left', "A0", orientation);
          middle_sensor = new LineSensor('forward', "A1", orientation);
          right_sensor = new LineSensor('right', "A2", orientation);

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
              else if (key.name == 's'){

                var statistics = "left : " + left_sensor.reading + "\n";
                statistics += "middle : " + middle_sensor.reading + "\n";
                statistics += "right : " + right_sensor.reading + "\n";

                console.log(statistics);
              }
              else if (key.name == 'g'){
                runNow = true;
                console.log('start following line')
              }
              else if (key.name == 'n'){
                runNow = false;
                console.log('stopping following line')
              }
          });
});
