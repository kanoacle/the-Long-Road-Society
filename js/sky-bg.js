/*jshint esversion: 6*/
const  currHour = new Date().getHours();
const  currMin = new Date().getMinutes();
const currentTime = `${currHour}:${currMin}`;
const timeStore = {
  sunrise: undefined,
  sunset: undefined
};
const makeRequest = function(method, url, body) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (body) {
      xhr.setRequestHeader("Content-type", "application/json");
    }
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {

        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    (body) ? xhr.send(body) : xhr.send();
  });
};
const getData = function() {
  return new Promise(function (resolve, reject) {
    let data = makeRequest('GET', `http://api.openweathermap.org/data/2.5/weather?q=SanFrancisco&appid=${API_KEY}`)
    .then(info => {
        let rise = JSON.parse(info).sys.sunrise;
        let set = JSON.parse(info).sys.sunset;
        let riseTime = new Date(rise*1000);
        let setTime = new Date(set*1000);
        let sunrise = `${riseTime.getHours()}:${riseTime.getMinutes()}`;
        let sunset = `${setTime.getHours()}:${setTime.getMinutes()}`;
        resolve([sunrise, sunset]);
    });
  });
};

const timeCheck = function() {
  let wrapper = document.querySelector('.wrapper');
  let sky = document.querySelector('.sky');
  let logo = document.querySelector('.logo');
  let nowHours = currentTime.split(':')[0];
  let nowMin = currentTime.split(':')[1];
  return getData()
  .then((data) => {
    let riseH = Number(data[0].split(':')[0]);
    let riseM = Number(data[0].split(':')[1]);
    let setH = Number(data[1].split(':')[0]);
    let setM = Number(data[1].split(':')[1]);
    if (nowHours > setH || nowHours < riseH) {
      wrapper.removeAttribute('class');
      wrapper.className = 'night-wrapper';
      sky.removeAttribute('class');
      sky.className = 'nightsky';
      logo.style.filter = 'invert(75%)';
    } else if (nowHours == setH && nowMin >= setM || nowHours == riseH && nowMin <= riseM) {
      wrapper.removeAttribute('class');
      wrapper.className = 'night-wrapper';
      sky.removeAttribute('class');
      sky.className = 'nightsky';
      logo.style.filter = 'invert(75%)';
    } else {
      sky.removeAttribute('class');
      sky.className = 'sky';
    }
  });
};
timeCheck();