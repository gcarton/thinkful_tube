const YOUTUBE_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm,callBack) {
	const query = {
		part: 'snippet',
		key: 'AIzaSyDCcEwchWH7T21rdinKTzI1FE4lv9pGgFw',
		'eventType': 'live',
        'maxResults': '21',
         q:`${searchTerm} in:title`,
         type:'video'
	}
	console.log(query);
	$.getJSON(YOUTUBE_SEARCH_API,query,callBack);	
}	

function renderResult(result){
	return `
	<div class="col-4 results_div">
	<h2 class="js_title">${result.snippet.title}</h2>
	<a href="https://youtu.be/${result.id.videoId}">
	<img src="${result.snippet.thumbnails.medium.url}" alt="Result Image">
	</a>
	</div>`
	;
}

function displayYouTubeSearchData(data) {
	console.log(data)
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
console.log($('.js-form'))
  $('.js-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    console.log(query, getDataFromApi);
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
