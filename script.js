const quoteContainer = document.getElementById("quote-container");
const quotetext = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-butten");
const nextQuote = document.getElementById("next-quote");
const loader = document.getElementById("loader");

let apiQuote = [];

// Show loading prossec
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader

function hideLoader(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show random quote
function newQuote(){
    loading();
    const quote = apiQuote[Math.floor(Math.random()*apiQuote.length)];
    console.log(quote);

    if(quote.author == null)
    {
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent  = quote.author;
    }

    // Check quote length
    if(quote.text.length > 50){
        quotetext.classList.add("long-quote");
    }else{
        quotetext.classList.remove("long-quote");
    }
    quotetext.textContent = quote.text;
    hideLoader();   
}

// Get quote frome API 
async function getQuote(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
    } catch(error){
        // Error
    }
}

//Tweet a quote
function tweetQuote(){
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quotetext.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

getQuote();