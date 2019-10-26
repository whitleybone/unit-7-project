///////////////////////
///// VARIABLES ///////
///////////////////////

const alert = document.querySelector('.alert');

const notificationCircle = document.querySelector('.nav--circle');
const notification = document.querySelector('.img--notification');
const notificationOverlay = document.querySelector('.overlay__notification');

const verificationDiv = document.querySelector('.verification');
const verificationClose = document.querySelector('.verification__close');

const messageDiv = document.querySelector('.message');
const messageClose = document.querySelector('.message__close');

const sendButton = document.querySelector('.btn--message-send');
const saveButton = document.querySelector('.btn--settings-save');
const emailSwitch = document.querySelector('.email');
const profileSwitch = document.querySelector('.profile');

const userSearch = document.querySelector('.user__search');
const userMessage = document.querySelector('.user__message');
const overlay = document.querySelector('#overlay');
const modalMessage = document.querySelector('.modal-message');

const closeModal = document.querySelector('.closeModal');

const checkboxes = document.querySelectorAll('.checkbox');
const timeZoneOptions = document.querySelector('.settings__timezone');

///////////////////////
///BUILDER FUNCTIONS///
///////////////////////
/**
 * Creates a new line chart with the given chart element
 * @param {object} chartElement 
 * @param {array} labels 
 * @param {array} data 
 * @param {object} yAxis 
 */
const createLineChart = (chartElement, labels, data, yAxis) => {
    new Chart(chartElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{ 
                data: data,
                borderColor: '#65619E',
                borderWidth: 1,
                backgroundColor: 'rgba(101, 97, 158, 0.15)',
                pointBackgroundColor: 'white',
                pointBorderWidth: 2,
                fill: 'origin',
                radius: 6,
                tension: 0,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: yAxis,
                    gridLines: {
                        offsetGridLines: true,
                    }
                }],
            }
        }
    });
};

/**
 * Creates a child element and appends it to a parent element. Class name and innerHTML are optional.
 * @param {object} parentElement 
 * @param {string} tagName 
 * @param {string} className 
 * @param {string} innerHTML 
 */
const createChildElement = (parentElement, tagName, className, innerHTML) => {
    const createdElement = document.createElement(tagName);
    parentElement.appendChild(createdElement);

    if (className) {
        createdElement.className = className;
    }

    if (innerHTML) {
        createdElement.innerHTML = innerHTML;
    }

    return createdElement;
};

///////////////////////
////// MEMBERS ////////
///////////////////////

let allMembers = [];
let members = [];

const membersActivity = [
    'posted YourApp\'s SEO Tips',
    'commented on Facebook\'s Changes for 2016',
    'liked the post Facebook\'s Changes for 2016',
    'commented on YourApp\'s SEO Tips',
];

const memberTime = [
    '1 day ago',
    '5 hours ago',
    '5 hours ago',
    '4 hours ago',
];

