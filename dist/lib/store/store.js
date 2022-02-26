import {writable} from "../../../_snowpack/pkg/svelte/store.js";
export var Signal;
(function(Signal2) {
  Signal2["INIT"] = "-";
  Signal2["BUY"] = "BUY";
  Signal2["SELL"] = "SELL";
  Signal2["HOLD"] = "HOLD";
})(Signal || (Signal = {}));
export class Portfolio {
  constructor(stonks, cash) {
    this.stonks = stonks;
    this.cash = cash;
  }
}
export class MarketDataEvent {
  constructor(ticker, bid, mid, ask) {
    this.ticker = ticker;
    this.bid = bid;
    this.ask = ask;
    this.mid = mid;
  }
}
export class TraderSession {
  constructor(initials, ip_address) {
    this.initials = initials;
    this.ip_address = ip_address;
  }
}
function createSignalStore(initialValue = Signal.INIT) {
  const {subscribe, update} = writable(initialValue);
  return {
    subscribe,
    updateSignal(newSignal) {
      update(() => newSignal);
    }
  };
}
function createPortfolioStore(initialValue = new Portfolio(25, 1e3)) {
  const {subscribe, update} = writable(initialValue);
  return {
    subscribe,
    buyStonks(qty, price) {
      update((value) => {
        if (value.cash - price * qty > 0) {
          value.cash -= qty * price;
          value.stonks += qty;
        }
        return value;
      });
    },
    sellStonks(qty, price) {
      update((value) => {
        if (value.stonks > 0) {
          value.cash += qty * price;
          value.stonks -= qty;
        }
        return value;
      });
    }
  };
}
function createTickStore(initialValue = new MarketDataEvent("SOLLY", 0, 0, 0)) {
  const {subscribe, update} = writable(initialValue);
  return {
    subscribe,
    updateTick(tickValue) {
      update(() => tickValue);
    }
  };
}
function createTraderSessionStore(initialValue = new TraderSession("TK", "")) {
  const {subscribe, update} = writable(initialValue);
  return {
    subscribe,
    updateSession(traderSession) {
      update(() => traderSession);
    }
  };
}
export const tickStore = createTickStore();
export const signalStore = createSignalStore();
export const connectedToSolace = writable(false);
export const traderSessionStore = createTraderSessionStore();
export const gameOver = writable(false);
export const portfolioStore = createPortfolioStore();
