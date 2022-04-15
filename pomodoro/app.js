const id = ["pomodoro","break-5","break-15"] ;

const myTime = new Intl.DateTimeFormat("default",{
    minute: "numeric",
    second: "numeric",
    hour12: false
})

const Timer = class {
    constructor(name, seconds) {
        this.name = name;
        this.seconds = seconds;
        this.date = new Date(0, 0, 0, 0, 0, 0, seconds);
        this.break = false;
    }

    togglePause(){
        this.break = !this.break;
    }

    startTimer(){
        var counter = setInterval(test.bind(this),1000);
        this.togglePause.bind(this);
        function test(){
            if(this.seconds <= 0){
                //console.log(this.seconds);
                this.date.setSeconds(this.seconds);
                console.log(myTime.format(this.date));
                clearInterval(counter);
            }
            else if(this.break){
                clearInterval(counter);
            }
            else {
                //console.log(this.seconds);
                this.date.setSeconds(this.seconds);
                console.log(myTime.format(this.date));
            this.seconds--;
            }
        }
    }
  };

// let date = new Date(0, 0, 0, 0, 0, 0, 0);
// date.setSeconds(1500);
// console.log(dateTimeFormat.format(date));

const pomodoro = new Timer("pomodoro",25);
pomodoro.startTimer();

console.log(pomodoro.name);