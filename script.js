console.log("ver1")
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
      
      function anniversaryStatus(baseDateStr) {//周年処理
        const today = new Date();
        const [year, month, day] = baseDateStr.split('/').map(Number);
        const baseDate = new Date(year, month - 1, day);
      
        const thisYear = today.getFullYear();
        const anniversaryThisYear = new Date(thisYear, baseDate.getMonth(), baseDate.getDate());
      
        // 今日と記念日が一致するかチェック（年月日はすべて同じか）
        if (
          today.getDate() === anniversaryThisYear.getDate() &&
          today.getMonth() === anniversaryThisYear.getMonth()
        ) {
          const anniversaryNumber = thisYear - baseDate.getFullYear();
          return {type:"Y",int:anniversaryNumber,txt:`今日は${anniversaryNumber}周年記念日`};
        }
      
        // 今日がまだ記念日の前か後かで次の記念日を決める
        let nextAnniversary = anniversaryThisYear;
        if (today > anniversaryThisYear) {
          nextAnniversary = new Date(thisYear + 1, baseDate.getMonth(), baseDate.getDate());
        }
      
        const diffTime = nextAnniversary - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return {type:"D",int:diffDays,txt:`後${diffDays}日`};
    }

    function waitForScenarioData() {//読み込まれてからの本処理待機
  // scenarioData が配列で中身もあるか確認
  if (Array.isArray(scenarioData) && scenarioData.length > 0) {
    console.log('✅ scenarioData 読み込み完了:', scenarioData);
    const data = scenarioData
        data.sort((a, b) => {//ソート
          const titleA = (a[1] ?? '').trim().normalize();
          const titleB = (b[1] ?? '').trim().normalize();
          return titleA.localeCompare(titleB, 'ja', { sensitivity: 'base' });
        });
        console.log('scenarioData:', scenarioData);
        data.forEach(d => console.log(d[1]));
        data.forEach((row, index) => {　
            const li = document.createElement('li');
            li.classList.add(row[3])
            li.classList.add("scenario-list")
            let hoText = ""
            let status = ""
            let day = ""
            if(row[6])hoText=`<span class="ho">〔${row[6]}〕</span>`
            if(row[3]){
              if(row[3]==="通過済み")status = "<span class='sumi'>済</span>"
              if(row[3]==="通過予定")status = "<span class='yotei'>予</span>"
              if(row[4])day = anniversaryStatus(row[4]).txt
            }
            li.innerHTML = `<strong class="title">${row[1]}</strong><span class="rub">【${row[0]}】</span>${hoText}<span class="status">${status}</span><span class="info">${row[2]}</span><span class="day">${day}</span>
            `;
            list.appendChild(li);
        })
        console.log("読み込み終了")
      } else {
    // データがまだなら、再試行
    console.log('⏳ scenarioData 読み込み待機中...');
    setTimeout(waitForScenarioData, 300); // 0.3秒後に再チェック
  }
}
      window.onload = function() {//読み込まれてからの処理
        // 実行したい処理
        waitForScenarioData()
     }
//メニューの表示非表示
 const radios = document.querySelectorAll('input[name="list-dsp"]');
   radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const checkMenu = document.querySelectorAll('input[name="list-dsp"]:checked')[0].id;
      const DSPstyle = document.getElementById('display-style');
      if(checkMenu==="list-dsp-all"){//全表示
        DSPstyle.innerText=`.scenario-list{display: block;}`
      }
      if(checkMenu==="list-dsp-tuukazumi"){//通過済み
        DSPstyle.innerText=`.scenario-list{display: none;}.通過済み{display: block;}`
      }
      if(checkMenu==="list-dsp-mituuka"){//未通過
        DSPstyle.innerText=`.scenario-list{display: none;}.通過予定{display: block;}`
      }
      console.log(checkMenu)
    });
  });
