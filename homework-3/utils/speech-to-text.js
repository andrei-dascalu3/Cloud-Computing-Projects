const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient({
  keyFilename: "./credentials/speech-to-text-API.json",
});

exports.speechToText = (path = "") => {
  quickstart(path);
};

async function quickstart(path) {
  // The path to the remote LINEAR16 file
  let gcsUri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw";
  if (path !== "") {
    gcsUri = path;
  }

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    uri: gcsUri,
  };
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US",
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
}
