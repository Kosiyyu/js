const id = ["pomodoro","break-5","break-15"] ;

const Timer = class {
    constructor(name, seconds) {
        this.name = name;
        this.seconds = seconds;
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
                console.log(this.seconds);
                clearInterval(counter);
            }
            else if(this.break){
                clearInterval(counter);
            }
            else {
                console.log(this.seconds);
            this.seconds--;
            }
        }
    }
  };

const pomodoro = new Timer("pomodoro",3);
pomodoro.startTimer();


