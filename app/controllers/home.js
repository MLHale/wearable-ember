import Ember from 'ember';
//import metawear from "vendor/metawear";

export default Ember.Controller.extend({
	needs: ['application'],
    a_x: 'null',
    a_y: 'null',
    a_z: 'null',
    a_t: 'null',
    errors: 'none',

    //graph variables for accelerometer plotting
    dummyData: {
            xs: {},
            json: {},
            type: 'timeseries',
            empty: {
                label: {
                    text: 'No Data'
                }
            }
    },
    dataset: {
        x: 'time',
        columns: [
                ['time', Date.now()],
                ['x', 0],
                ['y', 0],
                ['z', 0],
        ],
        type: 'line',
        interaction: { enabled: false}
    },
    temp: {

    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%S.%L'
            },
            label: 's:ms'
        },
        y: {
            label: 'm/s^2'
        }
    },
    chartSize: {
        width: 300,
    },
    interaction: {
        enabled: false
    },
    transition: {
        duration: 100
    },
    update: false,
    isHome: function(){
        if(this.get('controllers.application.currentPath')){
            this.gatherAccel(this);
        }
    }.observes('controllers.application.currentPath'),
    init: function () {
        this._super();
        //this.gatherAccel(this);
    },
    gatherAccel: function(t){
        Ember.run.later(function(){
            console.log('entering 1st run loop');
            //get accelerometer data
            try {
                console.log('entering try block');

                navigator.accelerometer.getCurrentAcceleration(function (acceleration) {//success callback
                    console.log('acceleration setvars called');
                    t.set('a_x', acceleration.x);
                    t.set('a_y', acceleration.y);
                    t.set('a_z', acceleration.z);
                    //t.set('a_t', acceleration.timestamp);
                    console.log("accel vals: x: "+ acceleration.x+ " y: "+acceleration.y+" z: "+acceleration.z+" t: "+ Date.now());
                }, function (error) {//error callback
                    console.log('error: ' + error);
                });
            }
            catch(err){
                console.log('error: '+err);
                //just set accel values to random values
                t.set('a_x', Math.floor((Math.random() * 10) + 1));
                t.set('a_y', Math.floor((Math.random() * 10) + 1));
                t.set('a_z', Math.floor((Math.random() * 4) + 1));
                //t.set('a_t', new Date());
            }
            //update accelerometer data graph
            var newCols = t.get('dataset.columns');
            //t.set('dataset', t.get('dummyData'));
            Ember.run.later(function(){
                console.log('entering 2nd run loop');
                if(newCols[0].length >10){
                    newCols[0].splice(1,1);//remove 2nd item from array
                    newCols[1].splice(1,1);//remove 2nd item from array
                    newCols[2].splice(1,1);//remove 2nd item from array
                    newCols[3].splice(1,1);//remove 2nd item from array
                }
                console.log("x: "+ t.get('a_x')+ " y: "+t.get('a_y')+" z: "+t.get('a_z')+" t: "+ Date.now());
                newCols[0].push(Date.now());
                newCols[1].push(t.get('a_x'));
                newCols[2].push(t.get('a_y'));
                newCols[3].push(t.get('a_z'));
                t.set('dataset.columns',newCols);
                t.set('update',!(t.get('update')));
                

                //check path, stop recursion when home is not the current page
                if(t.get('controllers.application.currentPath')==='home'){
                    t.gatherAccel(t);
                }
                
            }, 250);
        }, 500);
        
    },
    actions: {
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
        },
    }
});
