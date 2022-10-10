const stockFunc = require('./stock_portfolio.js');
const emptyPortfolio = new stockFunc.portfolio(0, {});
const fullPortfolio = new stockFunc.portfolio(12, {'TSLA': 10, 'GME': 2});
        

test('Testing -- newly created portfolio', () => {
    const targetShares = 0;
    const targetTickers = {};
    expect(emptyPortfolio.totalShares).toBe(targetShares);
    expect(emptyPortfolio.tickers).toEqual(targetTickers);
});

test('Testing -- Portfolio share status: empty', () => {
    expect(emptyPortfolio.isEmpty()).toBeTruthy();
});

test('Testing -- Portfolio share status: non-empty', () => {
    expect(fullPortfolio.isEmpty()).toBeFalsy();
});

test('Testing -- Count Unique Tickers', () => {
    const numTickers = 2;
    expect(fullPortfolio.numTickers()).toBe(numTickers);
});

test('Testing -- Buying new shares from empty', () => {
    const sharesOfGME = 2;
    const sharesOfTSLA = 10;
    emptyPortfolio.buyShares('GME', sharesOfGME);
    emptyPortfolio.buyShares('TSLA', sharesOfTSLA);
    expect(emptyPortfolio.tickers['GME']).toBe(fullPortfolio.tickers['GME']);
    expect(emptyPortfolio.tickers['TSLA']).toBe(fullPortfolio.tickers['TSLA']);
});

test('Testing -- Buying new shares from full', () => {
    const newShares = 12;
    fullPortfolio.buyShares('TSLA', 2);
    expect(fullPortfolio.tickers['TSLA']).toBe(newShares);
});

test('Testing -- Selling existing shares', () => {
    const newShares = 6;
    fullPortfolio.sellShares('TSLA', 6);
    expect(fullPortfolio.tickers['TSLA']).toBe(newShares);
});

test('Testing -- Get shares per ticker', () => {
    const expectedShares = 6;
    expect(fullPortfolio.getShares('TSLA')).toBe(expectedShares);
});

test('Testing -- Get shares from non-existent ticker', () => {
    expect(() => fullPortfolio.getShares('RBX')).toThrow();
});

test('Testing -- Selling all of one stock', () => {
    fullPortfolio.sellShares('TSLA', 6);
    expect(() => fullPortfolio.getShares('TSLA')).toThrow();
});

test('Testing -- Selling more shares than owned', () => {
    
    expect(() => fullPortfolio.fullPortfolio.sellShares('GME', 6)).toThrow();
});
