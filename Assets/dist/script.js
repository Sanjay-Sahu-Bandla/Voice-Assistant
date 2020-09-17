// var greetings = ['how are you', 'how is it going on', 'hello'];
var greetings = ['I\'m fine', 'everything is good', 'can\'t be better'];
var jokes = ['How many times can you subtract 10 from 100? Once. The next time you would be subtracting 10 from 90.', 'Why don’t scientists trust atoms? Because they make up everything.', 'What is an astronaut’s favourite part on a computer? The space bar.'];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.onresult = function(event) {
    
    const transcript = event.results[0][0].transcript;
    
    if (event.results.length > 0) {

        $('#chatbox ul li.listening').remove();
        $output.append('<li class="user-command">'+transcript+'</li>');
        check_anything_to_say(transcript);
    }
    else {
        alert("Sorry ! I didn't get anything sanjay");
    }
    
    $('#mic i').removeClass('text-info');
}

function check_anything_to_say(message) {
    
    const speech = new SpeechSynthesisUtterance();
    
    speech.text = message;
    speech.rate = 1;
    speech.volume = 1;
    speech.pitch = 1;
    
    var pre = 'selena ';    
    var today = new Date();
    
    message = message.toLowerCase();
    
    // personal commands
    if(message == pre+'open my portfolio') {
        
        speech.text = 'Opening portfolio...';
        window.speechSynthesis.speak(speech);
        window.open('http://sanjaybandla.ml', '_blank');
        return;
    }
    else if(message == pre+'open my github') {
        
        speech.text = 'Opening GitHub...';
        window.speechSynthesis.speak(speech);
        window.open('https://github.com/Sanjay-Sahu-Bandla', '_blank');
        return;
    }
    
    // likely commands
    var commands = ["what is", "calculate", "how are you", "what time is it", "what day is it", "joke"];
    var command_seq;
    
    for(var i=0; i<commands.length; i++) {
        
        if(message.includes(commands[i])) {
            command_seq = i;
        }
        
    }
    
    switch(command_seq) {
        case 0: 
        speech.text = 'Searching...';
        window.open('https://www.google.com/search?q='+message, '_blank');
        break;
        
        case 1:
        speech.text = 'Calculating...';
        window.open('https://www.google.com/search?q='+encodeURIComponent(message), '_blank');
        break;
        
        case 2:
        speech.text = greetings[Math.floor(Math.random() * greetings.length)];
        break;
        
        case 3:
        
        speech.text = 'The time is '+timeConvert(today.getHours() + ":" + today.getMinutes());
        break;
        
        case 4:
        var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];            
        speech.text = 'Today is '+weekday[today.getDay()];
        break;

        case 5:
        speech.text = jokes[Math.floor(Math.random() * jokes.length)];
        break;
        
        default:
        speech.text = 'Sorry! I don\'t recognize what you said';
        break;
    }
    
    function timeConvert (time) {

        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        
        if (time.length > 1) {
            time = time.slice (1);
            time[5] = +time[0] < 12 ? 'AM' : 'PM';
            time[0] = +time[0] % 12 || 12;
        }
        return time.join ('');
    }

    $output.append('<li class="system-output">'+speech.text+'</li>');
    $('#main').scrollTop($('#main')[0].scrollHeight);
    window.speechSynthesis.speak(speech);
    
}

$(document).ready(function() {

    $output = $('#chatbox ul');
    
    $('#mic i').click(function() {
        
        $(this).toggleClass('text-info');
        recognition.start();
        $output.append('<li class="system-output listening">Listening...</li>');
        $('#main').scrollTop($('#main')[0].scrollHeight);
    });
});

