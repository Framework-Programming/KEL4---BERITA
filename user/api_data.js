const apiUrl = 'http://127.0.0.1:8000/api/v1/';

function fetchWithRetry(url, options) {
    return fetch(url, options)
        .then(response => response.json())
        .catch(error => {
            // Check if it's a CORS error
            if (error.name === 'TypeError' && error.message.includes('cross-origin')) {
                handleCORSFailure();
            } else {
                // Log other types of errors
                console.error('Fetch error:', error);
            }
        });
}

function fetchBeritaData() {
    fetchWithRetry(apiUrl + "berita/")
        .then(beritaData => {
            console.log("beritaData:", beritaData);
            displayBeritaData(beritaData);
        });


}

function displayBeritaData(data) {
    const certificateList = document.getElementById("berita-list");
    certificateList.innerHTML = "";

    // Loop through the data
    data.forEach(element => {
        // Create HTML elements based on the fetched data
        const htmlContent = `
            <div class="row mt-3">
                <div class="col-sm-6 mb-3 mb-sm-0">
                    <div class="card">
                        <div class="card-body">
                            <img src="${element.sampul_berita}" class="img-fluid" alt="Main News Image" height="600" width="600" />
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${element.judul_berita}</h5>
                            <p class="card-text">${element.konten_berita}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append the HTML content to the certificateList container
        certificateList.innerHTML += htmlContent;
    });
}

fetchBeritaData()