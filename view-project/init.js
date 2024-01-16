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
id = id.toUpperCase();
var idHolder = document.getElementById('id_holder');
idHolder.innerHTML = id;

var title_txt = document.getElementById('title');
var email_txt = document.getElementById('email');
var project_txt = document.getElementById('project');
var description_txt = document.getElementById('description');
var status_desc_txt = document.getElementById('status_desc');
var percentage_txt = document.getElementById('percentage');
var amount_txt = document.getElementById('amount');
var pay_status_txt = document.getElementById('pay_status');

var buff = document.getElementById('buffer-lin');
var main = document.getElementById('primary');

loadData(id)

function loadData(id) {
    firebase3.database().ref('/public/projects/' + id).once('value', function (snapshot) {
        snapshot.forEach(
            function (ChildSnapshot) {
                main.style.display = 'block';
                buff.style.display = 'none';
                let transaction = ChildSnapshot.val().transaction;
                let title_val = ChildSnapshot.val().name;
                let email_val = ChildSnapshot.val().email;
                let project_val = ChildSnapshot.val().content;
                let description_val = ChildSnapshot.val().paydes;
                let status_desc_val = ChildSnapshot.val().status;
                let amount_val = ChildSnapshot.val().amount;
                let pay_rec = ChildSnapshot.val().payrec;
                let pay_rem = ChildSnapshot.val().payrem;
                let pay_status_val = ChildSnapshot.val().paid;
                arrange(transaction, title_val, email_val, project_val, description_val, status_desc_val, amount_val, pay_rec, pay_rem, pay_status_val);
            }
        );
    });
}
function isDigit(character) {
    return !Number.isNaN(Number(character));
}
function arrange(tr, ti, ema, pro, des, sta, amo, rec, rem, pst) {
    title_txt.textContent = "Hello , " + ti;
    email_txt.textContent = "Email : " + ema;
    project_txt.textContent = "Projects : " + pro;
    description_txt.textContent = des;
    if (isDigit(sta)) {
        percentage_txt.textContent = sta;
        if (sta > 0) {
            status_desc_txt.textContent = "Your Project Is Going Well";
        }
        if (sta > 70) {
            status_desc_txt.textContent = "Your Project Is Going Well And Almost Going To Complete";
        }
    } else {
        if (sta == "Completed") {
            percentage_txt.innerHTML = "100";
            status_desc_txt.textContent = "Your Project Is Completed";
        }else{
            status_desc_txt.textContent = sta;
        }
    }
    amount_txt.textContent = "Amount : ₹" + amo;
    pay_status_txt.innerHTML = "Payment Status: " + pst + "<br>Payment Received: " + rec + "<br>Payment Remaining: " + rem;
    loadTr(tr);
}

var tralert = document.getElementById('tr-model');

function showTransaction(isShown) {
    if (isShown) {
        tralert.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
    } else {
        tralert.style.display = 'none';
        document.body.style.overflowY = 'scroll';
    }
}

var chtr = document.getElementById('chtr');

function loadTr(json) {
    try {
        const data = JSON.parse(json);

        // Check if data is an array
        if (Array.isArray(data)) {
            data.forEach(item => {

                var linear2 = document.createElement('div');
                linear2.className = 'linear2';

                var pdate = document.createElement('p')
                pdate.className = 'p-content';
                pdate.textContent = item.date;

                var pname = document.createElement('p')
                pname.className = 'p-content';
                pname.textContent = item.name;

                var ptype = document.createElement('p')
                ptype.className = 'p-content';
                if (item.type=="cash"){
                    ptype.textContent = "Cash Payment"
                }else if(item.type=="bt"){
                    ptype.textContent = "Bank Transfer"
                }else if(item.type=="upi"){
                    ptype.textContent = "UPI";
                }else{
                    ptype.textContent = item.type;
                }

                var pamount = document.createElement('p')
                pamount.className = 'p-content';
                pamount.textContent = "₹" + item.amount;

                linear2.appendChild(pdate);
                linear2.appendChild(pname);
                linear2.appendChild(ptype);
                linear2.appendChild(pamount);

                chtr.appendChild(linear2);
                
            });
        } else {
            console.error('Transaction Data Malformed');
        }
    } catch (error) {
        console.error('Error parsing in Transaction Data:', error);
    }
}
