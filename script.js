const quoteContainer = document.getElementById("quote-container");
const quotetext = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-butten");
const nextQuote = document.getElementById("next-quote");

let apiQuote = [];

// Show random quote
function newQuote(){
    const quote = apiQuote[Math.floor(Math.random()*apiQuote.length)];
    console.log(quote);

    // Check quote length
    if(quote.text.length > 50){
        quotetext.classList.add("long-quote");
    }else{
        quotetext.classList.remove("long-quote");
    }
    quotetext.textContent = quote.text;

    if(quote.author == null)
    {
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent  = quote.author;
    }

    
}

// Get quote frome API 
async function getQuote(){
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