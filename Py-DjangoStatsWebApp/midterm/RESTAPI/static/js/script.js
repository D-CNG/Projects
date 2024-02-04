function writePhaseMenu(){
    console.log("Phase Menu written")
    var request = new XMLHttpRequest();
    var url = '/api/phase';
    request.onreadystatechange = function(){
        if(this.readyState ==4 &&(this.status >= 200 && this.status<400)){
            var data = JSON.parse(this.responseText);
            // console.log(data)
            var phase_menu_div = document.getElementById("phases-display");
            phase_menu_div.innerHTML = JSON.stringify(data,null,2)
        }
        else if(this.status>400 ||(this.status>0 && this.status<200)){
            console.log("phase list request failed: "+this.status);
        }
    };
    request.open("GET", url, true);
    request.send();
}

function writeDateMenu(){
    console.log("Date Menu written")
    var request = new XMLHttpRequest();
    var url = '/api/date';
    request.onreadystatechange = function(){
        if(this.readyState ==4 &&(this.status >= 200 && this.status<400)){
            var data = JSON.parse(this.responseText);
            console.log(data)
            var date_menu_div = document.getElementById("date-display");
            date_menu_div.innerHTML = JSON.stringify(data,null,2)
        }
        else if(this.status>400 ||(this.status>0 && this.status<200)){
            console.log("date range request failed: "+this.status);
        }
    };
    request.open("GET", url, true);
    request.send();
}

function writeCovidMenu(){
    console.log("Covid Menu written")
    var request = new XMLHttpRequest();
    var url = '/api/covid/2021-10-11';
    request.onreadystatechange = function(){
        if(this.readyState ==4 &&(this.status >= 200 && this.status<400)){
            var data = JSON.parse(this.responseText);
            console.log(data)
            var covid_menu_div = document.getElementById("covid-display");
            covid_menu_div.innerHTML = JSON.stringify(data,null,2)
        }
        else if(this.status>400 ||(this.status>0 && this.status<200)){
            console.log("covid menu request failed: "+this.status);
        }
    };
    request.open("GET", url, true);
    request.send();
}

function writeHospitalMenu(){
    console.log("Hospital Menu written")
    var request = new XMLHttpRequest();
    var url = '/api/hospital/2021-10-11';
    request.onreadystatechange = function(){
        if(this.readyState ==4 &&(this.status >= 200 && this.status<400)){
            var data = JSON.parse(this.responseText);
            console.log(data)
            var hospital_menu_div = document.getElementById("hospital-display");
            hospital_menu_div.innerHTML = JSON.stringify(data,null,2)
        }
        else if(this.status>400 ||(this.status>0 && this.status<200)){
            console.log("covid menu request failed: "+this.status);
        }
    };
    request.open("GET", url, true);
    request.send();
}

function writeListMenu(){
    console.log("List Menu written")
    var request = new XMLHttpRequest();
    var url = '/api/list/2021-10-11';
    request.onreadystatechange = function(){
        if(this.readyState ==4 &&(this.status >= 200 && this.status<400)){
            var data = JSON.parse(this.responseText);
            console.log(data)
            var list_menu_div = document.getElementById("list-display");
            list_menu_div.innerHTML = JSON.stringify(data,null,2)
        }
        else if(this.status>400 ||(this.status>0 && this.status<200)){
            console.log("covid menu request failed: "+this.status);
        }
    };
    request.open("GET", url, true);
    request.send();
}

function writeStatMenu(){
    console.log("Stat Menu written")
    var request = new XMLHttpRequest();
    var url = '/api/stats/CovidStats/positive';
    request.onreadystatechange = function(){
        if(this.readyState ==4 &&(this.status >= 200 && this.status<400)){
            var data = JSON.parse(this.responseText);
            console.log(data)
            var stat_menu_div = document.getElementById("stat-display");
            stat_menu_div.innerHTML = JSON.stringify(data,null,2)
        }
        else if(this.status>400 ||(this.status>0 && this.status<200)){
            console.log("covid menu request failed: "+this.status);
        }
    };
    request.open("GET", url, true);
    request.send();
}

 
function initialisePage() {
    console.log("Page Initialised")
    writePhaseMenu();
    writeDateMenu();
    writeCovidMenu();
    writeHospitalMenu();
    writeListMenu();
    writeStatMenu();
}
