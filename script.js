const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/17ZkGuV9VnVCTv6GrLJOfNOn3c5Ia62rQLc3F6D7H3F4/values/scenario?key=AIzaSyD60g49V7F_HJ3RVb0GoL9RW_WpqOJxvKE'; // ← ここを自分のスプレッドシートに変更
let scenarioData = []
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById('list');
        list.innerHTML = '';

          data.values.forEach((row, index) => {
            if(index===0)return
            scenarioData.push(row)
        });
      })
      .catch(error => {
        console.error('取得エラー:', error);
        document.getElementById('list').innerHTML = '<li>データ取得に失敗しました。</li>';
      });
      
      window.onload = function() {
        // 実行したい処理
        const data = scenarioData
        data.sort((a, b) => {
          const titleA = (a[1] ?? '').trim().normalize();
          const titleB = (b[1] ?? '').trim().normalize();
          return titleA.localeCompare(titleB, 'ja', { sensitivity: 'base' });
        });
        data.forEach(d => console.log(d[1]));
        data.forEach((row, index) => {　

            const li = document.createElement('li');
            let hoText = ""
            let status = ""
            if(row[6])hoText=`<span class="ho">〔${row[6]}〕</span>`
            if(row[3]){
              if(row[3]==="通過済み")status = "<span class='sumi'>済</span>"
              if(row[3]==="通過予定")status = "<span class='yotei'>予</span>"
            }
            li.innerHTML = `<strong class="title">${row[1]}</strong><span class="rub">【${row[0]}】</span>${hoText}<span class="status">${status}</span><span class="info">${row[2]}</span>
            `;
            list.appendChild(li);
        })
     }
