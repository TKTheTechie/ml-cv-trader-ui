<script lang="ts">
  import * as handTrack from 'handtrackjs';
  import { Moon } from 'svelte-loading-spinners';
  import { onMount } from 'svelte';
  import { Signal, signalStore, connectedToSolace } from '../../lib/store/store';
  import Icon from 'svelte-awesome';
  import { faHandPointer, faHandPaper, faHandRock } from '@fortawesome/free-solid-svg-icons';

  const defaultParams = {
    flipHorizontal: true,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 2,
    iouThreshold: 0.2,
    scoreThreshold: 0.9,
    modelType: 'ssd320fpnlite',
    modelSize: 'medium',
    bboxLineWidth: '2',
    fontSize: 17,
  };

  let videoStatus = false;

  const analysisInterval = 1000;

  let model: any;

  let video: any;

  let signal = Signal.INIT;

  let windowWidth: number,
    windowHeight: number,
    videoDimension = 300;

  // $: {
  // 	if (windowWidth > 600 && windowHeight > 600) {
  // 		videoDimension = 600;
  // 		console.log('Height:' + windowHeight + ',Width:' + windowWidth);
  // 	} else {
  // 		videoDimension = 300;
  // 		console.log('Height:' + windowHeight + ',Width:' + windowWidth);
  // 	}
  // }

  setInterval(() => {
    if (videoStatus) {
      model.detect(video).then((predictions: any) => {
        let handPrediction = predictions.filter((prediction) => prediction.label == 'open' || prediction.label == 'closed' || prediction.label == 'point');

        if (handPrediction.length) {
          if (handPrediction[0].label == 'open') signalStore.updateSignal(Signal.SELL);
          else if (handPrediction[0].label == 'closed') signalStore.updateSignal(Signal.HOLD);
          else if (handPrediction[0].label == 'point') signalStore.updateSignal(Signal.BUY);
        }
      });
    }
  }, analysisInterval);

  onMount(async () => {
    video = document.getElementById('webcam');
    model = await handTrack.load(defaultParams);

    console.log('Loading webcam...');
    handTrack.startVideo(video).then((status) => {
      if (status) {
        videoStatus = true;
      }
    });
  });
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />
<section>
  <div class="bg-gray-900 p-2 rounded mt-4 shadow-xl h-fit w-full">
    {#if !videoStatus}
      <center>
        <Moon size="60" color="#FF3E00" unit="px" duration="2s" /> Webcam Loading...
      </center>
    {/if}
    <center
      ><video class="videobox" id="webcam" style="width:{videoDimension}px;height:{videoDimension}px" width="{videoDimension}px" height="{videoDimension}px">
        <track kind="captions" />
      </video>
    </center>
    <span class="signal signal-{$signalStore} text-4xl">{$signalStore}</span>
    <div class="grid grid-cols-12">
      <div>
        <img class="mt-0.5" src="{$connectedToSolace ? 'connected' : 'disconnected'}.png" alt="connected" width="8px" height="8px" />
      </div>
      <div class="text-left col-span-11" style="font-size: xx-small;">
        {$connectedToSolace ? 'CONNECTED TO' : 'DISCONNCECTED FROM'} SOLACE
      </div>
    </div>
    <div class="grid grid-cols-3 mt-3 w-full h-fit content-center">
      <div><center><Icon data={faHandPointer} scale={2} /></center></div>

      <div><center><Icon data={faHandPaper} scale={2} /></center></div>

      <div>
        <center><Icon data={faHandRock} scale={2} /></center>
      </div>

      <div class="text-xs signal-BUY">BUY</div>
      <div class="text-xs signal-SELL">SELL</div>
      <div class="text-xs signal-HOLD">HOLD</div>
    </div>
  </div>
</section>

<style>
  .videobox {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg); /* Safari and Chrome */
    -moz-transform: rotateY(180deg); /* Firefox */
    width: 400px;
    height: 400px;
  }

  .signal {
    font-family: 'VT323', monospace;
  }

  .signal-BUY {
    --tw-text-opacity: 1;
    color: rgb(21 128 61 / var(--tw-text-opacity));
  }

  .signal-SELL {
    --tw-text-opacity: 1;
    color: rgb(185 28 28 / var(--tw-text-opacity));
  }

  .signal-HOLD {
    --tw-text-opacity: 1;
    color: rgb(161 98 7 / var(--tw-text-opacity));
  }
</style>
