const id = ["pomodoro","break-5","break-15"] ;

var mainTimer = 0;
var downloadTimer = setInterval(function(){
    mainTimer++;
//document.getElementById("timer-pomodoro").textContent = timeleft;
if(mainTimer <= 0)
    clearInterval(downloadTimer);
},1000);

let Timer = class {
    seconds = 0;
    minuts = 0;
//test
    constructor(minuts, seconds) {
        //max minuts = 25
        //max seconds = 60
        this.seconds = seconds;
        this.minuts = minuts;
    }

    getSeconds(){
        return this.seconds;
    }

    setSeconds(seconds){
        this.seconds = seconds;
    }

    getMinuts(){
        return this.minuts;
    }

    setMinutes(minuts){
        this.minuts = minuts;
    }

    checkTimer(){
        if(this.seconds == 60){
            this.minuts++;
            this.seconds = 0;
        }
    }

    toString(){
        this.checkTimer();
        let str = "";
        if(this.minuts >= 10){
            str += this.minuts + ":";
        }
        else {
            str +="0"+this.minuts + ":";
        }
        if(this.seconds >= 10){
            str += this.seconds;
        }
        else {
            str +="0"+this.seconds;
        }
        return str;
    }

  };

const pomodoro = new Timer(25,60);
console.log(pomodoro.toString());