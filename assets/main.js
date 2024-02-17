const API ='https://movies-api14.p.rapidapi.com/movies'
const content = null || document.getElementById('content');
const alertElement = null || document.getElementById('alert-message');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6945b995b2msh38f07c8eb8d20cep152d8djsn98de3ee0bc94',
		'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
	}
};

const showErrors = (errors) => {
    alertElement.innerHtml = `
        <div class="bg-red-500 border-t border-b border-red-400 text-red-700 px-4 py-3" role="alert">
            <p class="font-bold">Something went wrong</p>
            <p class="text-sm">${errors}.</p>
        </div>
    `;
}

const fetchData = async (urlApi, options) => {
    const response = await fetch(urlApi, options);
    const result = await response.json();
    return result; 
}

(async () => {
    try {
        alertElement.innerHTML = '';
        const moviesList = await fetchData(API, options);
        moviesList.movies.map(a => console.log(a));
        let  view = `
         ${moviesList.movies.map(movie => `
            <div class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${movie?.poster_path}" alt="${movie?.title}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${movie?.original_title}
                    </h3>
                    <p class="text-sm text-gray-900">
                    <label>Release Date</label>
                        ${movie?.release_date}
                    </h3>
                </div>
            </div>`).join('')}
        `;
        
        console.log(view);
        content.innerHTML = view;
    } catch (error) {
        showErrors(error);
    }
})();
