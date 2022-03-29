const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

exports.textToSpeech = (text) => {
  quickStart(text)
};

async function quickStart(text) {
  const client = new textToSpeech.TextToSpeechClient({keyFilename: './credentials/text-to-speech-API.json'});
  const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}