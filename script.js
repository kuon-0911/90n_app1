const windmill = document.getElementById('windmill');
const scenery = document.getElementById('scenery');

// TEST

let isDragging = false;
let offsetX, offsetY;
let rotationAngle = 0;
let isRotating = false;

// **ドラッグ開始**
windmill.addEventListener('mousedown', (event) => {
  isDragging = true;

  // 風車の現在位置を取得
  const windmillRect = windmill.getBoundingClientRect();

  // クリック位置と風車の左上座標の差を記録
  offsetX = event.clientX - windmillRect.left;
  offsetY = event.clientY - windmillRect.top;

  windmill.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  // **正しい移動位置を計算**
  const newX = event.clientX - offsetX;
  const newY = event.clientY - offsetY;

  // **left/top で移動する**
  windmill.style.left = `${newX}px`;
  windmill.style.top = `${newY}px`;

  checkOverlap(); // 🔥 風車が背景の上にあるかチェック
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  windmill.style.cursor = 'grab';
  checkOverlap(); // 🔥 ドラッグ終了時もチェック
});

// **風車が背景の上にあるかチェック**
function checkOverlap() {
  const windmillRect = windmill.getBoundingClientRect();
  const sceneryRect = scenery.getBoundingClientRect();

  if (
    windmillRect.right > sceneryRect.left &&
    windmillRect.left < sceneryRect.right &&
    windmillRect.bottom > sceneryRect.top &&
    windmillRect.top < sceneryRect.bottom
  ) {
    if (!isRotating) {
      isRotating = true;
      rotateWindmill(); // 🔥 回転開始
    }
  } else {
    isRotating = false; // 背景から外れたら回転を止める
  }
}

// **風車を回転させる**
function rotateWindmill() {
  if (!isRotating) return; // 回転中でなければ止める

  rotationAngle += 5; // 回転速度を調整（5度ずつ回す）
  windmill.style.transform = `rotate(${rotationAngle}deg)`;

  requestAnimationFrame(rotateWindmill); // 🔥 次のフレームで再実行
}
