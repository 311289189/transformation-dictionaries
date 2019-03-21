const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: './index.tsx'
});
