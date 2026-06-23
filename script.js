function saveMemo() {
  const character = document.getElementById("character").value;

  const dangerMove = document.getElementById("dangerMove").value;
  const punish = document.getElementById("punish").value;
  const neutral = document.getElementById("neutral").value;
  const freeMemo = document.getElementById("freeMemo").value;

  localStorage.setItem("sf6_" + character + "_dangerMove", dangerMove);
  localStorage.setItem("sf6_" + character + "_punish", punish);
  localStorage.setItem("sf6_" + character + "_neutral", neutral);
  localStorage.setItem("sf6_" + character + "_freeMemo", freeMemo);
  const now = new Date().toLocaleString();
localStorage.setItem("sf6_" + character + "_updatedAt", now);
document.getElementById("updatedAt").textContent = "最終更新：" + now;
}

function loadMemo() {
  const character = document.getElementById("character").value;

  document.getElementById("dangerMove").value =
    localStorage.getItem("sf6_" + character + "_dangerMove") || "";

  document.getElementById("punish").value =
    localStorage.getItem("sf6_" + character + "_punish") || "";

  document.getElementById("neutral").value =
    localStorage.getItem("sf6_" + character + "_neutral") || "";

  document.getElementById("freeMemo").value =
    localStorage.getItem("sf6_" + character + "_freeMemo") || "";
    
    const updatedAt = localStorage.getItem("sf6_" + character + "_updatedAt");
  document.getElementById("updatedAt").textContent =
  "最終更新：" + (updatedAt || "なし");

  const characterNames = {
  ryu: "リュウ",
  ken: "ケン",
  chunli: "春麗",
  gouki: "豪鬼"
};

document.getElementById("currentCharacter").textContent =
  "現在の対策キャラ：" + characterNames[character];
}


window.onload = function () {
  loadMemo();
};

function searchMemo() {
  const keyword = document.getElementById("searchInput").value;
  const resultArea = document.getElementById("searchResult");

  resultArea.innerHTML = "";

  if (keyword === "") {
    return;
  }

  const characters = ["ryu", "ken", "chunli", "gouki"];
  const characterNames = {
    ryu: "リュウ",
    ken: "ケン",
    chunli: "春麗",
    gouki: "豪鬼"
  };

  const fields = ["dangerMove", "punish", "neutral", "freeMemo"];
  const fieldNames = {
    dangerMove: "注意技",
    punish: "確定反撃",
    neutral: "立ち回り",
    freeMemo: "自分用メモ"
  };

  characters.forEach(function(character) {
    fields.forEach(function(field) {
      const key = "sf6_" + character + "_" + field;
      const memo = localStorage.getItem(key) || "";

      if (memo.includes(keyword)) {
        resultArea.innerHTML +=
          "<p><strong>" +
          characterNames[character] +
          " / " +
          fieldNames[field] +
          "</strong><br>" +
          memo +
          "</p>";
      }
    });
  });
}