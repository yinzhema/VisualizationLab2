let attractions;

const getAttractions= () =>{
	return new Promise((resolve,reject)=>{
		let error=false;
		if(!error)		
			resolve(
				fetch("attractions.json")
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