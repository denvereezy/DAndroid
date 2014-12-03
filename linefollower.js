
var five = require("johnny-five");
var keypress = require('keypress');
var ldr_left;
var ldr_right;
var ldr_middle;

var board, 
    left,
    middle, 
    right;

  keypress(process.stdin);

  board = new five.Board();
  board.on("ready", function() {
    
          var left_wheel  = new five.Servo({ pin:  12, type: 'continuous' }).stop();
          var right_wheel  = new five.Servo({ pin:  13, type: 'continuous' }).stop();

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
                forward();
               
              }else if ( key.name == 'down'){
                console.log('Backwards');
                backwards();
              
              }else if (key.name == 'left'){
                console.log('left');
                left();
              
              }else if (key.name == 'right'){
                console.log('right');
                right();
              
              }else if (key.name == 'space'){
                console.log('stop');
                stop();
              }
          });
         


          myPhotoresistor = new five.Sensor({
            pin: "A0",
            freq: 500
          });

          myPhotoresistor2 = new five.Sensor({
            pin: "A1",
            freq: 500
          });
            

          myPhotoresistor3 = new five.Sensor({
            pin: "A2",
            freq: 500
          });

          myPhotoresistor.on("calibrated", function(err,value ) {
              console.log("calibrated",value );
              

          });

          myPhotoresistor.on("read", function( err, value ) {
        	   console.log(value);
             //ldr_left = value;
             ldrReadingChange("left", value);
          });

           var ldrReadingChange = function (side, value){
            // compare the values
            if (side === "left")
              ldr_left = value;

            

            //if (ldr_left < ldr_middle)
            //go(left, 200);

            //if (ldr_left < ldr_middle)

          }
        	 

          myPhotoresistor2.on("read", function( err, value ) {
            if (value > 350){
                 forward();
                    }
            console.log(value);
            
          });

          myPhotoresistor3.on("read", function( err, value) {
            console.log(value);
          });

         function go (direction, duration) {
            
            direction();

            setTimeout(function() {
              straight();
            }, duration); 
         }

         function left () {
            left_wheel.cw();
            right_wheel.cw();            
         }

         function right (){
           left_wheel.ccw();
           right_wheel.ccw();
          }

         function backwards (){
           left_wheel.cw();
           right_wheel.ccw();
         }

        function forward (){
          left_wheel.ccw();
           right_wheel.cw();
        }

        function stop(){
          left_wheel.stop();
           right_wheel.stop();
        }
});
