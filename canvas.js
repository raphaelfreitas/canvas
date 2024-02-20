var canvas = document.getElementById('hero');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

var canvasHolder = document.getElementById('canvasHolder');
var scrollTop = document.documentElement.scrollTop;
var windowMaxTop = canvasHolder.offsetHeight;
var maxTop = windowMaxTop - (window.innerHeight * 1.5);
var scrollPercent = 100 - ((scrollTop * 100)/maxTop);
var scrollPos = (scrollTop * 100)/windowMaxTop;
var maxDots = 300 / (scrollPercent/100);

window.addEventListener('scroll', () => {
    scrollTop = document.documentElement.scrollTop;
    scrollPercent = 100 - ((scrollTop * 100)/maxTop);
    scrollPos = (scrollTop * 100)/windowMaxTop;
    maxDots = 300 / (scrollPercent/100);

    if(scrollPos > 30 && scrollPos <= 40){
        canvasHolder.classList.remove("initial");
        canvasHolder.classList.add("black");

    } else if(scrollPos > 40){
        canvasHolder.classList.remove("initial");
        canvasHolder.classList.add("black");
    } else {
        canvasHolder.classList.add("initial");
        canvasHolder.classList.remove("black");

    }


    if(scrollPos > 55 && scrollPos <= 60){
        document.getElementById("canvasImg").style.opacity = "0.5";
    } else if(scrollPos > 60){
        document.getElementById("canvasImg").style.opacity = "0.7";
    } else if(scrollPos <= 55 )  {
        document.getElementById("canvasImg").style.opacity = "0";
    }

});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

var maxRadius = 50;
var minRadius = 5;

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.originalX = x;

    this.y = y;
    this.originalY = y;

    this.radius = Math.random() * (15 * (scrollPercent/100)) + 1;
    this.originalRadius = radius;

    this.dx = dx;
    this.originalDx = dx;

    this.dy = dy;
    this.originalDy = dy;

    this.color = color;
    this.originalColor = color;

    

    

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle=this.color;
        context.stroke();
        context.closePath();
        context.fillStyle=this.color;
        context.fill();
    }

    this.update = () => {
        var distance = 10;

        if(maxTop - scrollTop > 50){
            var distance = 2;
        }

        var maxX = this.originalX + ((scrollPercent / distance) * this.originalX);
            maxX = maxX < window.innerWidth ? maxX : window.innerWidth;
        var minX = this.originalX - ((scrollPercent / distance) * this.originalX);
            minX = minX > 0 ? minX : 0;

        var maxDx = this.originalDx * (scrollPercent / 100);
        var minDx = 0.1;

        var maxY = this.originalY + ((scrollPercent / distance) * this.originalY);
            maxY = maxY < window.innerHeight ? maxY : window.innerHeight;
        var minY = this.originalY - ((scrollPercent / distance) * this.originalY);
            minY = minY > 0 ? minY : 0;

        var maxDy = this.originalDy * (scrollPercent / 100);
        var minDy = 0.1;

        var maxRadius = 15 * (scrollPercent/100);
        var minRadius = 5 * (scrollPercent/100);

        if(this.radius > maxRadius || this.radius == this.originalRadius || this.radius < minRadius){
            this.radius = Math.random() * (maxRadius) + 1;
        }



        let rgb = this.originalColor.replace('rgba(', '');
            rgb = rgb.replace(')', '');
            rgb = rgb.split(',');


        


        if(scrollPos > 30 && scrollPos <= 40){
            if(rgb[0] < 100 && rgb[1] < 100 && rgb[2] < 100){
                this.color = 'rgba(0,0,0,0)';
            } else {
                this.color = 'rgba(255,255,255,255)';
            }
        } else if(scrollPos > 40 && scrollPos <= 60){
            
            this.color = this.originalColor;

        } else if(scrollPos <= 30) {
            if(rgb[0] < 100 && rgb[1] < 100 && rgb[2] < 100){
                this.color = 'rgba(0,0,0,0)';
            } else {
                this.color = 'rgba(0,0,0,255)';
            }
            
        } else {
            this.color = 'rgba(0,0,0,0)';
        }

        if(maxTop - scrollTop > 0.001){

            
            if(this.x > maxX || this.x < -maxX){
                this.dx = -this.dx;
                this.x = maxX;
            } else {
                if(this.x + this.radius +1 > maxX || this.x - this.radius +1 < minX){
                    this.dx = -this.dx;
                } 

                this.x += this.dx;
            }

            
            if(this.y > maxY || this.y < -maxY){
                this.dy = -this.dy;
                this.y = maxY;
            } else {

                if(this.y + this.radius +1 > maxY || this.y - this.radius +1 < minY){
                    this.dy = -this.dy;
                } 

                this.y += this.dy;
            }
            
        } else {
            this.x = this.originalX;
            this.y = this.originalY;
            this.radius = this.radius < 0.6 ? 0.6 : this.radius;
            
        }

        this.draw();
        
    }
}



var circleArray = [];

function init(){

    let img = new Image();
    img.src = `https://huemag2022dev.wpengine.com/wp-content/uploads/2024/02/v3.png`;
    img.crossOrigin = '*';

    img.onload = function () {
        let width = this.width;
        let height = this.height;


    circleArray = [];
    context.drawImage(img, 0, 0, width, height);
    let imgData = context.getImageData(0, 0, width, height).data;
    context.clearRect(0, 0, width, height);
    let w = 150;
    let h = round(w / width * height);
    let sample = sampling(imgData,width,height, w, h, 2);

    sample.forEach(item=>{
        var dx = ((Math.random() - 0.5) * (Math.random() * 6)) + 1;
        var dy = ((Math.random() - 0.5) * (Math.random() * 6)) + 1;

        circleArray.push(new Circle(item.x + (window.innerWidth / 2) - 330, item.y + (window.innerHeight / 2) - 330, dx, dy, 1, `rgba(${item.r},${item.g},${item.b},${item.a})`));
        
    });

    circleArray = shuffle(circleArray);
}


}


function round(num) {
    let rounded = (0.5 + num) | 0;
    rounded = ~~(0.5 + num);
    rounded = (0.5 + num) << 0;
    return rounded;
}

function sampling(data, width, height, sampleWidth, sampleHeight, scale){
    var result = [];
    let widthScale = width / sampleWidth;
    let heightScale = height / sampleHeight;
    let sampleX = 0, smapleY = 0;
    for (let j = 0; j <= height; j += heightScale) {
      sampleX = 0;
      for(let i = 0; i <= width; i+= widthScale){
          let index = (round(j) * width + round(i)) * 4;
          if (index > data.length - 4) {
            index = (round(j - 1) * width + round(i)) * 4;
            if(index > data.length - 4){
              index = data.length - 4;
            }
          }
          result.push({
            x:sampleX,
            y:smapleY,
            r:data[index],
            g:data[index + 1],
            b:data[index + 2],
            a:data[index + 3]
          });
          sampleX+= 2 * scale;
      }
      smapleY+= 2 * scale;
    }
    return result;
  }


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function animate(){
    requestAnimationFrame(animate);

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    

    let count = 0;
    circleArray.forEach((circle)=>{
        count += 1;

        if(maxDots < 0 || count < maxDots){
            circle.update();
        }
    })

}

init();
animate();
