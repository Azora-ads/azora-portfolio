import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.14.1-0/firebase.js"


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

const app = firebase.initializeApp(firebaseConfig);


function FetchAllData() {
  var position = 0;
  const serviceSet = new Set();
  app.database().ref('promotion').once('value', function (snapshot) {
    snapshot.forEach(
      function (ChildSnapshot) {
        let title = ChildSnapshot.val().name;
        let desc = ChildSnapshot.val().desc;
        let rate = parseInt(ChildSnapshot.val().rate) + 21;
        let id = ChildSnapshot.val().id;
        let max = ChildSnapshot.val().max;
        let min = ChildSnapshot.val().min;
        let service = ChildSnapshot.val().service;
        if (!serviceSet.has(service)) {
          serviceSet.add(service);
          addChip(service);
        }
        addToList(title, desc, rate, id, max, min, service, position);
        position = position + 1;
      }
    );
  });
}

FetchAllData();



function addToList(title, desc, rate, id, max, min, service, position) {
  const list = document.getElementById('list-container');

  const div1 = document.createElement('div');
  div1.className = 'col-x1-12 col-sm-6 col-md-4 sk__feature-col';

  const div2 = document.createElement('div');
  div2.className = 'sk__feature';

  const header = document.createElement('h5');
  header.className = 'header';
  header.innerHTML = title;

  const lineDiv = document.createElement('div');
  lineDiv.className = 'colorline-deco';
  const lineNormal = document.createElement('div');
  lineNormal.className = 'colorline-deco-normal sk__absolute';
  const lineHover = document.createElement('div');
  lineHover.className = 'colorline-deco-hover sk__absolute sk__gradient-back-v1';
  lineDiv.appendChild(lineNormal);
  lineDiv.appendChild(lineHover);

  const description = document.createElement('p');
  description.className = 'descs';
  description.innerHTML = "["+service+"]<br>"+desc;

  const priceTag = document.createElement('p');
  priceTag.innerHTML = '₹' + rate;

  const sliderLayout = document.createElement('div');
  sliderLayout.className = 'slider-layout';
  const label1 = document.createElement('input');
  label1.id = position + '-range';
  label1.value = min;
  label1.setAttribute("oninput", "document.getElementById('" + position + "-slider').value=this.value; document.getElementById('" + position + "-price').innerHTML='₹'+(this.value*" + rate + ")/1000; if(this.value>"+max+"){this.value="+max+"}");
  label1.setAttribute("onblur"," this.value = Math.round(this.value / 10) * 10; document.getElementById('" + position + "-slider').value=this.value; document.getElementById('" + position + "-price').innerHTML='₹'+(this.value*" + rate + ")/1000; if(this.value>"+max+"){this.value="+max+"}")
  const range = document.createElement('input');
  range.type = 'range';
  range.id = position+'-slider';
  range.className = 'input-range';
  range.min = 1000;
  range.max = max;
  range.value = min;
  range.step = 50;
  range.setAttribute("onchange", "document.getElementById('" + position + "-price').innerHTML='₹'+(this.value*" + rate + ")/1000; document.getElementById('" + position + "-range').value=this.value");
  const label2 = document.createElement('label');
  label2.innerHTML = max;
  sliderLayout.appendChild(range);
  sliderLayout.appendChild(label2);

  //const add = document.createElement('h1');
  //add.className = 'plus-btn';
  //add.innerHTML = '+';
  //add.setAttribute("onclick", "document.getElementById('"+position+"-slider').value = document.getElementById('"+position+"-slider').min+50; alert(document.getElementById('"+position+"-slider').value)");


  //const minus = document.createElement('h1');
 // minus.className = 'minus-btn';
  //minus.innerHTML = '-'


  //const opDiv = document.createElement('div');
  //opDiv.className = 'op-div';

  //opDiv.appendChild(minus);
  //opDiv.appendChild(add);

  const a = document.createElement('a');
  a.className = 'btn-purchase';
  const span1 = document.createElement('span');
  span1.id = position + '-price';
  span1.innerHTML = '₹' + rate;
  a.innerHTML = 'Purchase With ';
  a.className = 'link-btn';
  a.href = 'https://wa.me/+919544373558/?text=Hello Azora, \n i want a promotional sevice. \n ID : '+id+' \n'+a.textContent+"\n Count: "+label1.value+"\n Rate: "+rate+"\n Service: "+service;
  a.appendChild(span1);

  const button1 = document.createElement('button');
  button1.className = 'btn-txt';
  button1.innerHTML = 'ID : ' + id;

  div2.appendChild(header);
  div2.appendChild(lineDiv);
  div2.appendChild(description);
  div2.appendChild(priceTag);
  div2.appendChild(label1);
  //div2.appendChild(opDiv);
  div2.appendChild(sliderLayout);
  div2.appendChild(a);
  div2.appendChild(button1);
  div1.appendChild(div2);
  list.appendChild(div1)
}

var cl = document.getElementById("chip-layout");
function addChip(text) {
  var chip = document.createElement('div');
  var link = document.createElement('a');
  link.href='#services';
  link.textContent = text;
  chip.className = 'chips';
  chip.setAttribute("onclick", "chipClick('"+text+"');");
  chip.appendChild(link);
  cl.appendChild(chip);
}
