function init(){
  init_idol_list();


}

document.getElementById('idol_list').addEventListener('input', function(){
  const idol = this.value;
  console.log(idol);
  show_idol_and_niteru(idol);
});

function show_idol_and_niteru(idol){
  show_idol_profile(idol);
  show_niteru_idols(idol);
}

function init_idol_list(){
  let idol_list = [];
  for (let idol_name in idol_hobbies){
    idol_list.push({name: idol_name, office: idol_hobbies[idol_name]['事務所']});
  }
  idol_list.sort(function(a,b){
    if( a.office < b.office ) return -1;
    if( a.office > b.office ) return 1;
    if( a.name < b.name ) return -1;
    if( a.name > b.name ) return 1;
    return 0;
});
  let options_html = '';
  for (let idol of idol_list){
      options_html += `<option value="${idol.name}">${idol.name}</option>`;
  }
  //console.log(options_html);
  document.getElementById('idol_list').innerHTML = options_html;
  //初期値をランダムに
  const random_idol = idol_list[Math.floor(Math.random() * idol_list.length)];

  set_idol(random_idol.name)
}

function set_idol(idol){
  document.getElementById('idol_list').value = idol;
  show_idol_and_niteru(idol);
}

function show_idol_profile(idol_name){

  const idol_hobby = idol_hobbies[idol_name];
  let html = '';

  html = `
  <table class="table table-sm table-striped">
  `;
  for (let key in idol_hobby){
    html += `
    <tr>
      <td>${key}</td><td>${idol_hobby[key]}</td>
    </tr>
    `;
  }
  html += '</table>';

  document.getElementById('idol_profile').innerHTML = html;
}

function show_niteru_idols(idol_name){
  let html = '';
  html += '<table class="table table-sm table-striped">';
  const niteru_idols = niterus[idol_name];
  for (let niteru_idol of niteru_idols){
    if (niteru_idol.name == idol_name) continue;
    html += `
    <tr>
      <td><span onclick="set_idol('${niteru_idol.name}');" style="cursor : pointer;">${niteru_idol.name}</span></td>
      <td>${niteru_idol.my_hobby} × ${niteru_idol.idol_hobby}</td>
      <td>${Math.round(niteru_idol.similarity * 100)}%</td>
      <td>${idol_hobbies[niteru_idol.name]['事務所']}</td>
    </tr>
    `;
  }
  html += '</table>';
  document.getElementById('niteru_idols').innerHTML = html;
}