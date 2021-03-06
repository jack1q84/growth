/* eslint-disable global-require */
/* global __DEV__, require */
import React, { Component } from 'react';
import { WebView, StyleSheet, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppSizes from '../../theme/sizes';
import AppStyles from '../../theme/styles';
import SKILL_TREE_DATA from './SKILL_TREE_DATA';

const filter = require('lodash.filter');

const styles = StyleSheet.create({
  container: {
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
});

class SkillTree extends Component {
  static componentName = 'SkillTree';

  constructor() {
    super();
    this.webview = null;
  }

  handleMessage = (event: Object) => {
    const message = event.nativeEvent.data;
    const skillId = parseInt(JSON.parse(message).id, 10);
    const title = filter(SKILL_TREE_DATA, { id: skillId })[0].title;

    Actions.skillDetail({ skillId, title });
  };

  render = () => {
    let source;
    if (__DEV__) {
      source = require('./www/index.html');
    } else {
      source = Platform.OS === 'ios' ? require('./www/index.html') : { uri: 'file:///android_asset/skilltree/index.html' };
    }

    return (
      <WebView
        ref={(webview) => {
          this.webview = webview;
        }}
        scalesPageToFit
        startInLoadingState
        onMessage={this.handleMessage}
        source={source}
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container, styles.container]}
        injectedJavaScript=""
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}

export default SkillTree;
