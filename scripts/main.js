( () => {
    let   mediaRecorder
    const recordedChunks = [];

    async function DOMLoaded()
    {
        const recordStart = document.getElementById('recordStart')
        if (recordStart) {
            recordStart.addEventListener('click', mediaRecorderStart)
        }

        const recordStop = document.getElementById('recordStop')
        if (recordStop) {
            recordStop.addEventListener('click', mediaRecorderStop)
        }

        const player = document.getElementById('player')
        if (!player) return

        const source = await navigator.mediaDevices.getUserMedia({ audio : true, video : false })
        if (window.URL)
        {
            player.srcObject = source
            return
        }
        player.src = source
    }

    mediaRecorder  = new MediaRecorder(stream, {mimeType: 'audio/webm'});
    if (mediaRecorder)
    {
        mediaRecorder.addEventListener('dataavailable', mediaRecorderData)
    }

    function mediaRecorderStart()
    {
        mediaRecorder.start();
    }

    function mediaRecorderStop()
    {
        mediaRecorder.stop();
    }

    function mediaRecorderData(e)
    {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
    
          if(shouldStop === true && stopped === false) {
            mediaRecorder.stop();
            stopped = true;
          }
    }

    document.addEventListener('DOMContentLoaded', DOMLoaded)
})()