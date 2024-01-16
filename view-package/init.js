const firebaseConfig = {
    apiKey: "AIzaSyCdihIiuWGDPxeTTwvOxl0m5gcTDACYHAo",
    authDomain: "azoraadsfamily.firebaseapp.com",
    databaseURL: "https://azoraadsfamily-default-rtdb.firebaseio.com",
    projectId: "azoraadsfamily",
    storageBucket: "azoraadsfamily.appspot.com",
    messagingSenderId: "7623121422",
    appId: "1:7623121422:web:51595ab4fb5b51af3fba5f",
    measurementId: "G-NJM19CQ9LZ"
};

const firebase3 = firebase.initializeApp(firebaseConfig, 'Secondary');


const se = new URLSearchParams(window.location.search);
var id = se.get('trackid');
var idHolder = document.getElementById('id_holder');
idHolder.innerHTML = id;

var title_txt = document.getElementById('title');
var email_txt = document.getElementById('email');
var amount_txt = document.getElementById('amount');

var pro_cont = document.getElementById('projects');

var buff = document.getElementById('buffer-lin');
var main = document.getElementById('primary');

const pbutton = document.getElementById("myButton");
const tooltip = document.getElementById("myTooltip");

const profBg = document.getElementById('prof-bg');
const profile = document.getElementById('profile');



loadData(id)

function loadData(id) {
    firebase3.database().ref('/packages/4daYD7YIJeN5GiTX8UyVA89y0M82/' + id).once("value").then(snapshot => {
        buff.style.display = 'none';
        main.style.display = 'block';
        let title_val = snapshot.child('name').val();
        let email_val = snapshot.child('email').val();
        let promotion = snapshot.child('promotion').val();
        let url = snapshot.child('url').val();
        if (url=="") {
            profBg.style.display='none';
            profile.style.display='none'
        } else {
            profile.src=url;
        }
        amount_txt.innerHTML = "Payment Remaining : ₹" + snapshot.child('amount').val();
        let data = JSON.parse(snapshot.child('data').val());
        if (title_val==null) {
            main.style.display = 'none';
            alert('Invalid Package Id')
        }
        arrange(title_val, email_val, promotion, data);
    });
    
}

function arrange(ti, ema, pr, data) {
    title_txt.textContent = "Hello , " + ti;
    email_txt.textContent = "Email : " + ema;
    if (pr == 'np') {
        pbutton.style.display = 'none';
    }
    else if (pr == 'vc') {
        tooltip.innerHTML = 'Verified Client';
        pbutton.src = '/assets/images/badges/verified.png';
    }
    else if (pr == 'dc') {
        tooltip.innerHTML = 'Daily Client';
        pbutton.src = '/assets/images/badges/daily.png';
    }
    else if (pr == 'sc') {
        tooltip.innerHTML = 'Super Client';
        pbutton.src = '/assets/images/badges/super.png';
    }
    else if (pr == 'pc') {
        tooltip.innerHTML = 'Premium Client';
        pbutton.src = '/assets/images/badges/premium.png';
    }
    else if (pr == 'fc') {
        tooltip.innerHTML = 'Favourite Client';
        pbutton.src = '/assets/images/badges/favourite.png';
    }
    else if (pr == 'b') {
        tooltip.innerHTML = 'Broker';
        pbutton.src = '/assets/images/badges/broker.png';
    } else {
        pbutton.style.display = 'none';
    }
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            var child = document.createElement('div');
            child.className = 'child';
            var link = document.createElement('a');
            link.className = 'link';
            link.innerText = key;
            link.href = '/view-project/?trackid=' + key;
            var line = document.createElement('div');
            line.className = 'line';
            var label = document.createElement('label');
            label.innerHTML = value;

            child.appendChild(link);
            child.appendChild(line);
            child.appendChild(label);
            pro_cont.appendChild(child);
        }
    }
}



pbutton.addEventListener("mouseover", () => {
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = 1;
});

pbutton.addEventListener("mouseout", () => {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = 0;
});



