function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent('breadboard-container');
    drawBreadboard();
}

function drawBreadboard() {
    // الخلفية العامة
    background(240);
    
    // الإطار الرئيسي (أحمر + أزرق مثل Tinkercad)
    fill(200, 50, 50); // الأحمر
    rect(50, 50, 700, 100); // Power Rails (أعلى)
    fill(50, 50, 200); // الأزرق
    rect(50, 350, 700, 100); // Power Rails (أسفل)
    
    // منطقة الثقوب الرئيسية (رمادي)
    fill(220);
    rect(50, 150, 700, 200);
    
    // رسم الثقوب (النقاط)
    fill(0);
    for (let x = 60; x <= 740; x += 10) {
        for (let y = 160; y <= 330; y += 10) {
            circle(x, y, 3);
        }
    }
    
    // علامات (+) و (-) على Power Rails
    fill(255);
    textSize(20);
    text("+", 70, 90); 
    text("-", 70, 390);
}
let components = [];

class Component {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'resistor', 'led', etc.
    }
    
    draw() {
        if (this.type === 'resistor') {
            fill(165, 42, 42); // بني
            rect(this.x, this.y, 60, 20);
        } else if (this.type === 'led') {
            fill(255, 0, 0); // أحمر
            circle(this.x, this.y, 30);
        }
    }
}

function mousePressed() {
    // إضافة مكون جديد عند النقر
    components.push(new Component(mouseX, mouseY, 'resistor'));
}

function draw() {
    drawBreadboard();
    // رسم جميع المكونات
    for (let comp of components) {
        comp.draw();
    }
}
<script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent('breadboard-container');
    drawBreadboard();
    
    // تفعيل السحب للمكونات
    interact('.draggable').draggable({
        listeners: {
            move(event) {
                let target = event.target;
                let x = (parseFloat(target.getAttribute('data-x')) || 0;
                let y = (parseFloat(target.getAttribute('data-y')) || 0;
                x += event.dx;
                y += event.dy;
                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    });
}
function addResistor() {
    components.push(new Component(100, 100, 'resistor'));
}

function addLED() {
    components.push(new Component(100, 150, 'led'));
}
