'use strict';
{
  const start_btn = document.getElementById('start');
  const stop_btn = document.getElementById('stop');
  const clear_btn = document.getElementById('clear');
  const speech = new webkitSpeechRecognition();

  const box = document.getElementById('box');
  
  speech.lang = "ja-JP";
  ｓpeech.continuous = true;
  start_btn.addEventListener('click', () => {
    start_btn.disabled = true;
    stop_btn.disabled = false;
    speech.start();
  });
  stop_btn.addEventListener('click', () => {
    start_btn.disabled = false;
    stop_btn.disabled = true;
    start_btn.textContent = 'Start';
    speech.stop();
  });
  clear_btn.addEventListener('click', () => {
    box.innerHTML = "";
  });
  
  speech.onresult = (e) => {
    speech.stop();
    if (e.results[0].isFinal) {
      let div = document.createElement('div');
      div.textContent = e.results[0][0].transcript;
      box.appendChild(div);
    }    
  };
  speech.onend = (e) => {
    if (start_btn.disabled) {
      speech.start();
    }
  }
  speech.onsoundstart = () => {
    start_btn.textContent = 'Processing...';
  }
  speech.onsoundend = () => {
    start_btn.textContent = 'Waiting...';
  }
}