$.ajax({
    url: 'https://randomuser.me/api/?results=4&inc=name,picture,email,registered',
    dataType: 'json',
    error: function() {
        console.error('Request to fetch users failed');
    },
    success: function(response) {
        members = response.results;

        const formatName = function(name) {
            return name[0].toUpperCase() + name.slice(1);
        };

        // render members
        for (let i = 0; i < members.length; i++) {
            const { email, registered, picture, name } = members[i];

            const memberPicture = picture.thumbnail;
            const memberFirstName = formatName(name.first);
            const memberLastName = formatName(name.last);
            const memberName = `${memberFirstName} ${memberLastName}`;

            //NEW MEMBERS
            const membersEl = document.querySelector('.new-members');

            const membersDiv = createChildElement(membersEl, 'div', 'members');
            const memberImgContainer = createChildElement(membersDiv, 'div');

            const memberImg = createChildElement(memberImgContainer, 'img', 'members--img');
            memberImg.src = memberPicture;

            const memberInfoContainer = createChildElement(membersDiv, 'div', 'members__info');
            createChildElement(memberInfoContainer, 'p', 'members__name', memberName);
            createChildElement(memberInfoContainer, 'p', 'members__email', email);

            const memberRegContainer = createChildElement(membersDiv, 'div', 'members__reg');
            createChildElement(memberRegContainer, 'p', null, new Date(registered).toLocaleDateString('en-US'));
            
            //RECENT ACTIVITY
            const memberActContainer = document.querySelector('.recent-activity');
            const memberContainer = createChildElement(memberActContainer, 'div', 'members');

            const memberActImgContainer = createChildElement(memberContainer, 'div');

            const memberActImg = createChildElement(memberActImgContainer, 'img', 'members--img');
            memberActImg.src = memberPicture;

            const memberActInfoContainer = createChildElement(memberContainer, 'div', 'members__info');
            createChildElement(memberActInfoContainer, 'p', 'members__name', `${memberName} ${membersActivity.pop()}`);
            createChildElement(memberActInfoContainer, 'p', 'members__time', memberTime.pop());
            createChildElement(memberContainer, 'div', 'chevron');
           
            // AUTOCOMPLETE FEATURE
            const datalist = document.querySelector('#searchableMembers');
            createChildElement(datalist, 'option', null, memberName);               
        }     
    },
});

///////////////////////
/// EVENT LISTENERS ///
///////////////////////

/////////////////////////////
//ALERT MODAL EVENT LISTENER/
/////////////////////////////

//Add alert message to document
document.addEventListener('DOMContentLoaded', () => {
    const alertUl = createChildElement(alert, 'ul');
    createChildElement(alertUl, 'span', 'alert-span', 'Alert');
    createChildElement(alertUl, 'li', null, 'Nullam quis risus eget urna mollis ornare cel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor.')
    
    const alertCloseLi = createChildElement(alertUl, 'li', 'alert-close', 'x');

    //When user clicks 'X' alert message closes
    alertCloseLi.addEventListener('click', () => {
        alert.remove();
    });

    overlay.style = 'display:none';
});

/////////////////////////////
//NOTIFICATION EVENT LISTENER
/////////////////////////////

//When user clicks bell icon, notification modal pops up
notification.addEventListener('click', () => {
    notificationOverlay.style = 'display:inline-block';
});

//When user clicks 'X' modal closes
verificationClose.addEventListener('click', () => {
    verificationDiv.remove();
    removeOverlay();
});

messageClose.addEventListener('click', () => {
    messageDiv.remove();
    removeOverlay();
});

//removes overlay if notificationOverlay is empty
function removeOverlay() { 
    if (notificationOverlay.innerText === '') {
        notificationOverlay.remove();
        notificationCircle.remove();
    }
}

/////////////////////////////
//USER MODAL EVENT LISTENER//
/////////////////////////////

//When user clicks send button a modal pops up
sendButton.addEventListener('click', () => {
    event.preventDefault();
    
    //When search user and message field are empty
    if (userSearch.value.length === 0 || userMessage.value.length === 0) {
        modalMessage.innerHTML = 'Missing required field';
        overlay.style = 'display: block';
    }
    else {
        modalMessage.innerHTML = 'Message sent';
        overlay.style = 'display: block';
        userSearch.value = '';
        userMessage.value = '';
    }
});

//When user clicks 'X' modal closes
closeModal.addEventListener('click', () => {
    overlay.style = 'display: none';
});

///////////////////////
/// LOCAL STORAGE /////
///////////////////////

saveButton.addEventListener('click', function () {
    localStorage.selectedIndex = timeZoneOptions.selectedIndex;
    localStorage.profileState = profileSwitch.checked;
    localStorage.emailState = emailSwitch.checked;
    localStorage.isSaved = true;
});

