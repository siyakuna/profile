const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/17ZkGuV9VnVCTv6GrLJOfNOn3c5Ia62rQLc3F6D7H3F4/values/scenario?key=AIzaSyD60g49V7F_HJ3RVb0GoL9RW_WpqOJxvKE'; // ← ここを自分のスプレッドシートに変更

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById('list');
        list.innerHTML = '';

          data.values.forEach((row, index) => {
            if(index===0)return
          const li = document.createElement('li');
          let hoText = ""
          if(row[6])hoText=`<span class="ho">〔${row[6]}〕</span>`
          li.innerHTML = `<strong class="title">${row[1]}</strong><span class="rub">【${row[0]}】</span>${hoText}<span class="info">${row[2]}</span>
          `;
          list.appendChild(li);
        });
      })
      .catch(error => {
        console.error('取得エラー:', error);
        document.getElementById('list').innerHTML = '<li>データ取得に失敗しました。</li>';
      });