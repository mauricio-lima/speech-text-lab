( () => {

    function DOMLoaded()
    {
        alert('DOM Loaded')
    }

    document.addEventListener('DOMContentLoaded', DOMLoaded)
})()