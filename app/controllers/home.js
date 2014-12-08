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
    dummyData: {
            xs: {},
            json: {},
            type: 'area-spline',
            empty: {
                label: {
                    text: 'No Data'
                }
            }
    },
    dataset: {
        columns: [
                Ember.A(['x', 0, 5]),
                ['y', 0, 6],
                ['z', 0, 7],
        ],
        type: 'line'
    },
    chartSize: {
        width: 350,
    },
    init: function () {
        var t = this;
        setInterval(function () {
            //get accelerometer data
			try {navigator.accelerometer.getCurrentAcceleration(function (acceleration) {//success callback
				//console.log('acceleration setvars called');
				t.set('a_x', acceleration.x);
				t.set('a_y', acceleration.y);
				t.set('a_z', acceleration.z);
				t.set('a_t', acceleration.timestamp);
			}, function (error) {//error callback
				//do some error handling
			});}
            catch(err){
                console.log('error: '+err);
                //just set accel values to random values
                t.set('a_x', Math.floor((Math.random() * 10) + 1));
                t.set('a_y', Math.floor((Math.random() * 10) + 1));
                t.set('a_z', Math.floor((Math.random() * 4) + 1));
            }
            //console.log('test')
            //update accelerometer data graph
            var d = t.get('dataset');
            t.set('dataset', t.get('dummyData'));
            Ember.run.later(function(){
                if(d.columns[0].length >35){
                    d.columns[0].splice(1,1);//remove 2nd item from array
                    d.columns[1].splice(1,1);//remove 2nd item from array
                    d.columns[2].splice(1,1);//remove 2nd item from array
                }
                d.columns[0].push(t.get('a_x'));
                d.columns[1].push(t.get('a_y'));
                d.columns[2].push(t.get('a_z'));
                t.set('dataset',d);
                //console.log('New datapoint added');
            });
        }, 400);
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
        },
        accelerometer_poll: function(){
            var t = this;
            console.log(t.get('dataset'));
            var d = t.get('dataset');
            t.set('dataset', t.get('dummyData'));
            Ember.run.later(function(){
                if(d.columns[0].length >5){
                    d.columns[0].splice(1,1);//remove 2nd item from array
                    d.columns[1].splice(1,1);//remove 2nd item from array
                    d.columns[2].splice(1,1);//remove 2nd item from array
                }
                console.log(t);
                d.columns[0].push(Math.floor((Math.random() * 10) + 1));
                d.columns[1].push(Math.floor((Math.random() * 10) + 1));
                d.columns[2].push(Math.floor((Math.random() * 10) + 1));
                t.set('dataset',d);
                console.log('New datapoint added');
            });
        }
    }
});
