import { message } from "./tools/message.js";
import { metamask } from "./tools/metamask.js";
import { FTMApi } from "./tools/ftmscanapi.js";
class State {
  constructor() {
    metamask.setState(this);
    this._metamask = {
      provider: metamask,
    };
    this._FTMScan = {
      provider: FTMApi,
    };

    this._ERC20 = {
      tx: [],
      tokens: [],
    };

    this.message = message;

    this._topicNames = {
      metamask: {
        account: {
          changed: "metamask:account:changed",
          connected: "metamask:account:connected",
          disconnected: "metamask:account:disconnected",
        },
      },
      analytics: {
        txLoaded: "analytics:tx:loaded",
      },
    };

    /*
    taken from https://api.jquery.com/jQuery.Callbacks/
      // Subscribers
      $.Topic( "mailArrived" ).subscribe( fn1 );
      $.Topic( "mailArrived" ).subscribe( fn2 );
      $.Topic( "mailSent" ).subscribe( fn1 );
      
      // Publisher
      $.Topic( "mailArrived" ).publish( "hello world!" );
      $.Topic( "mailSent" ).publish( "woo! mail!" );    
    */
    this.topics = {};
    this.topicEnginePrepare();
  }

  //
  topicEnginePrepare() {
    $.topics = {};
    $.Topic = function (id) {
      //check if id is provided and if it is new id
      let callbacks,
        topic = id && $.topics[id];

      if (!topic) {
        callbacks = $.Callbacks();
        topic = {
          publish: callbacks.fire,
          subscribe: callbacks.add,
          unsubscribe: callbacks.remove,
        };
        if (id) {
          $.topics[id] = topic;
        }
      }
      return topic;
    };
  }

  get metamask() {
    return this._metamask.provider;
  }

  set metamask(value) {
    this._metamask.provider = value;
  }

  get FTMScan() {
    return this._FTMScan.provider;
  }

  set FTMScan(value) {
    this._FTMScan.provider = value;
  }

  get topicNames() {
    return this._topicNames;
  }

  set ERC20Txs(aTxs) {
    this._ERC20.tx = aTxs;
    $.Topic(this.topicNames.analytics.txLoaded).publish(aTxs);
  }

  get ERC20Txs() {
    return this._ERC20.tx;
  }

  set ERC20Tokens(aTokens) {
    this._ERC20.tokens;
  }

  get ERC20Tokens() {
    return this._ERC20.tokens;
  }

  // set topicNames(topic)

  //   get adress() {
  //     return this._metamask.adress;
  //   }

  //   set adress(value) {
  //     this._metamask.adress = value;
  //   }

  //   get network() {
  //     return this._metamask.network;
  //   }

  //   set network(value) {
  //     this._metamask.network = value;
  //   }

  //   get balance() {
  //     return this._metamask.balance;
  //   }

  //   set balance(value) {
  //     this._metamask.balance = value;
  //   }
}

export const state = new State();
