#Metawear plugin for Apache Cordova

Use this plugin to connect your hybrid mobile application to a metawear device.

##Dependencies

http://plugins.cordova.io/#/package/com.megster.cordova.ble 
This plugin relies on the Bluetooth Low Energy Central plugin for Apache Cordova.

#Supported Platforms

* iOS
* Android

This Cordova plugin relies on the Bluetooth Low Energy Central Plugin.  That plugin currently only supports iOS and Android.  

#Installing
Install with Cordova CLI

$ cd /path/to/your/project
$ cordova plugin add com.lisaseacat.metawear

# API

## Global Variables

- [metawear.COLOR](#color)

## color

When playing a color on the metawear there are three choices for colors, red, green, and blue.  You will need to pass one of these color variables into the setLED method to indicate your color choice.

    COLOR.RED - red
    COLOR.GREEN - green
    COLOR.BLUE - blue
    


## Methods

- [metawear.init](#init)
- [metawear.listenForButton](#listenForButton)
- [metawear.setLED](#setLED)
- [metawear.play](#play)
- [metawear.pause](#pause)
- [metawear.stop](#stop)
- [metawear.motor](#motor)
- [metawear.buzzer](#buzzer)
- [metawear.startAccelerometer](#startAccelerometer)
- [metawear.stopAccelerometer](#stopAccelerometer)
- [metawear.disconnect](#disconnect)


## init

Intialize the metawear device.  

    metawear.init(success, failure);
    
### Description

Function 'init' initializes the metawear device.  This method attempts to connect to a metawear device over bluetooth low energy.  The success callback is called when a metawear device is found and connected to.  

### Parameters

- __success__: Success callback function that is invoked when a metawear device is found and connected to.
- __failure__: Error callback function, invoked when error occurs. [optional]


## listenForButton

Call if you'd like to listen for button press events on the metawear device.

    metawear.listenForButton(failure, messageReceived, messageError);
    
### Description

Function 'listenForButton' adds an event listener to the metawear device button press.  When a message is received the messageReceived handler is called.  

### Parameters

- __failure__: Error callback function that is invoked when failing to register the button listener.
- __messageReceived__: Success callback function, invoked when the metawear button is pressed. [optional]
- __messageError__: Error callback function, invoked when the  metawear button is pressed but there was an error retrieving the message. [optional]

## setLED

Call to light up the LED on the metawear.

    metawear.setLED(metawear.COLOR.BLUE); 
    
### Description

Function 'setLED' allows you to tell the metawear led to light up with a specific color.  

### Parameters

- __color__: The color to light the LED as.  Supported colors for the metawear are COLOR.RED, COLOR.GREEN, and COLOR.BLUE.  If no color is specified the color will be green [optional]

## play

Plays the saved color channel on the metawear

    metawear.play(autoplay); 
    
### Description

Function 'play' tells the metawear to being playing the saved LED color pattern.  

### Parameters

- __autoplay__: boolean value to indicate whether the color pattern should automatically play or not.

## pause

Pauses the LED on the metawear

    metawear.pause(); 
    
### Description

Function 'pause' causes the metawear to stop playing the LED color pattern.  


## stop

Stops the saved color channel on the metawear

    metawear.stop(clearPattern); 
    
### Description

Function 'stop' tells the metawear to stop playing the saved LED color pattern.  

### Parameters

- __clearPattern__: boolean value to indicate whether the color pattern should be cleared out.  If you were to call the play method after calling the stop method with the clearPattern flag set to true, nothing will play because the pattern has been removed.  Instead you'll have to first add a color to the pattern with the 'setLED' function.

## motor

Tells the optional motor sensor to pulse

    metawear.motor(pulseLength); 
    
### Description

Function 'motor' tells the optional metawear motor to pulse.  

### Parameters

- __pulseLength__: value indicates how long you'd like the motor to pulse.

## buzzer

Tells the optional buzzer sensor to pulse

    metawear.buzzer(pulseLength); 
    
### Description

Function 'buzzer' tells the optional metawear buzzer to pulse.  

### Parameters

- __pulseLength__: value indicates how long you'd like the motor to pulse.

## startAccelerometer

Tells the metawear to start sharing information about the accelerometer

    metawear.startAccelerometer(); 
    
### Description

Function 'startAccelerometer' tells the metawear to start sharing information about the accelerometer.  We can use the information returned to see how the values have changed.  

### Quick Example of Processing the Accelerometer Information

    onDataReceived : function(buffer) { // data received from MetaWear
        console.log('data received plugin handler');
        var data = new Uint8Array(buffer);
        if (data[0] === 3 && data[1] === 4) { // module = 3, opscode = 4
            //console.log('accelerometer data is: ' + JSON.stringify(data));
            //FYI guessing as the xyz values
            var d2 = data[2]; //x
            var d3 = data[3];
            var d4 = data[4]; //y
            var d5 = data[5];
            var d6 = data[6]; //z
            var d7 = data[7];
            message = "Got accelerometer information: [2]" 
                + d2 + ",[3]" + d3
            + ",[4]" + d4
            + ",[5]" + d5
            + ",[6]" + d6
            + ",[7]" + d7;
            //console.log("ACCELEROMETER MESSAGE: " + message);
            
            //compare against old values
            var xdiff = Math.abs(metawear.accelerometerVALS.x - d2);
            if (xdiff > 30 && metawear.accelerometerVALS.x !== 22){
                console.log("x value changes more than 30 degrees: " + xdiff);
                console.log("ACCELEROMETER MESSAGE: " + message);
                metawear.setLED(metawear.COLOR.RED);   
            }
            
            var ydiff = Math.abs(metawear.accelerometerVALS.y - d4);
            if (ydiff > 30 && metawear.accelerometerVALS.x !== 22){
                console.log("y value changes more than 30 degrees: " + ydiff);
                console.log("ACCELEROMETER MESSAGE: " + message);
                metawear.setLED(metawear.COLOR.GREEN);   
            }
            
            //reset accelerometer values
            metawear.accelerometerVALS.x = d2;
            metawear.accelerometerVALS.y = d4;
            metawear.accelerometerVALS.z = d6;
            
            //all the rest of the values are the same
        }

## stopAccelerometer

Tells the metawear to stop sharing information about the accelerometer

    metawear.stopAccelerometer(); 
    
### Description

Function 'startAccelerometer' tells the metawear to start sharing information about the accelerometer.  We can use the information returned to see how the values have changed.

## disconnect

Disconnects the metawear device from bluetooth.  

    metawear.disconnect(success, failure);
    
### Description

Function 'disconnect' disconnects the metawear device.  This method attempts to disconnect the attached metawear device over bluetooth low energy.  The success callback is called when a metawear device is successfully disconnected.  

### Parameters

- __success__: Success callback function that is invoked when a metawear device is disconnected.
- __failure__: Error callback function, invoked when error occurs. [optional]


# Sample application

To download a sample application to see these methods in action, visit: https://github.com/ldeluca/metawear

# Feedback

If you have any questions or find a problem with the code, please file an issue or create a pull request against the github repository.