( () => {
    let   mediaRecorder
    let   source
    const recordedChunks = [];

    async function DOMLoaded()
    {
        const recordStart = document.getElementById('recordStart')
        if (recordStart) {
            recordStart.addEventListener('click', () => {
                mediaRecorder.start();
            })
        }

        const recordStop = document.getElementById('recordStop')
        if (recordStop) {
            recordStop.addEventListener('click', () => {
                mediaRecorder.stop();
            })
        }

        const player = document.getElementById('player')
        if (!player) return

        source = await navigator.mediaDevices.getUserMedia({ audio : true, video : false })


        mediaRecorder  = new MediaRecorder(source, {mimeType: 'audio/webm'});
        if (mediaRecorder)
        {
            mediaRecorder.addEventListener('dataavailable', mediaRecorderData)

            mediaRecorder.addEventListener('stop',          mediaRecorderStop)
        }
    }


    function mediaRecorderData(e)
    {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
    }


    function mediaRecorderStop()
    {
        const source = URL.createObjectURL(new Blob(recordedChunks))
        const player = document.getElementById('player')
        if (!player) return

        player.src = source
    }

    document.addEventListener('DOMContentLoaded', DOMLoaded)
})()