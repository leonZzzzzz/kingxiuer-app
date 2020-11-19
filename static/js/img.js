class CreateImage {
  constructor(canvas, datas, width) {
    console.log(canvas)
    this.canvas = canvas;
    this.datas = datas;
    this.width = width || document.body.clientWidth;
  };
  init() {
    this.datas.map((res, i) => {
      initImg(this.canvas, res, i, this.width)
        .then(() => {
          initData(this.canvas, res, i);
        });
    })
  }
}
/**
 * 拼接图片
 * @param {canvas} ctx 画布对象
 * @param {data} data 拼接数据
 * @param {number} num 次数
 * @param {number} w 宽度
 */
function initImg(ctx, data, num, w) {
  const img = new Image();
  img.src = 'https://kingsuer-1255600302.file.myqcloud.com/attachments/ovulate/h6d677bjjd804b02.jpg';
  return new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 56, num * 35, w, 35);
      resolve();
    };
  });
}
/**
 * 拼接数据
 * @param {canvas} ctx 画布对象
 * @param {object} data 数据
 * @param {number} num 次数
 */
function initData(ctx, data, num) {
  ctx.font = '10px Arial';
  console.log(num * 35 + 15)
  ctx.fillText("2015-02-02", 5, num * 35 + 20);
}

export default CreateImage;