if (localStorage.isSaved) {
    profileSwitch.checked = JSON.parse(localStorage.profileState);
    timeZoneOptions.selectedIndex = localStorage.selectedIndex;
    emailSwitch.checked = JSON.parse(localStorage.emailState);
}

///////////////////////
/////// CHARTS ////////
///////////////////////

// LINE CHART
const trafficChart = document.getElementById('lineChart');
createLineChart(trafficChart,
    ['week-1', 'week-2', 'week-3', 'week-4', 'week-5', 'week-6', 'week-7'],
    [15, 1, 7, 18, 14, 3, 8],
    {max: 20, min: 0, stepSize: 0}
);

const chartFilter = document.querySelector('.chart-filter');
chartFilter.addEventListener('click', (e) => {

    for (let i = 0; i < chartFilter.children.length; i++) {
        chartFilter.children[i].classList.remove('focus');
      }

      if (e.target.innerText.toUpperCase() === 'HOURLY') {
        e.target.classList.add('focus');
      }

      if (e.target.innerText.toUpperCase() === 'DAILY') {
        e.target.classList.add('focus');
      }

      if (e.target.innerText.toUpperCase() === 'WEEKLY') {
        e.target.classList.add('focus');
      }

      if (e.target.innerText.toUpperCase() === 'MONTHLY') {
        e.target.classList.add('focus');
      }
     

    if (e.target.tagName === 'BUTTON') {
        if (e.target.id === 'hourly') {
            createLineChart(trafficChart,
                ['12:00AM', '1:00AM', '2:00AM', '3:00AM', '4:00AM', '5:00AM', '6:00AM', '7:00AM', '8:00AM'],
                [500, 450, 800, 1025, 1500, 1900, 1600, 1203, 1005],
                {max: 2000, min: 0, stepSize: 250}
            ); 
        }
        
        if (e.target.id === 'daily') {
            createLineChart(trafficChart,
                ['M', 'T', 'W', 'TH', 'F', 'S', 'SU'],
                [7, 2, 4, 0, 9, 5, 3],
                {max: 10, min: 0, stepSize: 0}
            );
        }

        if (e.target.id === 'weekly') {
            createLineChart(trafficChart,
                ['week-1', 'week-2', 'week-3', 'week-4', 'week-5', 'week-6', 'week-7'],
                [15, 1, 7, 18, 14, 3, 8],
                {max: 20, min: 0, stepSize: 0}
            );
        }

        if (e.target.id === 'monthly') {
            createLineChart(trafficChart,
                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep'],
                [25, 156, 198, 120, 80, 55, 100, 120, 145],
                {max: 200, min: 0, stepSize: 25}
            );
        }
    }
});

// BAR CHART
const dailyTrafficChart = document.getElementById('barChart')
const context = dailyTrafficChart.getContext('2d');
new Chart(dailyTrafficChart.getContext('2d'), {
    type: 'bar',
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
            label: 'DAILY TRAFFIC',
            data: [75, 100, 175, 125, 225, 215, 100],
            backgroundColor: [
                '#65619E',
                '#65619E',
                '#65619E',
                '#65619E',
                '#65619E',
                '#65619E',
                '#65619E',
            ],
            borderColor: [
                '#65619E',
                '#65619E',
                '#65619E',
                '#65619E',
                '#65619E',
                '#65619E',
                '#65619E',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

//DONUT CHART
const mobileUserChart = document.getElementById('donutChart');
new Chart(mobileUserChart, {
    type: 'doughnut',
    data: {
        labels: [
            'Phone',
            'Tablet',
            'Desktop',
        ],
        datasets: [{
            data: [15, 15, 75],
            backgroundColor: [
                '#6099AF',
                '#78C9A6',
                '#65619E',
            ],
            borderColor: [
                '#6099AF',
                '#78C9A6',
                '#65619E',
            ]
        }],     
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'right',
            labels: {
                boxWidth: 15,
                padding: 20,
            }
        },
    }
});
