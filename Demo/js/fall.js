/**
 * Created by fierayan on 2015/3/16.
 */

// 飘落物数量
const NUMBER_OF_ITEMS = 42;

function init()
{
	var container = document.querySelector(".fall-box");

	for (var i = 0; i < NUMBER_OF_ITEMS; i++)
	{
		container.appendChild(createAFall());
	}
}

function randomInteger(low, high)
{
	return low + Math.floor(Math.random() * (high - low));
}

function randomFloat(low, high)
{
	return low + Math.random() * (high - low);
}

function pixelValue(value)
{
	return value + 'px';
}

function durationValue(value)
{
	return value + 's';
}


function createAFall()
{
	var fallDiv = document.createElement('div');
	fallDiv.setAttribute("class","fall-wrap");
	var image = document.createElement('img');
	image.setAttribute("class","fall-item");

	// 飘落物图片
	image.src = 'http://wximg.gtimg.com/tmt/_events/20150202-dior/dist/img/flower/b' + randomInteger(1, 14) + '.png';

	fallDiv.style.top = "-100px";

	var rightEdge=window.innerWidth;
	fallDiv.style.left = pixelValue(randomInteger(0, rightEdge));

	var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';

	fallDiv.style.webkitAnimationName = 'fade, drop';
	image.style.webkitAnimationName = spinAnimationName;

	var fadeAndDropDuration=durationValue(randomFloat(5, 11));

	var spinDuration = durationValue(randomFloat(4, 8));
	fallDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

	var fallDelay = durationValue(randomFloat(0, 5));
	fallDiv.style.webkitAnimationDelay = fallDelay + ', ' + fallDelay;

	image.style.webkitAnimationDuration = spinDuration;

	fallDiv.appendChild(image);

	return fallDiv;
}

window.addEventListener('load', init, false);
