function solve() {

    let stopInfoEl = document.querySelector('.info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    
    stopInfoEl.textContent = "Not Connected";
    arriveBtn.disabled = true;

    let stopID = 'depot';
    let stopName = '';
    
    async function depart() {
        try {
            let response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopID}`);
    
            let data = await response.json();
    
            stopID = data.next;
            stopName = data.name;
    
            stopInfoEl.textContent = `Next stop ${stopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (e) {
            stopInfoEl.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }
    
    function arrive() {
        stopInfoEl.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }
    
    return {
        depart,
        arrive
    };
}

let result = solve();