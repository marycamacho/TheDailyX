/**
 * Created by mary on 4/2/2016.
 */
function getData(){
    var dailyDataString = localStorage.getItem('dailyData');

    if (dailyDataString) {
        var data = JSON.parse(dailyDataString);
        data.dateStored =  data.dateStored || new Date();
        return data;
    } else {
        return {
            dateStored: new Date()
        };
    }

    /*// return {
        dateStored: new Date(),
        w1: 2,
        w2: 1,
        c1: 1,
        v1: 2
    };*/
}

function saveData(data){
    if (window.localStorage){
        var dataString = JSON.stringify(data);
        console.log(dataString);
        localStorage.setItem('dailyData',dataString);
    } else {
        alert('Local Storage not Supported');
    }
}


