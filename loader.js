/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

// import * as tf from '@tensorflow/tfjs';
// import * as ui from './ui';
// import * as util from './util';

var loader = loader || {}

/**
 * Test whether a given URL is retrievable.
 */
loader.urlExists = async function(url) {
  ui.status('Testing url ' + url);
  try {
    const response = await fetch(url, {method: 'HEAD'});
    return response.ok;
  } catch (err) {
    return false;
  }
}

/**
 * Load pretrained model stored at a remote URL.
 *
 * @return An instance of `tf.Model` with model topology and weights loaded.
 */
loader.loadHostedPretrainedModel = async function(url) {
  ui.status('Loading pretrained model from ' + url);
  try {
    const model = await tf.loadModel(url);
    ui.status('Done loading pretrained model.');
    // We can't load a model twice due to
    // https://github.com/tensorflow/tfjs/issues/34
    // Therefore we remove the load buttons to avoid user confusion.
    ui.disableLoadModelButtons();
    return model;
  } catch (err) {
    console.error(err);
    ui.status('Loading pretrained model failed.');
  }
}

/**
 * Load data file stored at a remote URL.
 *
 * @return An object containing metadata as key-value pairs.
 */
loader.loadHostedData = async function(url, numClasses) {
  ui.status('Loading data from ' + url);
  try {
    const raw = await fetch(url);
    const data = await raw.json();
    const result = util.convertDataToTensors(data, numClasses);
    result['data'] = data;
    ui.status('Done loading data.');
    return result;
  } catch (err) {
    console.error(err);
    ui.status('Loading data failed.');
  }
}
