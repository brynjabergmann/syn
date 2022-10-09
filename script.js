const list = document.createDocumentFragment();
const url = 'https://api.stod2.is/dagskra/api';


//Function sem nær í channels
function getSchedule(channelId) {
    return fetch(`${url}/${channelId}`)
        .then(response => response.json());
}


// Function sem teiknar upp dagskránna
function addItems(channels) {
    channels.forEach((channel) => {
        const tableBodyElement = document.getElementById('channels');
        let channelRow = document.createElement('tr');
        let timeTd = document.createElement('td');
        const time = new Date(channel['upphaf']);
        timeTd.innerHTML = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        let nameTd = document.createElement('td');
        nameTd.innerHTML = channel['isltitill'];
        channelRow.appendChild(timeTd);
        channelRow.append(nameTd);
        tableBodyElement.appendChild(channelRow);
    });
    return channels;
}


//Function sem keyrir hinar functionirnar
function initialLoad() 
{
    getSchedule('stod2')
        .then(addItems)
        .then(console.logs);
}


function removeActive() 
{
    const navLinks = Object.values(document.getElementsByClassName('nav-link'));
    navLinks.forEach(element => 
    {
        element.classList.remove('active');
    })
}

window.addEventListener('DOMContentLoaded', (event) => 
{
    initialLoad()

    const navLinks = Object.values(document.getElementsByClassName('nav-link'));
    navLinks.forEach(element => 
    {
        element.addEventListener('click', (event) => 
        {
            const ulElement = document.getElementById('channels');
            ulElement.innerHTML = '';
            removeActive();
            const selectedChannel = event.target.id;
            const navItem = document.getElementById(selectedChannel);
            navItem.classList.add('active');
            getSchedule(selectedChannel)
                .then(addItems);
        });
    })
});
