import { writable } from 'svelte/store';

export enum Signal {
  INIT = "-",
  BUY = "BUY",
  SELL = "SELL",
  HOLD = "HOLD"
}

export class Portfolio {
  stonks: number;
  cash: number;

  constructor(stonks: number, cash: number) {
    this.stonks = stonks;
    this.cash = cash;
  }
}

export class MarketDataEvent {
  ticker: string;
  bid: number;
  mid: number;
  ask: number;

  constructor(ticker: string, bid: number, mid: number, ask: number){
    this.ticker = ticker;
    this.bid = bid;
    this.ask = ask;
    this.mid = mid;
  }
}

export class TraderSession {

  initials: string;
  ip_address: string;

  constructor(initials: string, ip_address: string) {
    this.initials = initials;
    this.ip_address = ip_address;
  }
}

function createSignalStore(initialValue = Signal.INIT) {
  const { subscribe, update } = writable(initialValue);

  return {
    subscribe,
    updateSignal(newSignal: Signal) {
      update(() => newSignal);
    }
  }
}

function createPortfolioStore(initialValue = new Portfolio(15, 500)) {
  const { subscribe, update } = writable(initialValue);

  return {
    subscribe,
    buyStonks(qty: number, price: number) {
      update((value: Portfolio) => {
        if(value.cash - price*qty > 0){
          value.cash -= qty * price;
          value.stonks += qty;
        }
        return value;
      }
      )
    },
    sellStonks(qty: number, price: number) {
      update((value: Portfolio) => {
        if(value.stonks > 0){
          value.cash += qty * price;
          value.stonks -= qty;
        }
        return value;
      }
      )
    }
  }
}

function createTickStore(initialValue = new MarketDataEvent('SOLLY',0,0,0)) {
  const { subscribe, update } = writable(initialValue);
  return {
      subscribe,
      updateTick(tickValue: MarketDataEvent) {
      update(() => tickValue);
    }
  }
}

function createTraderSessionStore(initialValue = new TraderSession('TK','')) {
  const { subscribe, update } = writable(initialValue);
  return {
    subscribe,
    updateSession(traderSession: TraderSession) {
      update(() => traderSession);
    }
  }
}

export const tickStore = createTickStore();

export const signalStore = createSignalStore();

export const connectedToSolace = writable(false);

export const traderSessionStore = createTraderSessionStore();

export const gameOver = writable(false);

export const portfolioStore = createPortfolioStore();