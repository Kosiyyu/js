const id = ["pomodoro","break-5","break-15"] ;

const myTime = new Intl.DateTimeFormat("default",{
    minute: "numeric",
    second: "numeric",
    hour12: false
})

const Timer = class {
    constructor(id, seconds) {
        this.id = id;
        this.seconds = seconds;
        this.date = new Date(0, 0, 0, 0, 0, 0, seconds);
        this.break = true;
    }

    togglePause(){
        this.break = !this.break;
    }

    startTimer(){
        var counter = setInterval(test.bind(this),1000);
        this.togglePause.bind(this);
        function test(){
            if(this.seconds <= 0){
                this.date.setMinutes(0);
                this.date.setSeconds(this.seconds);
                this.updateTimer(myTime.format(this.date));
                clearInterval(counter);
            }
            else if(this.break){
                clearInterval(counter);
            }
            else {
                this.date.setMinutes(0);
                this.date.setSeconds(this.seconds);
                this.updateTimer(myTime.format(this.date));
            this.seconds--;
            }
        }
    }

    //update html
    updateTimer(seconds){
        const element = document.getElementById("timer-" + this.id);
        element.textContent = seconds;
    }

    //update html   
    updateButton(){
        const element = document.getElementById("button-" + this.id);
        function listen(){
            this.togglePause();
            if(this.break){
                element.textContent = "start";
            }
            else {
                if(!this.break){
                    this.startTimer(this.seconds);
                    element.textContent = "stop";
                }
            }
        }
        element.addEventListener("click", listen.bind(this))
    }

  };

const pomodoro = new Timer("pomodoro",1499);
const break5 = new Timer("break5",299)
const break15 = new Timer("break15",899)
pomodoro.updateButton();
break5.updateButton();
break15.updateButton();