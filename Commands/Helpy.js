/*	Srs Bot's helpful toolkit that's carried around!
	Except this one is more dynamic than Pure.js where we just lumped all the pure functions together.
	All functions here are still pure, but it's a utility js file now. .
	Also fun fact, did you know Helpy is a cute animatronic in FNAF 6? 
	Don't worry too much abt it lmao, we're not forcing him to jump off a plank here
	While you're here, watch this funny video:
	https://www.youtube.com/watch?v=v9M55TfKzcQ */

//Damn I got sick of writing comments after being forced to write javadocs in CSA.

//Takes an array and yeets a random thing from that
module.exports.randomResp = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)];
}

//Capitalize the first letter of a thing
module.exports.capFirst = (str) => str.substring(0, 1).toUpperCase() + str.substring(1);

//Returns the arguments inside the bot command that is not bounded to a specific argument index - a bounded argument is stuck to a specific array idx
//Usually happens when the user can write any message they like (ie. a message to dm to another discord user)
//Message param requires you to input message.content usually
//Hey don't judge, it's a good way to get rid of all the srs advice etc etc.. stuff
module.exports.returnUnbound = (message, lastBoundArg) => message.substring(message.indexOf(lastBoundArg) + lastBoundArg.length);

//Combines discord attachments and the message content to form one huge msg blob that we can just send a once o.o
module.exports.messageCompile = (msgContent, attachArray) => attachArray.reduce((acc, attachment) => acc + attachment.url + "\n", msgContent).replace("@everyone", "No you can't tag everyone.");

//Date 1 is current date, date 2 is target date
module.exports.dateDistance = (date1, date2) => dateFrom0(-1, date2.getMonth(), date2.getDate()) - dateFrom0(-1, date1.getMonth(), date1.getDate());

//Adjusts the timezones. Time is in UTC. TMZ follows the INTL Conventions
module.exports.tmzConvert = (time, tmz) => {
	try
	{
		return new Date(time).toLocaleString("en-US", {"timeZone": tmz});
	}
	catch //if it fails just default to NY lmao
	{
		return new Date(time).toLocaleString("en-US", {"timeZone": "America/New_York"});
	}
};

//Merge sort, but it's non-traditional because we don't keep track of indexes and just arr.slice over 9000 arrays
//This will still sort arr without setting it to another new array though
// comparison = (a, b) => {return boolean with a or b}
//Ye so comparison(a, b) determines what you want to put in the front
module.exports.mergeSort = (arr, comparison) => {
	if (arr.length == 1)
	{
		return arr;
	}

	var left = this.mergeSort(arr.slice(0, Math.floor(arr.length / 2)), comparison);
	var right = this.mergeSort(arr.slice(Math.floor(arr.length / 2)), comparison);

	for (var l = 0, r = 0, i = 0; i < arr.length; i++)
	{
		if (l >= left.length) 
		{
			arr[i] = right[r];
			r++;
		}
		else if (r >= right.length || comparison(left[l], right[r])) //Short circuit the r >= right.length
		{
			arr[i] = left[l];
			l++;
		}
		else
		{
			arr[i] = right[r];
			r++;
		}
	}

	return arr;
}

//THIS IS NOT A TRADITIONAL BINARY SEARCH!! DO NOT USE IT THAT WAY!!!
//If comparison(item) returns 0, then the function will shove that in an array. -1 is too small, 1 is too big.
//Return case 2 to stop the search
//This function will then return the array - not the index .-.
//Also pls sort arr before chugging it in thx
module.exports.binArr = (arr, comparison) => {
	let toOut = [];
	let found;

	for (var left = 0, right = arr.length, middle = Math.floor(arr.length / 2); left < right; middle = Math.floor((left + right) / 2))
	{
		switch(comparison(arr[middle]))
		{
			case 0:
				found = middle;
				left = right; //Halt the loop
			break;

			case -1:
				left = middle + 1;
			break;

			case 1:
				right = middle - 1;
			break;

			case 2:
				left = right;
			break;
		}
	}

	//Linear search the top and bottom and shove the stuff that fits inside toOut
	if (found != undefined)
	{
		for (var i = found; i < arr.length && comparison(arr[i]) == 0; i++)
		{
			toOut.push(arr[i]);
		}

		for (var i = found; i >= 0 && comparison(arr[i]) == 0; i--)
		{
			if (i == found) continue;
			toOut.unshift(arr[i]);
		}
	}
	
	return toOut;
}

//-----------------------------------------Comparison Shortcut Codes---------------------------------

//If lexico compares the english lexicon, does dexico compare decimal numbers?
//Alright I'll stop lol I'm not Becc so I won't make dn jokes
module.exports.dexico = (num) => (a) => {
	if (a < num) return -1;
	if (a > num) return 1;
	if (a == num) return 0;
}

//A lexicographic search query to put in binArr, but it's like a shortcut
//This basically just orders everything and converts it into lowercase
module.exports.lexico = (word) => {
	var lcw = word.toLowerCase();

	return (a) => {
		var acw = a.toLowerCase();
		if (acw < lcw) return -1;
		if (acw > lcw) return 1;
		if (acw == lcw) return 0;
	}
}

//Lexicographuc ordering, but make sure that we're doing it by lowercase
module.exports.lexicoComparison = (a, b) => a.toLowerCase() < b.toLowerCase();
