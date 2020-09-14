let attractions;

const getAttractions= () =>{
	return new Promise((resolve,reject)=>{
		let error=false;
		if(!error)		
			resolve(
				fetch("https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9d7f28c1-b3cb-41cc-b1ab-c42f5b62beeb/attractions.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200914%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200914T021335Z&X-Amz-Expires=86400&X-Amz-Signature=82c1cd9406b79cf16181084c37954bcc3acb2a18fe56824dfb240d5bc1cf409d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22attractions.json%22")
				.then(response => response.json())
				.then(data =>{
					attractions=data;
				})
			)
		else
			reject()
		})
}


function filterData(category) {
	let filtered_attractions=attractions;
	if (category!="all"){
		filtered_attractions=attractions.filter(attraction=>attraction['Category']==category);
	} 
	let sorted_attractions=filtered_attractions.sort((a1,a2)=>{a2['Visitors']-a1['Visitors']}).slice(0,5);
	renderBarChart(sorted_attractions);
	/* **************************************************
	 *
	 * TODO: filter attractions by the selected category
	 * TODO: filter top 5 attractions
	 *
	 * CALL THE FOLLOWING FUNCTION TO RENDER THE BAR-CHART:
	 *
	 * renderBarChart(data)
	 *
	 * - 'data' must be an array of JSON objects
	 * - the max. length of 'data' is 5
	 *
	 * **************************************************/

}

getAttractions().then( temp =>{
	filterData("all");
})

const dropdownElement=document.querySelector("#attraction-category");
dropdownElement.addEventListener('change',(event)=>{
	getAttractions().then( temp =>{
		filterData(event.target.value);
	})
})


// TODO: Define an event listener for the dropdown menu
//       Call filterData with the selected category