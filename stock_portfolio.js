class portfolio {
    constructor(totalShares, tickers) {
        this.totalShares = totalShares;
        this.tickers = tickers;
    }
    
    isEmpty() {
        return !(this.totalShares);
    }

    numTickers() {
        return Object.keys(this.tickers).length;
    }

    buyShares(newTicker, numShares) {
        this.totalShares += numShares;
        if(newTicker in this.tickers)
            numShares += this.tickers[newTicker];
        this.tickers[newTicker] = numShares;
    }

    sellShares(ticker, numShares) {
        try {
            if(this.tickers[ticker] < numShares) throw ShareSaleException;
            this.totalShares -= numShares;
            this.tickers[ticker] -= numShares;

            if(this.tickers[ticker] === 0) {
                delete this.tickers[ticker];
            }
        }
        catch(err) {
            return err;
        }
    }

    getShares(ticker) {
        if(!(ticker in this.tickers))
            throw "Not in portfolio"
        else
            return this.tickers[ticker];
    }
}

exports.portfolio = portfolio;