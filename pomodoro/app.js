"use strict"

// const cycleText = ["pomodoro","break-5","pomodoro","break-5","pomodoro","break-5","pomodoro","break-15"];
const cycleValue = [1499,299,1449,299,1499,299,1499,899];

var cycleCounter = 0;

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
                //
                if(cycleCounter != 7){
                    cycleCounter++;
                }
                else {
                    cycleCounter = 0;
                }
                this.date.setMinutes(0);
                this.seconds = cycleValue[cycleCounter];
                this.date.setSeconds(this.seconds + 1);
                this.updateTimer(myTime.format(this.date));
                var audio = new Audio('achievement-bell.WAV')
                audio.play();
                this.startTimer();
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

    // testTool(seconds){
    //     this.date.setMinutes(0);
    //     this.seconds = seconds;
    //     this.date.setSeconds(this.seconds);
    // }

  };

const pomodoro = new Timer("pomodoro",cycleValue[cycleCounter]);
pomodoro.updateButton();