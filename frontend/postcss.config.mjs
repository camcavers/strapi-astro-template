export default {
    plugins: {
      'postcss-preset-env': {
        features: {
          'nesting-rules': true,
          'custom-properties': true,
          'custom-media-queries': true
        }
      },
      'postcss-nested': {},
      'autoprefixer': {}
    }
  }