const forms = document.forms.searchweather;
const searchbar = forms.inputweather;
const container = document.querySelector('.weatherinfo');
forms.addEventListener("submit", (en) => {
  en.preventDefault();
  container.innerHTML = "";
  if (searchbar.value === "") {
    return;
  } else {
    fetch(`https://test-chewhong12.b4a.run/weather?country=${searchbar.value}`)
      .then((response) => {
        console.log(response);
        if(response.ok){
            return response.json();
        }else{
            throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
      })
      .then((data) => {
        const mark = searchbar.value.split(' ');
        const newarr =mark.map(en=>{
            return upward = en[0].toUpperCase().concat(en.slice(1));
        }).join(' ');

        const markup = ` 
         <div>
        <h1>${newarr}</h1>
        <h4>Temperature : ${data.temperature}</h4>
        </div>
        `
        container.insertAdjacentHTML('afterbegin',markup);
      })
      .catch((err) =>{
        const markup = ` 
        <div>
        <h1 class="ErrorHeader"><span class="material-symbols-outlined">warning </span>Error 404</h1>
        <h4>${err}</h4>
       </div>
       `
       container.insertAdjacentHTML('afterbegin',markup);
       
      });
  }
});

(function () {
  var current = location.pathname.split("/")[1];
  if (current === "") return;
  var menuItems = document.querySelectorAll(".nav-link");

  for (var i = 0, len = menuItems.length; i < len; i++) {
    if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
      menuItems[i].className += " active";
    }
  }
})();
