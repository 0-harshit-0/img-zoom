const file = document.querySelector("#img");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


const img = new Image();
file.addEventListener("change", (e)=> {
	let image = e.target.files[0];
	main(image.name);

	e.target.value = '';
});

let scale = 10;
let center = {x: null,y: null};
function draw(pos) {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.drawImage(img, pos.x, pos.y, pos.w, pos.h);
}

let ipos = {x:0, y:0, w:null, h:null};
function main(imgs) {
	if (!imgs) return 0;

	img.src = imgs;

	img.onload = () => {
		canvas.width = img.width;
		canvas.height = img.height;
		center = {x: canvas.width/2, y: canvas.height/2};
		ipos.w = img.width;
		ipos.h = img.height;

		draw(ipos);
	}
}


let mpos = {x:null, y:null};

canvas.addEventListener("wheel", (e)=> {
	e.preventDefault();
	mpos.x = e.x;
	mpos.y = e.y;
	if (e.deltaY > 0) {
		if (scale > 0) scale *= -1;
	}else {
		if (scale < 0) scale *= -1;
	}


	if (mpos.x < center.x && mpos.y < center.y) {
		ipos.x = ipos.x;
		ipos.y = ipos.y;
		ipos.w = ipos.w+(scale*2);
		ipos.h = ipos.h+(scale*2);
	}
	if (mpos.x > center.x && mpos.y < center.y) {
		ipos.x = ipos.x-scale;
		ipos.y = ipos.y;
		ipos.w = ipos.w+scale;
		ipos.h = ipos.h+(scale*2);
	}
	if (mpos.x > center.x && mpos.y > center.y) {
		ipos.x = ipos.x-scale;
		ipos.y = ipos.y-scale;
		ipos.w = ipos.w+scale;
		ipos.h = ipos.h+scale;
	}
	if (mpos.x < center.x && mpos.y > center.y) {
		ipos.x = ipos.x;
		ipos.y = ipos.y-scale;
		ipos.w = ipos.w+(scale*2);
		ipos.h = ipos.h+scale;
	}
	draw(ipos);
});
