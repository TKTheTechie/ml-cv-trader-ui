<script lang="ts">
  import { getContext, onDestroy, setContext } from 'svelte';

  import Icon from 'svelte-awesome';
  import { checkCircle, key } from 'svelte-awesome/icons';
  import { signalStore, Signal, traderSessionStore, TraderSession } from '../store/store';
  import { SolaceClient, SOLACE_CLIENT_CONTEXT_KEY } from '../solace-client';
  import solace from 'solclientjs';

  let buyDone = false,
    sellDone = false,
    holdDone = false;

  let initials = '',
    validForm = true;

  export let beginTrading = false;

  let solaceClient: SolaceClient = getContext(SOLACE_CLIENT_CONTEXT_KEY);

  function submitInitials() {
    if (initials.length > 0 && initials.length < 3) {
      console.log('Publishing new session event...');
      solaceClient.publishToTopic('tkthetechie/new/trading/session', '{"initials":"' + initials + '"}', solace.MessageDeliveryModeType.PERSISTENT);
      let traderSession: TraderSession;
      traderSession = new TraderSession(initials, '-');
      traderSessionStore.updateSession(traderSession);
      validForm = true;
      beginTrading = true;
      signalStore.updateSignal(Signal.INIT);
      // fetch('https://api.ipify.org?format=json')
      //   .then((response) => response.json())
      //   .then((val) => {
      //     traderSession = new TraderSession(initials, val.ip);
      //     console.log('Trader: ' + JSON.stringify(traderSession) + ' logged in');
      //   })
      //   .catch((err) => {
      //     console.log('Unable to determine ip-address of user ' + initials);
      //     traderSession = new TraderSession(initials, '-');
      //   })
      //   .finally(() => {
      //     traderSessionStore.updateSession(traderSession);
      // validForm = true;
      // beginTrading = true;
      // signalStore.updateSignal(Signal.INIT);
      //   });
    } else {
      validForm = false;
    }
  }

  const unsubscribe = signalStore.subscribe((signal) => {
    switch (signal) {
      case Signal.BUY:
        buyDone = true;
        break;
      case Signal.HOLD:
        holdDone = true;
        break;
      case Signal.SELL:
        sellDone = true;
        break;
      default:
        break;
    }
  });

  onDestroy(unsubscribe);
</script>

<section>
  <div class="flex flex-col w-full items-center">
    <h1 class="justify-center mb-1 text-xl font-bold tracking-tighter text-center text-white lg:text-center lg:text-xl title-font w-max">cv-ml-trader</h1>
  </div>
  <div class="text-xl tracking-tighter text-white intro-text">
    cv-ml-trader - short for 'computer vision-machine learning-trader' - is a a demo/experiment that runs gesture recognition from your webcam's video stream in order to determine whether to buy or
    sell stocks while consuming a simulated market data feed over Solace PubSub+ and sending the end result back to Solace for processing on the server side.
    <br />
    <br />
    There are three gestures that can be detected - try them now (use your right hand, against a clear background and away from your face as shown in the images below for best results):

    <div class="grid grid-cols-3  mt-5">
      <div class="items-center">
        <center><img height="90px" width="126px" alt="BUY" src="buy.png" /></center>
      </div>
      <div>
        <center><img height="90px" width="126px" alt="SELL" src="sell.png" /></center>
      </div>
      <div>
        <center><img height="90px" width="126px" alt="HOLD" src="hold.png" /></center>
      </div>

      <div class="text-center signal signal-BUY text-xl h-fit shrink">BUY</div>
      <div class="text-center signal signal-SELL text-xl h-fit shrink">SELL</div>
      <div class="text-center signal signal-HOLD text-xl h-fit shrink">HOLD</div>

      <div class="text-center h-fit shrink {buyDone ? 'done' : 'not-done'} ">
        <Icon data={checkCircle} scale={2} />
      </div>
      <div class="text-center h-fit shrink  {sellDone ? 'done' : 'not-done'}">
        <Icon data={checkCircle} scale={2} />
      </div>
      <div class="text-center h-fit shrink {holdDone ? 'done' : 'not-done'}">
        <Icon data={checkCircle} scale={2} />
      </div>
    </div>
    <div class="w-full items-center text-center mt-10">
      <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2" for="initials"> Initials </label>
      {#if !validForm}
        <p class="text-red-500 text-xs italic mb-1">Please fill out this field.</p>
      {/if}
      <center>
        <input
          class="appearance-none w-12 block text-center bg-gray-200 text-gray-700 border rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="initials"
          type="text"
          placeholder="TK"
          maxlength="2"
          bind:value={initials}
        />
      </center>

      <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full " on:click={submitInitials}> BEGIN TRADING </button>
    </div>
  </div>
</section>

<style>
  .not-done {
    color: rgb(53, 53, 53);
  }

  .done {
    color: rgb(2, 88, 2);
  }

  .intro-text {
    font-family: 'VT323', monospace;
  }
</style>
