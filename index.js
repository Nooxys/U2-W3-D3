const removeButton = (event) => {
  event.target.closest('.col-12').remove()
}

const getBooks = () => {
  fetch('https://striveschool-api.herokuapp.com/books')
    .then((response) => {
      console.log('response', response)
      if (response.ok) {
        return response.json()
      } else {
        if (response.status === 404) {
          throw new Error('404 - Pagina non trovata')
        } else if (response.status === 500) {
          throw new Error('500 - Internal server error')
        } else {
          throw new Error('Errore generico')
        }
      }
    })
    .then((books) => {
      console.log(books)
      const row = document.getElementsByClassName('row')[0]
      books.forEach((book) => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('col-12', 'col-md-6', 'col-lg-3')
        newDiv.innerHTML = `
          <div class="card">
            <img src="${book.img}" class="card-img-top img-fluid" alt="${book.title}" />
            <div class="card-body">
              <h5 class="card-title text-truncate">${book.title}</h5>
              <p class="card-text">
               € ${book.price}
              </p>
              <button onclick='removeButton(event)' class="btn btn-danger d-flex justify-content-center w-50 mx-auto" >
                Remove
              </button>
            </div>
          </div>
        `
        row.appendChild(newDiv)
      })
    })
    .catch((error) => {
      console.log('errore generico', error)
    })
}

getBooks()
