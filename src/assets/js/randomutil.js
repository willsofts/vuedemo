const ALPHABETS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
const NUMERICS = Array.from("0123456789");

export function getRandomNumber(min = 1, max = 1000000) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function random(len = 6, alphabets = ALPHABETS ) {
	let result = "";        
	let max = alphabets.length - 1;
	for(let i = 0; i < len; i++) {
		let idx = getRandomNumber(1,max);
		result += alphabets[idx-1];
	}
	return result;
}

export function randomNumber(len = 6, alphabets = NUMERICS) {
	return random(len, alphabets);
}
