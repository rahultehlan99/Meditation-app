const app = () => {

   const song = document.querySelector('.song');
   const play = document.querySelector('.play');

   const sounds = document.querySelectorAll('.sound-picker button');
   const timedisplay = document.querySelector('.time-display');
   const timeselect = document.querySelectorAll('.time-select button');

   //duration
   let duration = 0;
   let currduration = 0;
   let x;

   //pick different sound
   for(let i=0;i<sounds.length;i++)
   {
       sounds[i].addEventListener("click",function(){
           
          song.src=this.getAttribute("data-sound");
         
          
          if(!duration)
          {
              alert("Please select a duration!!");
              return;
          }
          
          currduration=duration;

          clearInterval(x);
          checkplaying(song);
       });
   }
 

   play.addEventListener("click",function(){
        
       // function to stop/play
       if(!duration)
       {
           alert("Please select a duration!!");
           return;
       }
        
        if(currduration==0)
        currduration=duration;

        checkplaying(song);
   });

  
   timeselect.forEach(option=>{
    option.addEventListener("click",function(){
        duration = this.getAttribute("data-time");
        timedisplay.textContent = `${Math.floor(duration/60)}:${duration%60}`;  
        currduration=duration;
        checkplaying(song); 
     });
    });


   
   const checkplaying = song =>{
    
    if(song.paused)
    {
        x = setInterval(computetime,1000);

        song.play();
        play.src="pausedbtn.png";
    }
    else{
        
        clearInterval(x);
        
        song.pause();
        play.src="playbtn.jpg";
    }

   }

  
    function computetime()
    {
       
        currduration--;

        let minutes = Math.floor(currduration/60);
        let seconds = Math.floor(currduration%60);

        if(minutes<10)
        minutes="0"+minutes;
  
        if(seconds<10)
        seconds="0"+seconds;
  
        timedisplay.textContent = `${minutes}:${seconds}`;
   
        if(currduration<=0)
        {
              clearInterval(x);
              play.src="playbtn.jpg";
              song.pause();
        }
    }

};

app();