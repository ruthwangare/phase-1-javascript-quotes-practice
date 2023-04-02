fetch('http://localhost:3000/quotes?_embed=likes')
  .then(response => response.json())
  .then(quotes => {
    const quoteList = document.querySelector('#quote-list');
    quotes.forEach(quote => {
      const li = document.createElement('li');
      li.classList.add('quote-card');
      li.innerHTML = `
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      `;
      quoteList.appendChild(li);
    });
  });

  const newQuoteForm = document.querySelector('#new-quote-form');
newQuoteForm.addEventListener('submit', event => {
  event.preventDefault();
  const quoteInput = document.querySelector('#new-quote');
  const authorInput = document.querySelector('#author');
  const quoteList = document.querySelector('#quote-list');
  const quoteData = {
    quote: quoteInput.value,
    author: authorInput.value
  };
  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quoteData)
  })
  .then(response => response.json())
  .then(quote => {
    const li = document.createElement('li');
    li.classList.add('quote-card');
    li.innerHTML = `
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    `;
    quoteList.appendChild(li);
    quoteInput.value = '';
    authorInput.value = '';
  });
});


document.addEventListener('click', event => {
    if (event.target.classList.contains('btn-danger')) {
      const quoteCard = event.target.closest('.quote-card');
      const quoteId = quoteCard.dataset.id;
      fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: 'DELETE'
      });
    }
  });







