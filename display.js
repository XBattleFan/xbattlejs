
function drawHex(ctx, x, y, size, color) {
	var onesegx = (size / 4);
	var onesegy = (size / 4);
	var twosegx = (onesegx * 2.0);
	var twosegy = (onesegy * 2.0);
	var sizex = twosegx * 2;
	var sizey = twosegy * 2;

	ctx.beginPath();
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = '#000000';
	
	ctx.moveTo(x, y + twosegy);
	ctx.lineTo(x + onesegx, y);
	ctx.lineTo(x + onesegx + twosegx, y);
	ctx.lineTo(x + sizex, y + twosegy);
	ctx.lineTo(x + onesegx + twosegx, y + sizey);
	ctx.lineTo(x + onesegx, y + sizey);
	ctx.lineTo(x, y + twosegy);
	ctx.fillStyle = color;

	ctx.fill();
	ctx.stroke();
}

function drawHexDetail(ctx, x, y, cell, size) {
	var cx = x + (size / 2.0);
	var cy = y + (size / 2.0);

	// Draw cities
	if(cell.productivity > 20) {
		// City size is productivity 20 - 100
		var cityRadius = Math.floor((size / 3.0) * (cell.productivity / 100.0));
		ctx.beginPath();		
		ctx.arc(cx, cy, cityRadius, 0, 2*Math.PI, false);
		ctx.strokeStyle = '#000000';
		ctx.stroke();
	}

	// Draw spigots

   //        0
	//      ____  
	// 5  /      \  1
	//   /        \
	//   \        /
	// 4  \______/  2
	//        3    

	/*
   |     /
   |   / 
	| /
	 --------
	*/

	var x = Math.floor(Math.sin(30 * Math.PI/180) * (size / 2.0));
	var y = Math.floor((size / 2.333) / Math.tan(30 * Math.PI/180));
	var oneseg = size / 4.0;
	var twoseg = oneseg * 2.0;

	if(cell.spigot[0]) {
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.moveTo(cx,cy);
		ctx.lineTo(cx, cy - twoseg);
		ctx.stroke();
	}

	if(cell.spigot[1]) {
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.moveTo(cx,cy);
		ctx.lineTo(cx + oneseg*1.5, cy - (oneseg / 1.25));
		ctx.stroke();
	}

	if(cell.spigot[2]) {
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.moveTo(cx,cy);
		ctx.lineTo(cx + oneseg*1.5, cy + (oneseg / 1.25));
		ctx.stroke();
	}

	if(cell.spigot[3]) {
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.moveTo(cx,cy);
		ctx.lineTo(cx, cy + twoseg);
		ctx.stroke();
	}

	if(cell.spigot[4]) {
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.moveTo(cx,cy);
		ctx.lineTo(cx - oneseg*1.5, cy - (oneseg / 1.25));
		ctx.stroke();
	}

	if(cell.spigot[5]) {
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.moveTo(cx,cy);
		ctx.lineTo(cx - oneseg*1.5, cy + (oneseg / 1.25));
		ctx.stroke();
	}
}

function terrainToColor (terrain) {
	// Terrain is a height value between 0 and 100.

	var r = 0;
	var g = 0;
	var b = 0;

	
	// sea
	/*if(terrain <= 30) {
		var fct = (terrain / 30.0) * 60;
		r = 60-fct;
		g = 60-fct;
		b = 255 - fct;
	}

	// plains
	else if(terrain > 30 && terrain <= 70) {
		var fct = ((terrain - 30) / 40.0) * 60;
		r = 181-fct;
		g = 246-fct;
		b = 152-fct;
	}

	// mountains
	else {
		var fct = ((terrain - 70) / 30.0) * 60;
		r = 226-fct;
		g = 208-fct;
		b = 173-fct;
	}*/

	var fct = Math.floor((terrain / 100.0) * 255.0);

	return 'rgb('+fct+','+fct+','+fct+')';
}

// Draw a width * height grid (in cells) where each cell is size pixels wide
function drawGrid(ctx, width, height, size) {
	var onesegx = (size / 4.0);
	var onesegy = (size / 4.0);
	var twosegx = (onesegx * 2.0);
	var twosegy = (onesegy * 2.0);
	var sizex = twosegx * 2;
	var sizey = twosegy * 2;

	var offsetx = sizex - onesegx;
	var offsety = sizey / 2.0;
	var sz2x = sizex + twosegx;
	var sz2y = sizey + twosegy;

	for(var y = 0; y<height; y++) {
		if (y % 2 == 0) {
			yoff = offsety;
			xoff = offsetx;
		} else {
			yoff = offsety;
			xoff = 0;
		}

		for(var x = 0; x<width; x++) {
			var terrain = board[y][x].terrain;
			var color = terrainToColor(terrain);

			drawHex(ctx,xoff + x * sz2x,  y * yoff, size, color);
			drawHexDetail(ctx, xoff + x * sz2x, y * yoff, board[y][x], size);
		}
	}
}

function clearCanvas() {
	var canvas=document.getElementById("mycanvas");
	var context=canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height);
}

function updateDisplay() {
	clearCanvas();
	drawGrid(document.getElementById('mycanvas').getContext('2d'), 
				gameCfg.boardX, 
				gameCfg.boardY, 
				gameCfg.cellSize);
}

