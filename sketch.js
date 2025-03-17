let fishPositions = [];
let fishColors = ['#FF6347', '#1E90FF', '#32CD32', '#FFD700'];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvasContainer'); // Embed canvas in iframe
  fishX = width / 2;
  fishY = height / 2;
  for (let i = 0; i < 4; i++) {
    fishPositions.push({ x: random(width), y: random(height / 2, height) });
  }
}

let yoff = 0.0;
let fishX, fishY;

function draw() {
  clear(); // Clear the canvas to make the website visible as the background
  
  strokeWeight(50);
  noFill();
  
  let colors = [
    'rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(0, 0, 255, 0.2)', 
    'rgba(255, 255, 0, 0.2)', 'rgba(255, 0, 255, 0.2)', 'rgba(0, 255, 255, 0.2)', 
    'rgba(128, 0, 0, 0.2)', 'rgba(0, 128, 0, 0.2)', 'rgba(0, 0, 128, 0.2)', 
    'rgba(128, 128, 0, 0.2)', 'rgba(128, 0, 128, 0.2)', 'rgba(0, 128, 128, 0.2)', 
    'rgba(192, 192, 192, 0.2)', 'rgba(128, 128, 128, 0.2)', 'rgba(64, 64, 64, 0.2)'
  ];
  
  let additionalColors = [
    'rgba(255, 105, 180, 0.2)', 'rgba(75, 0, 130, 0.2)', 'rgba(255, 165, 0, 0.2)', 
    'rgba(0, 255, 127, 0.2)', 'rgba(255, 20, 147, 0.2)', 'rgba(0, 191, 255, 0.2)', 
    'rgba(255, 69, 0, 0.2)', 'rgba(154, 205, 50, 0.2)'
  ];
  
  let allColors = colors.concat(additionalColors);
  let spacing = width / (allColors.length); // Adjust spacing for 23 lines
  
  for (let i = 0; i < allColors.length; i++) {
    stroke(allColors[i]);
    beginShape();
    let xoff = 0;
    for (let y = height; y >= height / 2; y -= 10) {
      let x = map(noise(xoff, yoff + i * 0.1), 0, 1, spacing * i - 50, spacing * i + 50);
      vertex(x, y);
      xoff += 0.05;
    }
    endShape();
  }
  
  yoff += 0.01;
  
  // Draw fish
  let fishLength = 60; // 6 cm in pixels
  let fishWidth = 40;  // 4 cm in pixels
  
  for (let i = 0; i < fishPositions.length; i++) {
    fill(fishColors[i]);
    noStroke();
    let fishX = fishPositions[i].x;
    let fishY = fishPositions[i].y;
    ellipse(fishX, fishY, fishLength, fishWidth); // Fish body
    triangle(fishX - fishLength / 2, fishY, fishX - fishLength / 2 - 20, fishY - 10, fishX - fishLength / 2 - 20, fishY + 10); // Fish tail
    
    // Move fish to the right within the seaweed area
    fishPositions[i].x += 1;
    
    // Reappear from the left when reaching the right edge
    if (fishPositions[i].x > width) {
      fishPositions[i].x = 0;
    }
    
    // Constrain fish within the bottom half of the canvas
    fishPositions[i].y = constrain(fishPositions[i].y, height / 2, height);
  }
  
  // Interact seaweed with fish
  for (let i = 0; i < fishPositions.length; i++) {
    let fishX = fishPositions[i].x;
    let fishY = fishPositions[i].y;
    for (let j = 0; j < allColors.length; j++) {
      let xoff = 0;
      for (let y = height; y >= height / 2; y -= 10) {
        let x = map(noise(xoff, yoff + j * 0.1), 0, 1, spacing * j - 50, spacing * j + 50);
        if (dist(fishX, fishY, x, y) < 50) {
          x += random(-5, 5);
        }
        xoff += 0.05;
      }
    }
  }
}
