import Ember from 'ember';
//import metawear from "vendor/metawear";

export default Ember.Controller.extend({
	metawearConnected: false,
    a_x: 'null',
    a_y: 'null',
    a_z: 'null',
    a_t: 'null',
    errors: 'none',

    //graph variables for accelerometer plotting
    datasets: [],
    init: function () {
        var t = this;
        setInterval(function () {
			navigator.accelerometer.getCurrentAcceleration(function (acceleration) {//success callback
				//console.log('acceleration setvars called');
				t.set('a_x', acceleration.x);
				t.set('a_y', acceleration.y);
				t.set('a_z', acceleration.z);
				t.set('a_t', acceleration.timestamp);
			}, function (error) {//error callback
				//console.log('acceleration err')
				t.set('errors', error);
			});           
        }, 1000);
    },
    getRandomData: function () {
        var t = this;
        var data = t.get('phone_accelData');

        if (data.length > 0) {
        	data = data.slice(1);
        }

        // Do a random walk
        while (data.length < this.get('phone_accelTotalPoints')) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;

            if (y < 0) {
                y = 0;
            } else if (y > 100) {
                y = 100;
            }
            data.push(y);
        }

        t.set('phone_accelData', data);
        // Zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]]);
        }

        return res;
    },
    setVars: function (acceleration, t) {
        console.log(t);

    },
    setError: function (error, t) {
        console.log('acceleration err');
        t.set('errors', error);
    },
    actions: {
        metawear_connect: function () {
            var t = this;
            metawear.init(function () {
                //success
                console.log('Connected to Metawear Device');
                t.set('metawearConnected',true);
                WearableEmber.metawearReady = true;
                
            }, function () {//failure
                console.log('No Metawear devices found');
            });
        },
        metawear_disconnect: function(){
        	var t = this;
            metawear.disconnect(function () {
                //success
                console.log('Disconnected from Metawear Device');
                t.set('metawearConnected', false);
                WearableEmber.metawearReady = true;
            }, function () {//failure
                console.log('Error Disconnecting (possibly connect first)');
            });
        },
        metawear_turnOnLED: function () {
            //if (WearableEmber.metawearReady) {
            //send GATT to metawear LED API
            console.log('Turning on metawear LED');
            metawear.setLED(metawear.COLOR.BLUE);
            metawear.play(true);
            //}
            //else {
            //    console.log('Metawear initialization has not succeeded')
            //}

        },
        metawear_turnOffLED: function(){
            //if (WearableEmber.metawearReady) {
            //send GATT to metawear LED API
            console.log('Turning off metawear LED');
            metawear.stop(true);
            //}
            //else {
            //    console.log('Metawear initialization has not succeeded')
            //}
        }
    }
});
